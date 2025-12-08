from __future__ import annotations

from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFilter
except ImportError as exc:  # pragma: no cover
    raise SystemExit(
        "Pillow is required to generate the background. Install it with 'pip install pillow'."
    ) from exc

ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = [
    ROOT / "src" / "assets" / "backgrounds" / "bestseller-bar.jpg",
    ROOT / "_gh-pages" / "assets" / "backgrounds" / "bestseller-bar.jpg",
]

WIDTH = 1600
HEIGHT = 1000


def build_background() -> Image.Image:
    base = Image.new("RGB", (WIDTH, HEIGHT), "#b59b80")
    draw = ImageDraw.Draw(base)

    for y in range(HEIGHT):
        ratio = y / HEIGHT
        r = int(182 - 82 * ratio)
        g = int(158 - 94 * ratio)
        b = int(132 - 92 * ratio)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b))

    counter_top = [(0, int(HEIGHT * 0.57)), (WIDTH, int(HEIGHT * 0.7))]
    draw.rectangle(counter_top, fill="#caa37d")

    machine_rect = (
        int(WIDTH * 0.05),
        int(HEIGHT * 0.52),
        int(WIDTH * 0.3),
        int(HEIGHT * 0.68),
    )
    draw.rectangle(machine_rect, fill="#4d4946")

    for idx, x in enumerate(range(int(WIDTH * 0.34), int(WIDTH * 0.66), int(WIDTH * 0.1))):
        draw.ellipse(
            (
                x,
                int(HEIGHT * 0.45),
                x + int(WIDTH * 0.05),
                int(HEIGHT * 0.52),
            ),
            fill="#1b1a19",
        )
        draw.rectangle(
            (
                x + int(WIDTH * 0.01),
                int(HEIGHT * 0.52),
                x + int(WIDTH * 0.04),
                int(HEIGHT * 0.68),
            ),
            fill="#f2f0eb",
        )

    shelf_y = int(HEIGHT * 0.27)
    draw.rectangle(
        (int(WIDTH * 0.24), shelf_y, int(WIDTH * 0.76), shelf_y + int(HEIGHT * 0.016)),
        fill="#c49f77",
    )

    for idx in range(6):
        sx = int(WIDTH * 0.26) + idx * int(WIDTH * 0.08)
        draw.rectangle(
            (
                sx,
                shelf_y - int(HEIGHT * 0.04),
                sx + int(WIDTH * 0.045),
                shelf_y,
            ),
            fill="#24211f" if idx % 2 == 0 else "#f0d1a7",
        )

    cup_y = int(HEIGHT * 0.32)
    for idx in range(4):
        cx = int(WIDTH * 0.32) + idx * int(WIDTH * 0.12)
        draw.ellipse(
            (
                cx,
                cup_y,
                cx + int(WIDTH * 0.06),
                cup_y + int(HEIGHT * 0.04),
            ),
            fill="#fdfbf7",
        )

    lights_y = int(HEIGHT * 0.12)
    for idx in range(3):
        lx = int(WIDTH * 0.25) + idx * int(WIDTH * 0.22)
        draw.ellipse(
            (
                lx,
                lights_y,
                lx + int(WIDTH * 0.08),
                lights_y + int(HEIGHT * 0.05),
            ),
            fill="#f9f6ef",
        )

    base = base.filter(ImageFilter.GaussianBlur(radius=6))
    overlay = Image.new("RGBA", base.size, (255, 255, 255, 30))
    base = Image.alpha_composite(base.convert("RGBA"), overlay).convert("RGB")
    return base


def main() -> None:
    img = build_background()
    for path in OUTPUTS:
        path.parent.mkdir(parents=True, exist_ok=True)
        img.save(path, quality=92)
        print(f"wrote {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
