// Best Seller Configuration
// Edit this file to change which products appear as best sellers

export const bestSellerConfig = {
    // Products displayed on homepage (2 items)
    homepageBestSellers: [
        {
            id: 'ic6',
            name: 'Hazelnut',
            price: 49,
            description: 'Nutty hazelnut coffee delight.',
            image: 'ic6.svg'
        },
        {
            id: 'ft6',
            name: 'Strawberry Matcha',
            price: 135,
            description: 'Vibrant matcha layered with house strawberry puree and fresh milk.',
            image: 'ft3.svg'
        }
    ],
    
    // Product IDs that get the "Best Seller" badge on browse/menu page
    menuBestSellerIds: ['ic6', 'ft6']
};

// Helper function to check if a product is a best seller
export function isBestSeller(productId) {
    return bestSellerConfig.menuBestSellerIds.includes(productId);
}

// Helper function to get homepage best sellers
export function getHomepageBestSellers() {
    return bestSellerConfig.homepageBestSellers;
}
