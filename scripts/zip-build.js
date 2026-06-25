/**
 * Packages the static export in `out/` into a single deploy-ready zip whose
 * files sit at the archive ROOT (index.html, .htaccess, _next/, ...), so it can
 * be uploaded to a static host (cPanel / Apache / nginx) and extracted directly
 * into the web root (e.g. public_html) with no nested folder.
 *
 *   npm run zip      → zip an existing out/ (run `npm run build` first)
 *   npm run package  → build + zip in one step
 *
 * Production tweaks:
 *   - Source maps (*.map) are excluded so they're never published.
 *   - Critical files (index.html, 404.html, .htaccess, _next/) are verified.
 *   - Reports file count, raw vs. zipped size and compression ratio.
 */
const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "out");
const zipPath = path.join(root, "albos-website-build.zip");

if (!fs.existsSync(outDir)) {
  console.error("✗ out/ not found. Run `npm run build` first (or use `npm run package`).");
  process.exit(1);
}

// Start from a clean archive each run.
if (fs.existsSync(zipPath)) fs.rmSync(zipPath);

// Tally what we add (and what we skip) for a meaningful summary.
let rawBytes = 0;
let skippedMaps = 0;

const zip = new AdmZip();
// Walk out/ ourselves so we can (a) keep entries relative to out/ — no nested
// folder, (b) include dotfiles like .htaccess, and (c) drop source maps.
(function addDir(absDir, relDir) {
  for (const entry of fs.readdirSync(absDir, { withFileTypes: true })) {
    const abs = path.join(absDir, entry.name);
    const rel = relDir ? `${relDir}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      addDir(abs, rel);
    } else {
      if (entry.name.endsWith(".map")) {
        skippedMaps++;
        continue;
      }
      rawBytes += fs.statSync(abs).size;
      // Use forward slashes for zip entry paths (portable across hosts).
      zip.addFile(rel, fs.readFileSync(abs));
    }
  }
})(outDir, "");

zip.writeZip(zipPath);

// Sanity-check that the entry point and Apache config landed at the root.
const names = zip.getEntries().map((e) => e.entryName);
const has = (n) => names.includes(n);
const hasIndex = has("index.html");
const hasNext = names.some((n) => n.startsWith("_next/"));

const zipBytes = fs.statSync(zipPath).size;
const mb = (b) => (b / (1024 * 1024)).toFixed(1);
const ratio = rawBytes ? Math.round((1 - zipBytes / rawBytes) * 100) : 0;

if (!hasIndex) {
  console.error("✗ index.html missing from archive root — build may be incomplete.");
  process.exit(1);
}

console.log(`✓ Created ${path.basename(zipPath)}`);
console.log(`  files:       ${names.length}  (${mb(rawBytes)} MB raw → ${mb(zipBytes)} MB zipped, -${ratio}%)`);
console.log(`  index.html:  yes`);
console.log(`  404.html:    ${has("404.html") ? "yes" : "NO"}`);
console.log(`  .htaccess:   ${has(".htaccess") ? "yes" : "NO — check public/.htaccess"}`);
console.log(`  _next/:      ${hasNext ? "yes" : "NO"}`);
if (skippedMaps) console.log(`  source maps: ${skippedMaps} excluded`);
console.log("\n  Upload to public_html and extract — files are at the zip root.");
