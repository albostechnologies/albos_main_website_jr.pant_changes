/**
 * Asset pipeline (one-off): turn the brand logo JPEG (solid white background)
 * into a trimmed, transparent-background PNG used in both the header and footer:
 *
 *   public/images/albos-logo-full.png   full colour lockup
 *
 * `jimp` is not a project dependency. Install it ad-hoc to run this, e.g.:
 *   npm i -D jimp@0.22 && node scripts/convert-logo.cjs <src.jpeg>
 *
 * The background is flood-filled inward from the image borders ("magic wand
 * from the corner"), so only the connected white background is removed. This
 * avoids the rectangular halo left by JPEG compression noise and preserves
 * interior highlights (the glossy bubble inside the "A").
 */
const path = require('path');
const Jimp = require('jimp');

const SRC = process.argv[2] || 'C:/Users/hp/Downloads/albosLogo.jpeg';
const OUT = path.resolve(__dirname, '..', 'public', 'images', 'albos-logo-full.png');

const minOf = (d, i) => Math.min(d[i], d[i + 1], d[i + 2]);

const BG_THRESH = 236; // min(R,G,B) >= this counts as removable background
const EDGE_LIGHT = 200; // boundary pixels lighter than this get feathered

Jimp.read(SRC).then((image) => {
  const { width: w, height: h, data } = image.bitmap;

  const cleared = new Uint8Array(w * h);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const p = y * w + x;
    if (cleared[p] || minOf(data, p * 4) < BG_THRESH) return;
    cleared[p] = 1;
    stack.push(p);
  };
  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
  while (stack.length) {
    const p = stack.pop();
    const x = p % w, y = (p / w) | 0;
    push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x;
      const idx = p * 4;
      if (cleared[p]) { data[idx + 3] = 0; continue; }
      const m = minOf(data, idx);
      if (m < EDGE_LIGHT) continue;
      let touchesBg = false;
      for (let dy = -1; dy <= 1 && !touchesBg; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < w && ny < h && cleared[ny * w + nx]) { touchesBg = true; break; }
        }
      }
      if (touchesBg) data[idx + 3] = Math.round((1 - (m - EDGE_LIGHT) / (255 - EDGE_LIGHT)) * 255);
    }
  }

  image.autocrop({ tolerance: 0.0008, cropOnlyFrames: false });
  return image.writeAsync(OUT).then(() =>
    console.log('Wrote', OUT, image.bitmap.width + 'x' + image.bitmap.height));
}).catch((err) => { console.error('FAILED:', err.message); process.exit(1); });
