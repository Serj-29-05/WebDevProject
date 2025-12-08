# Meraki Sipside — Local Development

This folder contains the source used for the Meraki Sipside site. A simple live-reload server is configured for development.

Run locally:

1. Install dependencies (only needed once):

```powershell
cd WebSite/meraki-sipside; npm install
```

2. Start the live server:

```powershell
cd WebSite/meraki-sipside; npm run start
```

This uses the `live-server` package and the `start` script defined in `package.json` which serves the `src` directory.

Notes:
- The server opens the `src` folder by default. If you want to serve a different directory (for example `_gh-pages`), edit the `start` script in `package.json`.
- If you prefer a global utility you can also install `live-server` globally using `npm i -g live-server`.

## Generating menu illustrations

If you need to rebuild the illustrated menu assets and do not have Node.js available, you can run the Python generator:

```powershell
cd WebSite/meraki-sipside; python tools/generate_menu_art.py
```

This script writes fresh SVG artwork for every menu item under `src/assets/menu/` and mirrors the originals used by the in-browser menu.
