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
    const previewBtn = document.getElementById('cart-preview-btn');
    
    const updateCartPreview = () => {
        try {
            const items = window.MerakiCart ? window.MerakiCart.getCartItems() : JSON.parse(localStorage.getItem('meraki_meraki_cart') || '[]');
            const count = (items || []).reduce((sum, it) => sum + (it.quantity && it.quantity > 0 ? it.quantity : 1), 0);
            const total = (items || []).reduce((s, it) => s + (Number(it.price || 0) * (it.quantity && it.quantity > 0 ? it.quantity : 1)), 0);
            if (previewBtn) {
                const currency = `₱${total.toFixed(2)}`;
                previewBtn.textContent = `${count} ${count === 1 ? 'item' : 'items'} • ${currency}`;
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

    // Cart Modal Functionality
    const cartModal = document.getElementById('cart-modal');
    const cartModalClose = document.querySelector('.cart-modal-close');
    const cartModalOverlay = document.querySelector('.cart-modal-overlay');
    const cartContinueBtn = document.querySelector('.cart-continue-btn');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartModalTotal = document.getElementById('cart-modal-total');
    const cartEmptyMessage = document.querySelector('.cart-empty-message');

    function openCartModal() {
        if (!cartModal) return;
        
        // Get cart items
        const items = window.MerakiCart ? window.MerakiCart.getCartItems() : JSON.parse(localStorage.getItem('meraki_meraki_cart') || '[]');
        
        // Render cart items
        renderCartItems(items);
        
        // Show modal
        cartModal.classList.add('show');
        cartModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeCartModal() {
        if (!cartModal) return;
        cartModal.classList.remove('show');
        cartModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function renderCartItems(items) {
        if (!cartItemsList || !cartModalTotal || !cartEmptyMessage) return;
        
        if (!items || items.length === 0) {
            cartItemsList.style.display = 'none';
            cartEmptyMessage.style.display = 'block';
            cartModalTotal.textContent = '₱0.00';
            return;
        }

        cartItemsList.style.display = 'flex';
        cartEmptyMessage.style.display = 'none';

        // Clear existing items
        cartItemsList.innerHTML = '';

        // Calculate total
        let total = 0;

        // Render each item
        items.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';

            const prefix = window.location.pathname.includes('/pages/') ? '../' : '';
            const placeholderPath = `${prefix}assets/menu/placeholder.jfif`;
            const rawId = String(item.baseId || item.id || '');
            const baseId = rawId.includes('_') ? rawId.split('_')[0] : rawId;
            const resolvedImage = baseId ? `${prefix}assets/menu/${baseId}.jpg` : (typeof item.image === 'string' ? item.image : placeholderPath);

            const quantity = item.quantity && item.quantity > 0 ? item.quantity : 1;
            const price = Number(item.price || 0);
            const lineTotal = price * quantity;
            total += lineTotal;

            itemEl.innerHTML = `
                <button type="button" class="cart-item-remove" data-index="${index}" title="Remove item" aria-label="Remove ${item.name}">&times;</button>
                <img src="${placeholderPath}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name || 'Item'}</div>
                    ${item.size ? `<div class="cart-item-size">Size: ${item.size}</div>` : ''}
                    <div class="cart-item-qty">Quantity: ${quantity}</div>
                    <div class="cart-item-price">₱${lineTotal.toFixed(2)}</div>
                </div>
            `;

            const cartImg = itemEl.querySelector('.cart-item-img');
            if (cartImg) {
                cartImg.onerror = () => {
                    cartImg.src = placeholderPath;
                    cartImg.onerror = null;
                };
                cartImg.src = resolvedImage || placeholderPath;
            }

            const removeBtn = itemEl.querySelector('.cart-item-remove');
            removeBtn.addEventListener('click', () => {
                removeCartItem(index);
            });

            cartItemsList.appendChild(itemEl);
        });

        // Update total
        cartModalTotal.textContent = `₱${total.toFixed(2)}`;
    }

    function removeCartItem(index) {
        try {
            // Get current cart items
            let items = window.MerakiCart ? window.MerakiCart.getCartItems() : JSON.parse(localStorage.getItem('meraki_meraki_cart') || '[]');
            const item = items[index];
            if (!item) return;

            if (window.MerakiCart && typeof window.MerakiCart.changeItemQuantity === 'function') {
                window.MerakiCart.changeItemQuantity(item.id, -1);
                items = window.MerakiCart.getCartItems();
            } else {
                const currentQty = item.quantity && item.quantity > 0 ? item.quantity : 1;
                if (currentQty <= 1) {
                    items.splice(index, 1);
                } else {
                    items[index].quantity = currentQty - 1;
                }
                localStorage.setItem('meraki_meraki_cart', JSON.stringify(items));
                window.dispatchEvent(new CustomEvent('meraki:cart:changed'));
            }

            // Re-render cart items in modal
            renderCartItems(items);
        } catch (e) {
            console.warn('Failed to remove cart item', e);
        }
    }

    // Event listeners for cart modal
    if (previewBtn) {
        previewBtn.addEventListener('click', openCartModal);
    }

    if (cartModalClose) {
        cartModalClose.addEventListener('click', closeCartModal);
    }

    if (cartModalOverlay) {
        cartModalOverlay.addEventListener('click', closeCartModal);
    }

    if (cartContinueBtn) {
        cartContinueBtn.addEventListener('click', closeCartModal);
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartModal && cartModal.classList.contains('show')) {
            closeCartModal();
        }
    });

    // Update modal when cart changes
    window.addEventListener('meraki:cart:changed', () => {
        if (cartModal && cartModal.classList.contains('show')) {
            const items = window.MerakiCart ? window.MerakiCart.getCartItems() : JSON.parse(localStorage.getItem('meraki_meraki_cart') || '[]');
            renderCartItems(items);
        }
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

// Add-to-cart handler for simple product cards (Best Seller and others)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            // find nearby product info
            const card = btn.closest('.product-card');
            if (!card) return;
            const nameEl = card.querySelector('h4');
            const priceEl = card.querySelector('.price');
            const descEl = card.querySelector('.desc');
            const id = btn.getAttribute('data-id') || `prod_${Date.now()}`;
            const baseId = typeof id === 'string' ? id.split('_')[0] : id;

            const name = nameEl ? nameEl.textContent.trim() : 'Product';
            const priceText = priceEl ? priceEl.textContent.trim() : '0';
            const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
            const description = descEl ? descEl.textContent.trim() : '';

            try {
                if (window.MerakiCart && typeof window.MerakiCart.addToCart === 'function') {
                    window.MerakiCart.addToCart({ id, baseId, name, price, description });
                } else if (typeof addToCart === 'function') {
                    addToCart({ id, baseId, name, price, description });
                } else {
                    // fallback: use localStorage directly
                    const key = 'meraki_meraki_cart';
                    const raw = localStorage.getItem(key) || '[]';
                    const items = JSON.parse(raw);
                    const existing = items.find(it => String(it.id) === String(id));
                    if (existing) {
                        const qty = existing.quantity && existing.quantity > 0 ? existing.quantity : 1;
                        existing.quantity = qty + 1;
                    } else {
                        items.push({ id, baseId, name, price, description, quantity: 1 });
                    }
                    localStorage.setItem(key, JSON.stringify(items));
                    window.dispatchEvent(new CustomEvent('meraki:cart:changed'));
                }
            } catch (e) {
                console.warn('Failed to add to cart', e);
            }
        });
    });
});

// Small visual microinteractions: fly-to-cart + confetti + toast
document.addEventListener('DOMContentLoaded', () => {
    // create confetti canvas and toast container if not present
    if (!document.querySelector('.confetti-canvas')) {
        const canvas = document.createElement('canvas');
        canvas.className = 'confetti-canvas';
        canvas.id = 'ms-confetti-canvas';
        document.body.appendChild(canvas);
    }

    if (!document.querySelector('.ms-toast')) {
        const t = document.createElement('div');
        t.className = 'ms-toast';
        t.id = 'ms-toast';
        t.textContent = 'Added to cart';
        document.body.appendChild(t);
    }

    // Confetti implementation (lightweight)
    function fireConfetti(x, y, count = 18) {
        const canvas = document.getElementById('ms-confetti-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const DPR = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * DPR;
        canvas.height = window.innerHeight * DPR;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.scale(DPR, DPR);

        const colors = ['#FFD699','#FF6B6B','#6F4E37','#FFD1E6','#6BE3FF'];
        const particles = [];
        for (let i=0;i<count;i++) {
            particles.push({
                x: x + (Math.random()-0.5)*30,
                y: y + (Math.random()-0.5)*30,
                vx: (Math.random()-0.5)*6,
                vy: Math.random()*-6 - 2,
                r: 6 + Math.random()*6,
                c: colors[Math.floor(Math.random()*colors.length)],
                rot: Math.random()*360,
                vr: (Math.random()-0.5)*10
            });
        }

        let t0 = performance.now();
        const duration = 900;
        function frame(now) {
            const dt = now - t0;
            ctx.clearRect(0,0,canvas.width,DPR?canvas.height/DPR:canvas.height);
            particles.forEach(p => {
                p.vy += 0.25; // gravity
                p.x += p.vx;
                p.y += p.vy;
                p.rot += p.vr;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot * Math.PI / 180);
                ctx.fillStyle = p.c;
                ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r*0.6);
                ctx.restore();
            });
            if (dt < duration) requestAnimationFrame(frame);
            else ctx.clearRect(0,0,canvas.width,canvas.height);
        }
        requestAnimationFrame(frame);
    }

    function showToast(msg) {
        const t = document.getElementById('ms-toast');
        if (!t) return;
        t.textContent = msg || 'Added to cart';
        t.classList.add('visible');
        setTimeout(() => t.classList.remove('visible'), 1600);
    }

    // when cart changes, pulse the cart preview
    window.addEventListener('meraki:cart:changed', () => {
        const preview = document.getElementById('cart-preview');
        if (preview) {
            preview.animate([{transform:'scale(1)'},{transform:'scale(1.14)'},{transform:'scale(1)'}], {duration:420, easing:'cubic-bezier(.2,.9,.3,1)'});
        }
    });

    // attach to all add-to-cart buttons (.mi-add and .add-cart)
    function attachFlyHandlers() {
        document.querySelectorAll('.mi-add, .add-cart, #modal-add').forEach(btn => {
            if (btn.dataset.mshandler) return; // avoid double attach
            btn.dataset.mshandler = '1';
            btn.addEventListener('click', (e) => {
                // locate image to clone
                const item = btn.closest('.menu-item') || btn.closest('.product-card') || document.body;
                let img = item ? item.querySelector('img, .mi-img') : null;
                if (btn.id === 'modal-add') {
                    const modalImg = document.querySelector('#item-modal .modal-img');
                    if (modalImg) img = modalImg;
                }
                const preview = document.getElementById('cart-preview');
                // compute start position (center of img) and target (center of preview)
                let sx = window.innerWidth/2, sy = window.innerHeight/2;
                if (img) {
                    const r = img.getBoundingClientRect();
                    sx = r.left + r.width/2; sy = r.top + r.height/2;
                }
                let tx = window.innerWidth - 48, ty = 48;
                if (preview) {
                    const pr = preview.getBoundingClientRect(); tx = pr.left + pr.width/2; ty = pr.top + pr.height/2;
                }

                // Disable confetti animation - only keep fly-to-cart animation
                // fireConfetti(sx, sy, 18);

                // clone a small circle to animate
                const clone = document.createElement('div');
                clone.style.position = 'fixed';
                clone.style.left = (sx - 12) + 'px';
                clone.style.top = (sy - 12) + 'px';
                clone.style.width = '24px';
                clone.style.height = '24px';
                clone.style.borderRadius = '6px';
                clone.style.background = 'linear-gradient(135deg,#ffd699,#ffb86b)';
                clone.style.zIndex = 9999;
                clone.style.pointerEvents = 'none';
                document.body.appendChild(clone);

                const dx = tx - sx; const dy = ty - sy;
                const anim = clone.animate([
                    { transform: `translate(0px,0px) scale(1)`, opacity:1 },
                    { transform: `translate(${dx*0.55}px,${dy*0.55}px) scale(0.8)`, opacity:1, offset:0.6 },
                    { transform: `translate(${dx}px,${dy}px) scale(0.14)`, opacity:0 }
                ], { duration: 700, easing: 'cubic-bezier(.2,.9,.3,1)' });
                anim.onfinish = () => { clone.remove(); showToast('Added to cart'); };
            });
        });
    }

    // run initially and after any dynamic list changes
    attachFlyHandlers();
    // observe list for future items (in case browse builds items dynamically)
    const mlist = document.querySelector('.menu-list');
    if (mlist) {
        const obs = new MutationObserver(() => attachFlyHandlers());
        obs.observe(mlist, { childList: true, subtree: true });
    }
});