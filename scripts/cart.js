// This file manages the shopping cart functionalities, including adding and removing items.
// Persist cart to localStorage so items survive page navigation.

const STORAGE_KEY = 'meraki_meraki_cart';

let cart = loadCart();

// load from localStorage
function loadCart() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        const sanitized = parsed.map(item => {
            if (item && !item.baseId) {
                const idText = String(item.id || '');
                item.baseId = idText.includes('_') ? idText.split('_')[0] : idText;
            }
            if (!item || typeof item.quantity !== 'number' || Number.isNaN(item.quantity) || item.quantity <= 0) {
                item.quantity = 1;
            }
            return item;
        }).filter(Boolean);

        const merged = [];
        sanitized.forEach(item => {
            const key = String(item.id || '');
            if (!key) return;
            const existing = merged.find(entry => String(entry.id) === key);
            if (existing) {
                const qty = item.quantity && item.quantity > 0 ? item.quantity : 1;
                existing.quantity = (existing.quantity || 1) + qty;
            } else {
                merged.push({ ...item, quantity: item.quantity && item.quantity > 0 ? item.quantity : 1 });
            }
        });

        return merged;
    } catch (e) {
        console.warn('Failed to load cart from storage', e);
        return [];
    }
}

function saveCart() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        // notify other scripts/pages to update previews/displays
        try { window.dispatchEvent(new CustomEvent('meraki:cart:changed')); } catch (e) {}
    } catch (e) {
        console.warn('Failed to save cart to storage', e);
    }
}

// Function to add an item to the cart
function addToCart(item) {
    // ensure item has id, name, price
    if (!item || !item.id) {
        item.id = `i_${Date.now()}_${Math.floor(Math.random()*1000)}`;
    }
    if (!item.baseId) {
        const rawId = String(item.id || '');
        item.baseId = rawId.includes('_') ? rawId.split('_')[0] : rawId;
    }
    const key = String(item.id);
    const existing = cart.find(cartItem => String(cartItem.id) === key);
    const requestedQty = Number(item && item.quantity);
    const qtyToAdd = Number.isFinite(requestedQty) && requestedQty > 0 ? Math.floor(requestedQty) : 1;

    if (existing) {
        existing.quantity = (existing.quantity || 1) + qtyToAdd;
    } else {
        item.quantity = qtyToAdd;
        cart.push(item);
    }
    saveCart();
    updateCartDisplay();
}

// Function to remove an item from the cart
function removeFromCart(itemId) {
    cart = cart.filter(cartItem => String(cartItem.id) !== String(itemId));
    saveCart();
    updateCartDisplay();
}

function changeItemQuantity(itemId, delta) {
    if (!delta) return;
    const index = cart.findIndex(cartItem => String(cartItem.id) === String(itemId));
    if (index === -1) return;

    const item = cart[index];
    const currentQty = item.quantity && item.quantity > 0 ? item.quantity : 1;
    const nextQty = currentQty + delta;

    if (nextQty <= 0) {
        cart.splice(index, 1);
    } else {
        item.quantity = nextQty;
    }

    saveCart();
    updateCartDisplay();
}

// Function to clear cart (helper)
function clearCart() {
    cart = [];
    saveCart();
    updateCartDisplay();
}

// Function to update the cart display (now targets checkout display)
function updateCartDisplay() {
    const cartDisplay = document.getElementById('checkout-display') || document.getElementById('cart-display');
    const total = cart.reduce((acc, item) => acc + (Number(item.price || 0) * (item.quantity && item.quantity > 0 ? item.quantity : 1)), 0);
    const summaryEl = document.getElementById('checkout-summary-total');
    if (summaryEl) {
        summaryEl.textContent = `Total: ₱${total.toFixed(2)}`;
    }

    if (!cartDisplay || (cartDisplay.dataset && cartDisplay.dataset.managedBy === 'checkout-module')) {
        return;
    }

    cartDisplay.innerHTML = '';

    if (cart.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-msg';
        empty.textContent = 'Your checkout is empty.';
        cartDisplay.appendChild(empty);
    } else {
        cart.forEach(item => {
            const quantity = item.quantity && item.quantity > 0 ? item.quantity : 1;
            const totalPrice = Number(item.price || 0) * quantity;
            const metaParts = [];
            if (item.size) metaParts.push(`Size: ${item.size}`);
            if (item.description) metaParts.push(item.description);
            const metaText = metaParts.join(' • ');
            const itemRow = document.createElement('div');
            itemRow.className = 'checkout-item';
            itemRow.innerHTML = `
                <div class="item-info">
                    <strong>${item.name}</strong>
                    <div class="item-meta">${metaText}</div>
                </div>
                <div class="item-controls">
                    <div class="quantity-controls" data-id="${item.id}">
                        <button type="button" class="qty-btn" data-action="decrease" aria-label="Decrease quantity">-</button>
                        <span class="qty-value">${quantity}</span>
                        <button type="button" class="qty-btn" data-action="increase" aria-label="Increase quantity">+</button>
                    </div>
                    <span class="price">₱${totalPrice.toFixed(2)}</span>
                    <button type="button" class="remove-btn" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartDisplay.appendChild(itemRow);
        });
    }

    // Update summary element (if present) instead of appending a duplicated total into the list.
    // attach remove handlers
    cartDisplay.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            removeFromCart(id);
        });
    });

    cartDisplay.querySelectorAll('.quantity-controls').forEach(control => {
        const id = control.getAttribute('data-id');
        control.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                if (action === 'increase') {
                    changeItemQuantity(id, 1);
                } else if (action === 'decrease') {
                    changeItemQuantity(id, -1);
                }
            });
        });
    });
}

// Function to get the current cart items
function getCartItems() {
    return cart.slice();
}

// Expose to window for simple page scripts (keeps existing exports)
window.MerakiCart = {
    addToCart,
    removeFromCart,
    updateCartDisplay,
    getCartItems,
    clearCart,
    changeItemQuantity
};

export { addToCart, removeFromCart, updateCartDisplay, getCartItems, clearCart, changeItemQuantity };