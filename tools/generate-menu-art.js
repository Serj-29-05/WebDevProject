const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, '../src/assets/menu');

const palettes = {
    Milktea: { bg: ['#f8ede3', '#f4d7b7'], accent: '#d9a066', detail: '#6f4d31', foam: '#fdf5e6', icon: 'milktea' },
    'Iced Coffee': { bg: ['#f4e4d7', '#e3c8af'], accent: '#c2825c', detail: '#4a2f23', foam: '#f2efe8', icon: 'icedCoffee' },
    Cheesecake: { bg: ['#f9efe9', '#fde5d0'], accent: '#f7b267', detail: '#b5673a', foam: '#fff4e3', icon: 'cheesecake' },
    'Fruit Tea': { bg: ['#f4f9f2', '#d9f0d0'], accent: '#95c867', detail: '#52823f', foam: '#fffdd9', icon: 'fruitTea' },
    Soda: { bg: ['#e8f1fc', '#c6dcff'], accent: '#69a1ff', detail: '#2353a0', foam: '#ffffff', icon: 'soda' },
    Frappe: { bg: ['#f5eff9', '#dbcff0'], accent: '#b48ad8', detail: '#60467d', foam: '#f9f6ff', icon: 'frappe' },
    Snacks: { bg: ['#f9efe3', '#f5d8a7'], accent: '#e58f56', detail: '#8a4e31', foam: '#fff4d2', icon: 'snack' },
    Fries: { bg: ['#fff3d6', '#ffd59c'], accent: '#f7a531', detail: '#c8650f', foam: '#ffe6b1', icon: 'fries' }
};

const items = [
    { id: 'm1', name: 'Bubble Tea', category: 'Milktea' },
    { id: 'm2', name: 'Cookies & Cream', category: 'Milktea' },
    { id: 'm3', name: 'Choco Hokkaido', category: 'Milktea' },
    { id: 'm4', name: 'Matcha', category: 'Milktea' },
    { id: 'm5', name: 'Winter Melon', category: 'Milktea' },
    { id: 'm6', name: 'Okinawa', category: 'Milktea' },
    { id: 'm7', name: 'Red Velvet', category: 'Milktea' },
    { id: 'm8', name: 'Chocolate', category: 'Milktea' },

    { id: 'ic1', name: 'Spanish Latte', category: 'Iced Coffee' },
    { id: 'ic2', name: 'French Vanilla', category: 'Iced Coffee' },
    { id: 'ic3', name: 'Salted Caramel', category: 'Iced Coffee' },
    { id: 'ic4', name: 'Dark Mocha', category: 'Iced Coffee' },
    { id: 'ic5', name: 'Matcha', category: 'Iced Coffee' },
    { id: 'ic6', name: 'Hazelnut', category: 'Iced Coffee' },

    { id: 'ch1', name: 'Oreo Matcha', category: 'Cheesecake' },
    { id: 'ch2', name: 'Red Velvet', category: 'Cheesecake' },
    { id: 'ch3', name: 'Oreolicious', category: 'Cheesecake' },
    { id: 'ch4', name: 'Creamy Cheesecake', category: 'Cheesecake' },
    { id: 'ch5', name: 'Choco Delight', category: 'Cheesecake' },

    { id: 'ft1', name: 'Lychee', category: 'Fruit Tea' },
    { id: 'ft2', name: 'Orange', category: 'Fruit Tea' },
    { id: 'ft3', name: 'Blueberry', category: 'Fruit Tea' },
    { id: 'ft4', name: 'Apple Green', category: 'Fruit Tea' },
    { id: 'ft5', name: 'Four Season', category: 'Fruit Tea' },
    { id: 'ft6', name: 'Strawberry', category: 'Fruit Tea' },
    { id: 'ft7', name: 'Passion Fruit', category: 'Fruit Tea' },

    { id: 's1', name: 'Green Sparkle', category: 'Soda' },
    { id: 's2', name: 'Blueberry Cloud', category: 'Soda' },
    { id: 's3', name: 'Lychee Soda', category: 'Soda' },
    { id: 's4', name: 'Strawberry Burst', category: 'Soda' },
    { id: 's5', name: 'Blue Lagoon', category: 'Soda' },
    { id: 's6', name: 'Sparkling Apple', category: 'Soda' },

    { id: 'frp1', name: 'Oreo Java Chip', category: 'Frappe' },
    { id: 'frp2', name: 'Mango', category: 'Frappe' },
    { id: 'frp3', name: 'Creamy Avocado', category: 'Frappe' },
    { id: 'frp4', name: 'Ube', category: 'Frappe' },
    { id: 'frp5', name: 'Strawberry', category: 'Frappe' },
    { id: 'frp6', name: 'Bubble Gum', category: 'Frappe' },

    { id: 'sn1', name: 'Regular Corndog', category: 'Snacks' },
    { id: 'sn2', name: 'Cheezy Corndog', category: 'Snacks' },
    { id: 'sn3', name: 'Classic Burger', category: 'Snacks' },
    { id: 'sn4', name: 'Cheese Burger', category: 'Snacks' },
    { id: 'sn5', name: 'Egg Burger', category: 'Snacks' },
    { id: 'sn6', name: 'Egg Burger With Cheese', category: 'Snacks' },
    { id: 'sn7', name: 'Egg Sandwich', category: 'Snacks' },
    { id: 'sn8', name: 'Ham & Egg Sandwich', category: 'Snacks' },
    { id: 'sn9', name: 'Classic Hotdog', category: 'Snacks' },
    { id: 'sn10', name: 'Cheezy Hotdog', category: 'Snacks' },
    { id: 'sn11', name: 'Overload Hotdog', category: 'Snacks' },

    { id: 'fries1', name: 'Cheese Fries', category: 'Fries' },
    { id: 'fries2', name: 'Sour Cream Fries', category: 'Fries' },
    { id: 'fries3', name: 'BBQ Fries', category: 'Fries' },
    { id: 'fries4', name: 'Overload Cheezy', category: 'Fries' }
];

const WIDTH = 320;
const HEIGHT = 320;

function createSvg(item) {
    const palette = palettes[item.category];
    if (!palette) throw new Error(`Missing palette for category ${item.category}`);

    const gradientId = `${item.id}-bg`;
    const titleLines = wrapText(item.name, 18);
    const iconMarkup = renderIcon(palette.icon, palette);

    return `<?xml version="1.0" encoding="UTF-8"?>\n` +
`<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="title desc">\n` +
`  <defs>\n` +
`    <linearGradient id="${gradientId}" x1="0" x2="1" y1="0" y2="1">\n` +
`      <stop offset="0%" stop-color="${palette.bg[0]}" />\n` +
`      <stop offset="100%" stop-color="${palette.bg[1]}" />\n` +
`    </linearGradient>\n` +
`    <filter id="softShadow" x="-15%" y="-15%" width="130%" height="130%">\n` +
`      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="rgba(0,0,0,0.18)" />\n` +
`    </filter>\n` +
`  </defs>\n` +
`  <title id="title">${escapeXml(item.name)}</title>\n` +
`  <desc id="desc">Stylized illustration representing ${escapeXml(item.name)} from the ${escapeXml(item.category)} category.</desc>\n` +
`  <rect width="100%" height="100%" rx="28" fill="url(#${gradientId})" />\n` +
`  <g transform="translate(0, -10)">\n` +
`    <g transform="translate(${WIDTH / 2}, ${HEIGHT / 2 - 10})" filter="url(#softShadow)">\n` +
`      ${iconMarkup}\n` +
`    </g>\n` +
`  </g>\n` +
`  <g transform="translate(${WIDTH / 2}, ${HEIGHT - 54})" font-family="'Segoe UI', sans-serif" fill="${palette.detail}" text-anchor="middle">\n` +
 titleLines.map((line, index) => `    <text font-size="22" font-weight="600" y="${index * 24}">${escapeXml(line)}</text>`).join('\n') + '\n' +
`  </g>\n` +
`</svg>\n`;
}

function wrapText(text, max) {
    const words = text.split(' ');
    const lines = [];
    let current = '';
    for (const word of words) {
        if ((current + ' ' + word).trim().length <= max) {
            current = (current + ' ' + word).trim();
        } else {
            if (current) lines.push(current);
            current = word;
        }
    }
    if (current) lines.push(current);
    return lines.length ? lines : [text];
}

function escapeXml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function renderIcon(type, palette) {
    switch (type) {
        case 'milktea':
            return renderCup({ palette, withBoba: true, strawColor: '#f47c7c' });
        case 'icedCoffee':
            return renderCup({ palette, withIce: true, strawColor: '#795548' });
        case 'fruitTea':
            return renderCup({ palette, withFruit: true, strawColor: '#ffb400' });
        case 'soda':
            return renderCup({ palette, withFizz: true, strawColor: '#3f8cff' });
        case 'frappe':
            return renderCup({ palette, withCream: true, strawColor: '#d36ef6' });
        case 'cheesecake':
            return renderCheesecake(palette);
        case 'snack':
            return renderSnack(palette);
        case 'fries':
            return renderFries(palette);
        default:
            return renderCup({ palette, withBoba: true });
    }
}

function renderCup({ palette, withBoba = false, withIce = false, withFruit = false, withFizz = false, withCream = false, strawColor = '#f47c7c' }) {
    const cupBase = `
      <g transform="translate(-90, -110)">
        <path d="M40 0 h160 l-18 170 a20 20 0 0 1 -20 18 h-84 a20 20 0 0 1 -20-18z" fill="${palette.accent}" stroke="${palette.detail}" stroke-width="6" stroke-linejoin="round" />
        <rect x="60" y="-36" width="120" height="36" rx="12" fill="${palette.foam}" stroke="${palette.detail}" stroke-width="6" />
        <path d="M92 -60 h56 l16 -78" fill="none" stroke="${strawColor}" stroke-width="10" stroke-linecap="round" />
      </g>`;

    let garnish = '';
    if (withBoba) {
        garnish += '<g transform="translate(-50, 40)" fill="rgba(60,40,30,0.75)">';
        const positions = [[-40,80],[-10,90],[20,82],[45,88],[-25,95],[10,105],[35,102]];
        garnish += positions.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="14" opacity="${0.5+0.1*i}"/>`).join('');
        garnish += '</g>';
    }
    if (withIce) {
        garnish += '<g transform="translate(-30,-10)" fill="#ffffff" stroke="rgba(0,0,0,0.06)" stroke-width="4">';
        const cubes = [[-30,-10],[10,-8],[50,-18],[0,24],[40,20]];
        garnish += cubes.map(([x,y])=>`<rect x="${x}" y="${y}" width="44" height="44" rx="8"/>`).join('');
        garnish += '</g>';
    }
    if (withFruit) {
        garnish += '<g transform="translate(-60,10)">';
        garnish += '<circle cx="20" cy="20" r="24" fill="#ffd966" stroke="rgba(0,0,0,0.08)" stroke-width="6" />';
        garnish += '<path d="M8 8 a16 16 0 0 1 22 22" fill="none" stroke="#ff7043" stroke-width="6" stroke-linecap="round" />';
        garnish += '<circle cx="82" cy="-10" r="14" fill="#ff6f91" opacity="0.85" />';
        garnish += '<circle cx="108" cy="18" r="18" fill="#7bd389" opacity="0.75" />';
        garnish += '</g>';
    }
    if (withFizz) {
        garnish += '<g transform="translate(20,-50)" fill="#ffffff" opacity="0.65">';
        const bubbles = [[-60,10,12],[-20,-5,10],[10,8,14],[30,-12,9],[50,10,11],[0,30,8]];
        garnish += bubbles.map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}"/>`).join('');
        garnish += '</g>';
    }
    if (withCream) {
        garnish += '<g transform="translate(-60,-60)">';
        garnish += '<path d="M0 0 q60 -50 120 0 t0 60 h-120z" fill="#fffaf5" stroke="rgba(0,0,0,0.04)" stroke-width="6" />';
        garnish += '<circle cx="40" cy="-6" r="14" fill="#ffe6f9" opacity="0.7" />';
        garnish += '<circle cx="80" cy="-12" r="10" fill="#f9d5ff" opacity="0.7" />';
        garnish += '</g>';
    }

    return `${cupBase}${garnish}`;
}

function renderCheesecake(palette) {
    return `
      <g transform="translate(-100,-80)">
        <path d="M20 60 L150 0 L200 120 L50 170 Z" fill="${palette.accent}" stroke="${palette.detail}" stroke-width="6" stroke-linejoin="round" />
        <path d="M50 170 L200 120 L200 180 L50 230 Z" fill="${palette.detail}" opacity="0.65" />
        <path d="M20 60 L50 170 L50 230 L20 120 Z" fill="${palette.foam}" opacity="0.9" />
        <circle cx="160" cy="40" r="18" fill="#ff9aa2" opacity="0.9" />
        <circle cx="180" cy="70" r="12" fill="#ffd880" opacity="0.8" />
      </g>`;
}

function renderSnack(palette) {
    return `
      <g transform="translate(-110,-70)">
        <rect x="20" y="80" width="220" height="70" rx="28" fill="${palette.accent}" stroke="${palette.detail}" stroke-width="6" />
        <rect x="40" y="40" width="180" height="60" rx="22" fill="${palette.foam}" stroke="rgba(0,0,0,0.08)" stroke-width="4" />
        <circle cx="90" cy="110" r="18" fill="#ffd15c" />
        <circle cx="160" cy="110" r="18" fill="#e86f51" />
        <circle cx="210" cy="110" r="18" fill="#61d095" />
      </g>`;
}

function renderFries(palette) {
    return `
      <g transform="translate(-120,-90)">
        <path d="M40 40 l30 160 a20 20 0 0 0 20 16 h120 a20 20 0 0 0 20 -16 l30 -160 z" fill="${palette.accent}" stroke="${palette.detail}" stroke-width="6" stroke-linejoin="round" />
        <path d="M60 40 h180 l-12 48 h-156z" fill="${palette.detail}" opacity="0.18" />
        ${Array.from({ length: 8 }).map((_, i) => {
            const x = 70 + i * 22;
            const height = 140 + (i % 3) * 16;
            return `<rect x="${x}" y="${40 - (i % 2) * 20}" width="16" height="${height}" rx="8" fill="#ffe08a" stroke="rgba(0,0,0,0.05)" stroke-width="4" />`;
        }).join('')}
      </g>`;
}

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

for (const item of items) {
    const svg = createSvg(item);
    const filePath = path.join(OUTPUT_DIR, `${item.id}.svg`);
    fs.writeFileSync(filePath, svg, 'utf8');
    console.log(`Generated ${item.id}`);
}
