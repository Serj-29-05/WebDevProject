# How to Change Best Sellers

This guide explains how to update which products appear as "Best Sellers" on your website.

## Quick Start

1. Open the file: `src/scripts/bestseller-config.js`
2. Edit the configuration
3. Save the file
4. Refresh your website

## Configuration File Location

```
src/scripts/bestseller-config.js
```

## What You Can Change

### 1. Homepage Best Sellers (Featured Products)

Edit the `homepageBestSellers` array to change which 2 products appear on the homepage.

**Required fields for each product:**
- `id`: Product ID (must match the menu item ID)
- `name`: Product name
- `price`: Product price
- `description`: Short description
- `image`: Image filename (from `assets/menu/` folder)

**Example:**
```javascript
homepageBestSellers: [
    {
        id: 'ic3',
        name: 'Salted Caramel Latte',
        price: 145,
        description: 'Balanced espresso, caramel drizzle, and milk foam for a silky-sweet finish.',
        image: 'ic4.svg'
    },
    {
        id: 'ft6',
        name: 'Strawberry Matcha',
        price: 135,
        description: 'Vibrant matcha layered with house strawberry puree and fresh milk.',
        image: 'ft3.svg'
    }
]
```

### 2. Menu Page Best Seller Badges

Edit the `menuBestSellerIds` array to control which products get the "⭐ Best Seller" badge on the menu/browse page.

**Example:**
```javascript
menuBestSellerIds: ['ic3', 'ft6']
```

Add or remove product IDs from this array to change which items show the best seller badge.

## Common Product IDs

Here are some popular product IDs you can use:

### Iced Coffee
- `ic1`: Spanish Latte
- `ic2`: French Vanilla
- `ic3`: Salted Caramel
- `ic4`: Dark Mocha
- `ic5`: Matcha (Iced)
- `ic6`: Hazelnut

### Fruit Tea
- `ft1`: Lychee
- `ft2`: Orange
- `ft3`: Blueberry
- `ft4`: Apple Green
- `ft5`: Four Season
- `ft6`: Strawberry
- `ft7`: Passion Fruit

### Milktea
- `m1`: Bubble Tea
- `m2`: Cookies & Cream
- `m3`: Choco Hokkaido
- `m4`: Matcha
- `m5`: Winter Melon
- `m6`: Okinawa
- `m7`: Red Velvet
- `m8`: Chocolate

### Cheesecake
- `ch1`: Oreo Matcha
- `ch2`: Red Velvet
- `ch3`: Oreolicious
- `ch4`: Creamy Cheesecake
- `ch5`: Choco Delight

### Frappe
- `frp1`: Oreo Java Chip
- `frp2`: Mango
- `frp3`: Creamy Avocado
- `frp4`: Ube
- `frp5`: Strawberry
- `frp6`: Bubble Gum

### Snacks
- `sn1`: Regular Corndog
- `sn2`: Cheezy Corndog
- `sn3`: Classic Burger
- (and more...)

## Example: Changing to Different Best Sellers

If you want to feature **Mango Frappe** and **Ube Frappe** instead:

```javascript
export const bestSellerConfig = {
    homepageBestSellers: [
        {
            id: 'frp2',
            name: 'Mango Frappe',
            price: 79,
            description: 'Tropical mango blended frappe.',
            image: 'frp2.svg'
        },
        {
            id: 'frp4',
            name: 'Ube Frappe',
            price: 79,
            description: 'Filipino purple yam frappe.',
            image: 'frp4.svg'
        }
    ],
    
    menuBestSellerIds: ['frp2', 'frp4']
};
```

## Tips

- You can have as many best seller badges on the menu page as you want (just add more IDs)
- The homepage always shows exactly 2 products
- Make sure the `id` matches exactly with the product in your menu
- The `image` filename should match the SVG file in `src/assets/menu/`
- Prices should be numbers without the ₱ symbol

## Troubleshooting

**Products not showing?**
- Check that the product ID is correct
- Make sure the image file exists in `src/assets/menu/`
- Refresh your browser (Ctrl+F5 for hard refresh)

**Badge not appearing?**
- Verify the product ID is in the `menuBestSellerIds` array
- Check for typos in the ID

## Need Help?

If you need to add completely new products, you'll need to edit `src/pages/browse.html` where the full product list is defined.
