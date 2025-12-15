// Recipe Configuration - Maps website products to WebApp inventory ingredients
// Each product deducts 1 unit of each ingredient per order (1:1 ratio)

const PRODUCT_RECIPES = {
    // Milktea products (m1-m8)
    'm1': { // Bubble Tea
        ingredients: {
            'milk_tea_base': 1,
            'tapioca_pearls': 1,
            'ice': 1
        }
    },
    'm2': { // Cookies & Cream
        ingredients: {
            'milk_tea_base': 1,
            'cookies_cream_powder': 1,
            'ice': 1
        }
    },
    'm3': { // Choco Hokkaido
        ingredients: {
            'milk_tea_base': 1,
            'chocolate_powder': 1,
            'ice': 1
        }
    },
    'm4': { // Matcha
        ingredients: {
            'milk_tea_base': 1,
            'matcha_powder': 1,
            'ice': 1
        }
    },
    'm5': { // Winter Melon
        ingredients: {
            'milk_tea_base': 1,
            'winter_melon_syrup': 1,
            'ice': 1
        }
    },
    'm6': { // Okinawa
        ingredients: {
            'milk_tea_base': 1,
            'brown_sugar': 1,
            'ice': 1
        }
    },
    'm7': { // Red Velvet
        ingredients: {
            'milk_tea_base': 1,
            'red_velvet_powder': 1,
            'ice': 1
        }
    },
    'm8': { // Chocolate
        ingredients: {
            'milk_tea_base': 1,
            'chocolate_syrup': 1,
            'ice': 1
        }
    },

    // Iced Coffee (ic1-ic6)
    'ic1': { // Spanish Latte
        ingredients: {
            'coffee_base': 1,
            'milk': 1,
            'condensed_milk': 1,
            'ice': 1
        }
    },
    'ic2': { // French Vanilla
        ingredients: {
            'coffee_base': 1,
            'vanilla_syrup': 1,
            'milk': 1,
            'ice': 1
        }
    },
    'ic3': { // Salted Caramel
        ingredients: {
            'coffee_base': 1,
            'caramel_syrup': 1,
            'salt': 1,
            'milk': 1,
            'ice': 1
        }
    },
    'ic4': { // Dark Mocha
        ingredients: {
            'coffee_base': 1,
            'chocolate_syrup': 1,
            'milk': 1,
            'ice': 1
        }
    },
    'ic5': { // Matcha (Iced)
        ingredients: {
            'coffee_base': 1,
            'matcha_powder': 1,
            'milk': 1,
            'ice': 1
        }
    },
    'ic6': { // Hazelnut
        ingredients: {
            'coffee_base': 1,
            'hazelnut_syrup': 1,
            'milk': 1,
            'ice': 1
        }
    },

    // Cheesecake (ch1-ch5)
    'ch1': { // Oreo Matcha
        ingredients: {
            'cheesecake_base': 1,
            'oreo_cookies': 1,
            'matcha_powder': 1
        }
    },
    'ch2': { // Red Velvet
        ingredients: {
            'cheesecake_base': 1,
            'red_velvet_powder': 1
        }
    },
    'ch3': { // Oreolicious
        ingredients: {
            'cheesecake_base': 1,
            'oreo_cookies': 1
        }
    },
    'ch4': { // Creamy Cheesecake
        ingredients: {
            'cheesecake_base': 1,
            'cream': 1
        }
    },
    'ch5': { // Choco Delight
        ingredients: {
            'cheesecake_base': 1,
            'chocolate_powder': 1
        }
    },

    // Fruit Tea (ft1-ft7)
    'ft1': { // Lychee
        ingredients: {
            'tea_base': 1,
            'lychee_syrup': 1,
            'ice': 1
        }
    },
    'ft2': { // Orange
        ingredients: {
            'tea_base': 1,
            'orange_juice': 1,
            'ice': 1
        }
    },
    'ft3': { // Blueberry
        ingredients: {
            'tea_base': 1,
            'blueberry_syrup': 1,
            'ice': 1
        }
    },
    'ft4': { // Apple Green
        ingredients: {
            'tea_base': 1,
            'apple_syrup': 1,
            'ice': 1
        }
    },
    'ft5': { // Four Season
        ingredients: {
            'tea_base': 1,
            'mixed_fruit_syrup': 1,
            'ice': 1
        }
    },
    'ft6': { // Strawberry
        ingredients: {
            'tea_base': 1,
            'strawberry_syrup': 1,
            'ice': 1
        }
    },
    'ft7': { // Passion Fruit
        ingredients: {
            'tea_base': 1,
            'passion_fruit_syrup': 1,
            'ice': 1
        }
    },

    // Soda (s1-s6)
    's1': { // Green Sparkle
        ingredients: {
            'soda_water': 1,
            'lime_syrup': 1,
            'ice': 1
        }
    },
    's2': { // Blueberry Cloud
        ingredients: {
            'soda_water': 1,
            'blueberry_syrup': 1,
            'ice': 1
        }
    },
    's3': { // Lychee Soda
        ingredients: {
            'soda_water': 1,
            'lychee_syrup': 1,
            'ice': 1
        }
    },
    's4': { // Strawberry Burst
        ingredients: {
            'soda_water': 1,
            'strawberry_syrup': 1,
            'ice': 1
        }
    },
    's5': { // Blue Lagoon
        ingredients: {
            'soda_water': 1,
            'blue_curacao': 1,
            'ice': 1
        }
    },
    's6': { // Sparkling Apple
        ingredients: {
            'soda_water': 1,
            'apple_syrup': 1,
            'ice': 1
        }
    },

    // Frappe (frp1-frp6)
    'frp1': { // Oreo Java Chip
        ingredients: {
            'frappe_base': 1,
            'oreo_cookies': 1,
            'coffee_base': 1,
            'ice': 1
        }
    },
    'frp2': { // Mango
        ingredients: {
            'frappe_base': 1,
            'mango_puree': 1,
            'ice': 1
        }
    },
    'frp3': { // Creamy Avocado
        ingredients: {
            'frappe_base': 1,
            'avocado': 1,
            'ice': 1
        }
    },
    'frp4': { // Ube
        ingredients: {
            'frappe_base': 1,
            'ube_powder': 1,
            'ice': 1
        }
    },
    'frp5': { // Strawberry
        ingredients: {
            'frappe_base': 1,
            'strawberry_syrup': 1,
            'ice': 1
        }
    },
    'frp6': { // Bubble Gum
        ingredients: {
            'frappe_base': 1,
            'bubblegum_syrup': 1,
            'ice': 1
        }
    },

    // Snacks (sn1-sn7)
    'sn1': { // Nachos
        ingredients: {
            'tortilla_chips': 1,
            'cheese_sauce': 1
        }
    },
    'sn2': { // Chicken Nuggets
        ingredients: {
            'chicken_nuggets': 1
        }
    },
    'sn3': { // Hotdog
        ingredients: {
            'hotdog': 1,
            'bun': 1
        }
    },
    'sn4': { // Fish Fillet
        ingredients: {
            'fish_fillet': 1
        }
    },
    'sn5': { // Chicken Wings
        ingredients: {
            'chicken_wings': 1
        }
    },
    'sn6': { // Burger Steak
        ingredients: {
            'beef_patty': 1,
            'gravy': 1
        }
    },
    'sn7': { // Toasted Siopao
        ingredients: {
            'siopao': 1
        }
    },

    // Fries (fries1-fries3)
    'fries1': { // Regular Fries
        ingredients: {
            'potato': 1,
            'salt': 1
        }
    },
    'fries2': { // Cheese Fries
        ingredients: {
            'potato': 1,
            'cheese_powder': 1,
            'salt': 1
        }
    },
    'fries3': { // Sour Cream Fries
        ingredients: {
            'potato': 1,
            'sour_cream_powder': 1,
            'salt': 1
        }
    }
};

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.PRODUCT_RECIPES = PRODUCT_RECIPES;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PRODUCT_RECIPES };
}
