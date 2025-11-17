import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Basic CORS (tighten in production)
const allowed = process.env.ALLOWED_ORIGIN?.split(',').map(s=>s.trim()).filter(Boolean) || [];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.length === 0 || allowed.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  }
}));

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY;
if (!PAYMONGO_SECRET_KEY) {
  console.warn('WARNING: PAYMONGO_SECRET_KEY missing. Source creation will fail until set.');
}

// Utility: pesos (number) -> centavos integer
function toCentavos(pesos) {
  return Math.round(Number(pesos) * 100);
}

// Basic validation
function validateAmount(v) {
  const n = Number(v);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

// Create GCash payment source
app.post('/api/payments/gcash', async (req, res) => {
  try {
    const { amount, description } = req.body || {};
    const validAmount = validateAmount(amount);
    if (!validAmount) return res.status(400).json({ error: 'Invalid amount' });

    if (!PAYMONGO_SECRET_KEY) return res.status(500).json({ error: 'Server not configured with PayMongo secret key' });

    const success = process.env.SUCCESS_URL || 'http://localhost:5173/checkout.html?status=success';
    const failed = process.env.FAILED_URL || 'http://localhost:5173/checkout.html?status=failed';

    const payload = {
      data: {
        attributes: {
          amount: toCentavos(validAmount),
          currency: 'PHP',
          type: 'gcash',
          description: description || `Meraki Order ${Date.now()}`,
          redirect: {
            success,
            failed
          }
        }
      }
    };

    const resp = await axios.post('https://api.paymongo.com/v1/sources', payload, {
      auth: { username: PAYMONGO_SECRET_KEY, password: '' },
      headers: { 'Content-Type': 'application/json' }
    });

    const source = resp.data?.data;
    const checkoutUrl = source?.attributes?.redirect?.checkout_url;
    return res.json({ checkoutUrl, sourceId: source?.id });
  } catch (err) {
    console.error('Error creating GCash source', err.response?.data || err.message);
    return res.status(500).json({ error: 'Failed to create GCash source', details: err.response?.data || err.message });
  }
});

// Webhook endpoint (needs public URL; verify signature and handle events)
app.post('/api/webhooks/paymongo', express.raw({ type: 'application/json' }), (req, res) => {
  // NOTE: PayMongo webhooks send signature in headers; you'd verify and then parse.
  // For now just log.
  try {
    const eventJson = req.body.toString();
    console.log('Webhook received:', eventJson);
  } catch (e) {
    console.warn('Failed to parse webhook body');
  }
  res.status(200).send('OK');
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 5175;
app.listen(port, () => console.log(`Payments server running on :${port}`));
