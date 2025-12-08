// Best Seller Configuration
// Edit this file to change which products appear as best sellers

export const bestSellerConfig = {
    // Products displayed on homepage (3 items)
    homepageBestSellers: [
        {
            id: 'ic6',
            name: 'Hazelnut Iced Coffee',
            price: 49,
            description: 'Nutty hazelnut coffee delight.',
            image: 'ic6.jpg'
        },
        {
            id: 'ft6',
            name: 'Strawberry Fruit Tea',
            price: 49,
            description: 'Sweet strawberry fruit tea.',
            image: 'ft6.jpg'
        },
        {
            id: 'frp3',
            name: 'Creamy Avocado Frappe',
            price: 79,
            description: 'Smooth and creamy avocado frappe.',
            image: 'frp3.jpg'
        }
    ],
    
    // Product IDs that get the "Best Seller" badge on browse/menu page
    menuBestSellerIds: ['ic6', 'ft6', 'frp3']
};

// Helper function to check if a product is a best seller
export function isBestSeller(productId) {
    return bestSellerConfig.menuBestSellerIds.includes(productId);
}

// Helper function to get homepage best sellers
export function getHomepageBestSellers() {
    return bestSellerConfig.homepageBestSellers;
}
