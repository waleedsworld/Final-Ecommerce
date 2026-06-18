# Demo assets

Captured from the app running locally (`npm run build && npm run start`) against
the live Sanity dataset, so every product image, name, and price is real content
served through the storefront — not a mockup.

| File | What it shows |
| ---- | ------------- |
| `demo.gif` | A short looping tour: home hero → product catalogue → product detail page. |
| `storefront-demo.png` | A crisp still of the home hero for embeds and social previews. |

### Reproducing these

```bash
npm install --legacy-peer-deps
npm run build
npm run start            # serves on http://localhost:3000
```

The stills were taken with a headless Chromium at a 1440-wide viewport; the GIF
stitches the home, `/products`, product detail, and `/female` frames together.
