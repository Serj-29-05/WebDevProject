"""Generate stylized SVG illustrations for each menu item.

Reimplements the Node script in Python so it can run in environments without Node.js.
"""
from __future__ import annotations

import os
from pathlib import Path

OUTPUT_DIR = Path(__file__).resolve().parents[1] / "src" / "assets" / "menu"

PALETTES = {
    "Milktea": {
        "bg": ("#f8ede3", "#f4d7b7"),
        "accent": "#d9a066",
        "detail": "#6f4d31",
        "foam": "#fdf5e6",
        "icon": "milktea",
    },
    "Iced Coffee": {
        "bg": ("#f4e4d7", "#e3c8af"),
        "accent": "#c2825c",
        "detail": "#4a2f23",
        "foam": "#f2efe8",
        "icon": "icedCoffee",
    },
    "Cheesecake": {
        "bg": ("#f9efe9", "#fde5d0"),
        "accent": "#f7b267",
        "detail": "#b5673a",
        "foam": "#fff4e3",
        "icon": "cheesecake",
    },
    "Fruit Tea": {
        "bg": ("#f4f9f2", "#d9f0d0"),
        "accent": "#95c867",
        "detail": "#52823f",
        "foam": "#fffdd9",
        "icon": "fruitTea",
    },
    "Soda": {
        "bg": ("#e8f1fc", "#c6dcff"),
        "accent": "#69a1ff",
        "detail": "#2353a0",
        "foam": "#ffffff",
        "icon": "soda",
    },
    "Frappe": {
        "bg": ("#f5eff9", "#dbcff0"),
        "accent": "#b48ad8",
        "detail": "#60467d",
        "foam": "#f9f6ff",
        "icon": "frappe",
    },
    "Snacks": {
        "bg": ("#f9efe3", "#f5d8a7"),
        "accent": "#e58f56",
        "detail": "#8a4e31",
        "foam": "#fff4d2",
        "icon": "snack",
    },
    "Fries": {
        "bg": ("#fff3d6", "#ffd59c"),
        "accent": "#f7a531",
        "detail": "#c8650f",
        "foam": "#ffe6b1",
        "icon": "fries",
    },
}

ITEMS = [
    {"id": "m1", "name": "Bubble Tea", "category": "Milktea"},
    {"id": "m2", "name": "Cookies & Cream", "category": "Milktea"},
    {"id": "m3", "name": "Choco Hokkaido", "category": "Milktea"},
    {"id": "m4", "name": "Matcha", "category": "Milktea"},
    {"id": "m5", "name": "Winter Melon", "category": "Milktea"},
    {"id": "m6", "name": "Okinawa", "category": "Milktea"},
    {"id": "m7", "name": "Red Velvet", "category": "Milktea"},
    {"id": "m8", "name": "Chocolate", "category": "Milktea"},
    {"id": "ic1", "name": "Spanish Latte", "category": "Iced Coffee"},
    {"id": "ic2", "name": "French Vanilla", "category": "Iced Coffee"},
    {"id": "ic3", "name": "Salted Caramel", "category": "Iced Coffee"},
    {"id": "ic4", "name": "Dark Mocha", "category": "Iced Coffee"},
    {"id": "ic5", "name": "Matcha", "category": "Iced Coffee"},
    {"id": "ic6", "name": "Hazelnut", "category": "Iced Coffee"},
    {"id": "ch1", "name": "Oreo Matcha", "category": "Cheesecake"},
    {"id": "ch2", "name": "Red Velvet", "category": "Cheesecake"},
    {"id": "ch3", "name": "Oreolicious", "category": "Cheesecake"},
    {"id": "ch4", "name": "Creamy Cheesecake", "category": "Cheesecake"},
    {"id": "ch5", "name": "Choco Delight", "category": "Cheesecake"},
    {"id": "ft1", "name": "Lychee", "category": "Fruit Tea"},
    {"id": "ft2", "name": "Orange", "category": "Fruit Tea"},
    {"id": "ft3", "name": "Blueberry", "category": "Fruit Tea"},
    {"id": "ft4", "name": "Apple Green", "category": "Fruit Tea"},
    {"id": "ft5", "name": "Four Season", "category": "Fruit Tea"},
    {"id": "ft6", "name": "Strawberry", "category": "Fruit Tea"},
    {"id": "ft7", "name": "Passion Fruit", "category": "Fruit Tea"},
    {"id": "s1", "name": "Green Sparkle", "category": "Soda"},
    {"id": "s2", "name": "Blueberry Cloud", "category": "Soda"},
    {"id": "s3", "name": "Lychee Soda", "category": "Soda"},
    {"id": "s4", "name": "Strawberry Burst", "category": "Soda"},
    {"id": "s5", "name": "Blue Lagoon", "category": "Soda"},
    {"id": "s6", "name": "Sparkling Apple", "category": "Soda"},
    {"id": "frp1", "name": "Oreo Java Chip", "category": "Frappe"},
    {"id": "frp2", "name": "Mango", "category": "Frappe"},
    {"id": "frp3", "name": "Creamy Avocado", "category": "Frappe"},
    {"id": "frp4", "name": "Ube", "category": "Frappe"},
    {"id": "frp5", "name": "Strawberry", "category": "Frappe"},
    {"id": "frp6", "name": "Bubble Gum", "category": "Frappe"},
    {"id": "sn1", "name": "Regular Corndog", "category": "Snacks"},
    {"id": "sn2", "name": "Cheezy Corndog", "category": "Snacks"},
    {"id": "sn3", "name": "Classic Burger", "category": "Snacks"},
    {"id": "sn4", "name": "Cheese Burger", "category": "Snacks"},
    {"id": "sn5", "name": "Egg Burger", "category": "Snacks"},
    {"id": "sn6", "name": "Egg Burger With Cheese", "category": "Snacks"},
    {"id": "sn7", "name": "Egg Sandwich", "category": "Snacks"},
    {"id": "sn8", "name": "Ham & Egg Sandwich", "category": "Snacks"},
    {"id": "sn9", "name": "Classic Hotdog", "category": "Snacks"},
    {"id": "sn10", "name": "Cheezy Hotdog", "category": "Snacks"},
    {"id": "sn11", "name": "Overload Hotdog", "category": "Snacks"},
    {"id": "fries1", "name": "Cheese Fries", "category": "Fries"},
    {"id": "fries2", "name": "Sour Cream Fries", "category": "Fries"},
    {"id": "fries3", "name": "BBQ Fries", "category": "Fries"},
    {"id": "fries4", "name": "Overload Cheezy", "category": "Fries"},
]

WIDTH = 320
HEIGHT = 320


def wrap_text(text: str, max_length: int) -> list[str]:
    words = text.split()
    lines = []
    current = ""
    for word in words:
        candidate = (current + " " + word).strip()
        if candidate and len(candidate) <= max_length:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines or [text]


def escape_xml(value: str) -> str:
    return (
        value.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
        .replace("'", "&apos;")
    )


def indent_block(text: str, indent: int) -> str:
    prefix = " " * indent
    return "\n".join(prefix + line if line else line for line in text.splitlines())


def render_cup(*, palette: dict[str, str], with_boba: bool = False, with_ice: bool = False,
               with_fruit: bool = False, with_fizz: bool = False, with_cream: bool = False,
               straw_color: str = "#f47c7c") -> str:
    cup = (
        f'<g transform="translate(-90, -110)">\n'
        f'  <path d="M40 0 h160 l-18 170 a20 20 0 0 1 -20 18 h-84 a20 20 0 0 1 -20-18z" '
        f'fill="{palette["accent"]}" stroke="{palette["detail"]}" stroke-width="6" stroke-linejoin="round" />\n'
        f'  <rect x="60" y="-36" width="120" height="36" rx="12" fill="{palette["foam"]}" '
        f'stroke="{palette["detail"]}" stroke-width="6" />\n'
        f'  <path d="M92 -60 h56 l16 -78" fill="none" stroke="{straw_color}" stroke-width="10" stroke-linecap="round" />\n'
        f'</g>'
    )

    garnish_parts: list[str] = []

    if with_boba:
        positions = [
            (-40, 80),
            (-10, 90),
            (20, 82),
            (45, 88),
            (-25, 95),
            (10, 105),
            (35, 102),
        ]
        circles = "".join(
            f'<circle cx="{x}" cy="{y}" r="14" opacity="{0.5 + 0.1 * idx:.2f}" />'
            for idx, (x, y) in enumerate(positions)
        )
        garnish_parts.append(
            f'<g transform="translate(-50, 40)" fill="rgba(60,40,30,0.75)">{circles}</g>'
        )

    if with_ice:
        cubes = [
            (-30, -10),
            (10, -8),
            (50, -18),
            (0, 24),
            (40, 20),
        ]
        rects = "".join(
            f'<rect x="{x}" y="{y}" width="44" height="44" rx="8" />' for x, y in cubes
        )
        garnish_parts.append(
            f'<g transform="translate(-30,-10)" fill="#ffffff" stroke="rgba(0,0,0,0.06)" stroke-width="4">{rects}</g>'
        )

    if with_fruit:
        fruit = (
            '<g transform="translate(-60,10)">'
            '<circle cx="20" cy="20" r="24" fill="#ffd966" stroke="rgba(0,0,0,0.08)" stroke-width="6" />'
            '<path d="M8 8 a16 16 0 0 1 22 22" fill="none" stroke="#ff7043" stroke-width="6" stroke-linecap="round" />'
            '<circle cx="82" cy="-10" r="14" fill="#ff6f91" opacity="0.85" />'
            '<circle cx="108" cy="18" r="18" fill="#7bd389" opacity="0.75" />'
            '</g>'
        )
        garnish_parts.append(fruit)

    if with_fizz:
        bubbles = [
            (-60, 10, 12),
            (-20, -5, 10),
            (10, 8, 14),
            (30, -12, 9),
            (50, 10, 11),
            (0, 30, 8),
        ]
        bubble_markup = "".join(
            f'<circle cx="{x}" cy="{y}" r="{r}" />' for x, y, r in bubbles
        )
        garnish_parts.append(
            f'<g transform="translate(20,-50)" fill="#ffffff" opacity="0.65">{bubble_markup}</g>'
        )

    if with_cream:
        cream = (
            '<g transform="translate(-60,-60)">'
            '<path d="M0 0 q60 -50 120 0 t0 60 h-120z" fill="#fffaf5" stroke="rgba(0,0,0,0.04)" stroke-width="6" />'
            '<circle cx="40" cy="-6" r="14" fill="#ffe6f9" opacity="0.7" />'
            '<circle cx="80" cy="-12" r="10" fill="#f9d5ff" opacity="0.7" />'
            '</g>'
        )
        garnish_parts.append(cream)

    return cup + ("".join(garnish_parts) if garnish_parts else "")


def render_cheesecake(palette: dict[str, str]) -> str:
    return (
        '<g transform="translate(-100,-80)">'
        f'<path d="M20 60 L150 0 L200 120 L50 170 Z" fill="{palette["accent"]}" stroke="{palette["detail"]}" stroke-width="6" stroke-linejoin="round" />'
        '<path d="M50 170 L200 120 L200 180 L50 230 Z" fill="{detail}" opacity="0.65" />'
        '<path d="M20 60 L50 170 L50 230 L20 120 Z" fill="{foam}" opacity="0.9" />'
        '<circle cx="160" cy="40" r="18" fill="#ff9aa2" opacity="0.9" />'
        '<circle cx="180" cy="70" r="12" fill="#ffd880" opacity="0.8" />'
        '</g>'
    ).format(detail=palette["detail"], foam=palette["foam"])


def render_snack(palette: dict[str, str]) -> str:
    return (
        '<g transform="translate(-110,-70)">'
        f'<rect x="20" y="80" width="220" height="70" rx="28" fill="{palette["accent"]}" stroke="{palette["detail"]}" stroke-width="6" />'
        '<rect x="40" y="40" width="180" height="60" rx="22" fill="{foam}" stroke="rgba(0,0,0,0.08)" stroke-width="4" />'
        '<circle cx="90" cy="110" r="18" fill="#ffd15c" />'
        '<circle cx="160" cy="110" r="18" fill="#e86f51" />'
        '<circle cx="210" cy="110" r="18" fill="#61d095" />'
        '</g>'
    ).format(foam=palette["foam"])


def render_fries(palette: dict[str, str]) -> str:
    fries = [
        f'<path d="M40 40 l30 160 a20 20 0 0 0 20 16 h120 a20 20 0 0 0 20 -16 l30 -160 z" fill="{palette["accent"]}" stroke="{palette["detail"]}" stroke-width="6" stroke-linejoin="round" />',
        '<path d="M60 40 h180 l-12 48 h-156z" fill="{detail}" opacity="0.18" />'.format(detail=palette["detail"]),
    ]

    fry_batons = []
    for index in range(8):
        x_pos = 70 + index * 22
        height = 140 + (index % 3) * 16
        y_offset = 40 - (index % 2) * 20
        fry_batons.append(
            f'<rect x="{x_pos}" y="{y_offset}" width="16" height="{height}" rx="8" fill="#ffe08a" stroke="rgba(0,0,0,0.05)" stroke-width="4" />'
        )

    fries.extend(fry_batons)

    return '<g transform="translate(-120,-90)">' + "".join(fries) + '</g>'


def render_icon(icon: str, palette: dict[str, str]) -> str:
    if icon == "milktea":
        return render_cup(palette=palette, with_boba=True, straw_color="#f47c7c")
    if icon == "icedCoffee":
        return render_cup(palette=palette, with_ice=True, straw_color="#795548")
    if icon == "fruitTea":
        return render_cup(palette=palette, with_fruit=True, straw_color="#ffb400")
    if icon == "soda":
        return render_cup(palette=palette, with_fizz=True, straw_color="#3f8cff")
    if icon == "frappe":
        return render_cup(palette=palette, with_cream=True, straw_color="#d36ef6")
    if icon == "cheesecake":
        return render_cheesecake(palette)
    if icon == "snack":
        return render_snack(palette)
    if icon == "fries":
        return render_fries(palette)
    return render_cup(palette=palette, with_boba=True)


def build_svg(item: dict[str, str]) -> str:
    palette = PALETTES.get(item["category"])
    if palette is None:
        raise ValueError(f"Missing palette for category {item['category']}")

    gradient_id = f"{item['id']}-bg"
    title_lines = wrap_text(item["name"], 18)
    icon_markup = indent_block(render_icon(palette["icon"], palette), 6)

    lines_markup = "\n".join(
        f"    <text font-size=\"22\" font-weight=\"600\" y=\"{index * 24}\">{escape_xml(line)}</text>"
        for index, line in enumerate(title_lines)
    )

    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{WIDTH}" height="{HEIGHT}" viewBox="0 0 {WIDTH} {HEIGHT}" role="img" aria-labelledby="title desc">\n'
        '  <defs>\n'
        f'    <linearGradient id="{gradient_id}" x1="0" x2="1" y1="0" y2="1">\n'
        f'      <stop offset="0%" stop-color="{palette["bg"][0]}" />\n'
        f'      <stop offset="100%" stop-color="{palette["bg"][1]}" />\n'
        '    </linearGradient>\n'
        '    <filter id="softShadow" x="-15%" y="-15%" width="130%" height="130%">\n'
        '      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="rgba(0,0,0,0.18)" />\n'
        '    </filter>\n'
        '  </defs>\n'
        f'  <title id="title">{escape_xml(item["name"])}</title>\n'
        f'  <desc id="desc">Stylized illustration representing {escape_xml(item["name"]) } from the {escape_xml(item["category"])} category.</desc>\n'
        f'  <rect width="100%" height="100%" rx="28" fill="url(#{gradient_id})" />\n'
        '  <g transform="translate(0, -10)">\n'
        f'    <g transform="translate({WIDTH / 2}, {HEIGHT / 2 - 10})" filter="url(#softShadow)">\n'
        f'{icon_markup}\n'
        '    </g>\n'
        '  </g>\n'
        f'  <g transform="translate({WIDTH / 2}, {HEIGHT - 54})" font-family="\'Segoe UI\', sans-serif" fill="{palette["detail"]}" text-anchor="middle">\n'
        f'{lines_markup}\n'
        '  </g>\n'
        '</svg>\n'
    )


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for item in ITEMS:
        svg = build_svg(item)
        file_path = OUTPUT_DIR / f"{item['id']}.svg"
        file_path.write_text(svg, encoding="utf-8")
        print(f"Generated {item['id']}")


if __name__ == "__main__":
    main()
