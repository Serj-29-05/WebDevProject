// Order Processing System
// Records completed orders and deducts inventory from WebApp

const ORDERS_STORAGE_KEY = 'meraki_orders';
const ORDERS_PROCESSED_KEY = 'meraki_orders_processed';

// Record a new order when payment is confirmed
function recordOrder(cartItems) {
    if (!cartItems || cartItems.length === 0) return null;

    const order = {
        id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        items: cartItems.map(item => ({
            id: item.baseId || item.id,
            name: item.name,
            quantity: item.quantity || 1,
            price: item.price,
            size: item.size || null
        })),
        total: cartItems.reduce((sum, item) => {
            const qty = item.quantity || 1;
            return sum + (Number(item.price || 0) * qty);
        }, 0),
        status: 'pending_fulfillment', // pending_fulfillment, completed, cancelled
        processed: false // Whether inventory has been deducted
    };

    // Save order to localStorage
    try {
        const orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
        orders.push(order);
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
        
        // Dispatch event for WebApp to listen
        window.dispatchEvent(new CustomEvent('meraki:order:created', { detail: order }));
        
        console.log('Order recorded:', order.id);
        return order;
    } catch (e) {
        console.error('Failed to record order:', e);
        return null;
    }
}

// Get all orders
function getAllOrders() {
    try {
        return JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
    } catch (e) {
        console.error('Failed to load orders:', e);
        return [];
    }
}

// Get pending orders (not yet processed by inventory system)
function getPendingOrders() {
    const orders = getAllOrders();
    return orders.filter(order => !order.processed && order.status === 'pending_fulfillment');
}

// Mark order as processed
function markOrderAsProcessed(orderId) {
    try {
        const orders = getAllOrders();
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.processed = true;
            order.processedAt = new Date().toISOString();
            localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
            
            // Log processed order
            const processedOrders = JSON.parse(localStorage.getItem(ORDERS_PROCESSED_KEY) || '[]');
            processedOrders.push({
                orderId,
                processedAt: order.processedAt
            });
            localStorage.setItem(ORDERS_PROCESSED_KEY, JSON.stringify(processedOrders));
            
            return true;
        }
        return false;
    } catch (e) {
        console.error('Failed to mark order as processed:', e);
        return false;
    }
}

// Calculate ingredient requirements for an order
function calculateIngredientRequirements(order) {
    if (!window.PRODUCT_RECIPES) {
        console.warn('Recipe configuration not loaded');
        return {};
    }

    const requirements = {};
    
    order.items.forEach(item => {
        const productId = String(item.id).toLowerCase();
        const recipe = window.PRODUCT_RECIPES[productId];
        
        if (!recipe || !recipe.ingredients) {
            console.warn(`No recipe found for product: ${productId}`);
            return;
        }

        const quantity = item.quantity || 1;
        
        // Accumulate ingredient requirements
        Object.entries(recipe.ingredients).forEach(([ingredient, amount]) => {
            if (!requirements[ingredient]) {
                requirements[ingredient] = 0;
            }
            requirements[ingredient] += amount * quantity;
        });
    });

    return requirements;
}

// Export functions
if (typeof window !== 'undefined') {
    window.MerakiOrders = {
        recordOrder,
        getAllOrders,
        getPendingOrders,
        markOrderAsProcessed,
        calculateIngredientRequirements
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        recordOrder,
        getAllOrders,
        getPendingOrders,
        markOrderAsProcessed,
        calculateIngredientRequirements
    };
}
