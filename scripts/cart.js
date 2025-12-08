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
        return parsed.map(item => {
            if (item && !item.baseId) {
                const idText = String(item.id || '');
                item.baseId = idText.includes('_') ? idText.split('_')[0] : idText;
            }
            return item;
        });
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
    cart.push(item);
    saveCart();
    updateCartDisplay();
}

// Function to remove an item from the cart
function removeFromCart(itemId) {
    cart = cart.filter(cartItem => String(cartItem.id) !== String(itemId));
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
    if (!cartDisplay) return;

    cartDisplay.innerHTML = '';

    if (cart.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-msg';
        empty.textContent = 'Your checkout is empty.';
        cartDisplay.appendChild(empty);
    } else {
        cart.forEach(item => {
            const itemRow = document.createElement('div');
            itemRow.className = 'checkout-item';
            itemRow.innerHTML = `
                <div class="item-info">
                    <strong>${item.name}</strong>
                    <div class="item-meta">${item.description || ''}</div>
                </div>
                <div class="item-controls">
                    <span class="price">₱${Number(item.price || 0).toFixed(2)}</span>
                    <button class="remove-btn" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartDisplay.appendChild(itemRow);
        });
    }

    // Update summary element (if present) instead of appending a duplicated total into the list.
    const total = cart.reduce((acc, item) => acc + Number(item.price || 0), 0);
    const summaryEl = document.getElementById('checkout-summary-total');
    if (summaryEl) {
        summaryEl.textContent = `Total: ₱${total.toFixed(2)}`;
    }

    // attach remove handlers
    cartDisplay.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            removeFromCart(id);
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
    clearCart
};

export { addToCart, removeFromCart, updateCartDisplay, getCartItems, clearCart };