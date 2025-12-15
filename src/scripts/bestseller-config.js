// Best Seller Configuration
// Edit this file to change which products appear as best sellers

export const bestSellerConfig = {
    // Products displayed on homepage (3 items)
    homepageBestSellers: [
        {
            id: 'frp1',
            name: 'Loaded Java Chips',
            price: 79,
            description: 'Coffee frappe with oreo and chocolate chips',
            image: 'frp1.jpg'
        },
        {
             id: 'ic5',
            name: 'Matcha Iced Coffee',
            price: 49,
            description: 'Green tea latte with a coffee twist',
            image: 'ic5.jpg'
        },
        {
           id: 'ic4',
            name: 'Dark Mocha',
            price: 49,
            description: 'Rich chocolate blended with espresso',
            image: 'ic4.jpg'
        }
    ],
    
    // Product IDs that get the "Best Seller" badge on browse/menu page
    menuBestSellerIds: ['frp1', 'ic5', 'ic4']
};

// Helper function to check if a product is a best seller
export function isBestSeller(productId) {
    return bestSellerConfig.menuBestSellerIds.includes(productId);
}

// Helper function to get homepage best sellers
export function getHomepageBestSellers() {
    return bestSellerConfig.homepageBestSellers;
}
