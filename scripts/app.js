// This is the main JavaScript file that initializes the website and handles common functionalities.

document.addEventListener('DOMContentLoaded', () => {
    console.log('Welcome to Meraki Sipside!');
});

// Removed automatic back-navigation logic. Back button now uses a simple single-step call:
// <button onclick="window.history.back()">← Back</button>

// You can keep other app helpers here. For now we leave this file minimal.
document.addEventListener('DOMContentLoaded', () => {
    // placeholder for other page scripts; no back-nav manipulation here
});

// Minimal app script. No automatic show/hide of back button.
// Back buttons are explicit elements in page headers using window.history.back()

document.addEventListener('DOMContentLoaded', () => {
    // Add small enhancement: hide back buttons when history length <= 1 (no previous page)
    document.querySelectorAll('.back-btn').forEach(btn => {
        try {
            if (history.length <= 1) btn.style.visibility = 'hidden';
        } catch (e) {
            // ignore
        }
    });
});

// minimal app helpers: cart preview updater and history-safe back toggles
document.addEventListener('DOMContentLoaded', () => {
    const preview = document.getElementById('cart-preview');
    const updateCartPreview = () => {
        try {
            const items = window.MerakiCart ? window.MerakiCart.getCartItems() : JSON.parse(localStorage.getItem('meraki_meraki_cart') || '[]');
            const count = (items && items.length) || 0;
            const total = (items || []).reduce((s, it) => s + Number(it.price || 0), 0);
            if (preview) {
                const link = preview.querySelector('a');
                const currency = `₱${total.toFixed(2)}`;
                link.textContent = `${count} ${count === 1 ? 'item' : 'items'} • ${currency}`;
            }
        } catch (e) {
            /* noop */
        }
    };

    // update on load
    updateCartPreview();

    // update when cart changes (from cart.js)
    window.addEventListener('meraki:cart:changed', updateCartPreview);

    // also update if another tab changes localStorage
    window.addEventListener('storage', (e) => {
        if (e.key === 'meraki_meraki_cart') updateCartPreview();
    });

    // hide left back button on home (no-op) but keep layout consistent
    document.querySelectorAll('.back-btn').forEach(btn => {
        try {
            if (location.pathname.endsWith('/index.html') || location.pathname.endsWith('/')) {
                btn.style.visibility = 'hidden';
            } else {
                btn.style.visibility = 'visible';
            }
        } catch (e) {}
    });
});

// Additional script for unified back-button handler
document.addEventListener('DOMContentLoaded', () => {
    // existing initialization...
    
    // unified back-button handler
    const backBtn = document.getElementById('app-back');
    if (backBtn) {
        function updateBackVisibility() {
            // hide on home page
            const isHome = location.pathname.endsWith('/index.html') || location.pathname === '/' || location.pathname.endsWith('\\index.html');
            if (isHome) {
                backBtn.style.display = 'none';
                return;
            }
            backBtn.style.display = '';
        }

        backBtn.addEventListener('click', (e) => {
            const target = backBtn.dataset.back; // explicit flow target (relative path)
            if (target) {
                // navigate to the intended flow page (use location.assign so history is preserved)
                location.assign(target);
                return;
            }
            // fallback to one-step history.back()
            if (history.length > 1) {
                history.back();
            } else {
                // nothing to go back to - hide or go home
                location.assign('/index.html');
            }
        });

        updateBackVisibility();
        // keep visibility correct if SPA-like navigation added later
        window.addEventListener('popstate', updateBackVisibility);
    }

    // ...existing code...
});