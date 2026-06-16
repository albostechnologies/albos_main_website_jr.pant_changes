/**
 * Copies static assets into the Next.js standalone output (replaces Unix `cp -r`).
 */
const { cpSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');

const root = process.cwd();
const standaloneDir = join(root, '.next', 'standalone');

if (!existsSync(standaloneDir)) {
  console.error(
    'Error: .next/standalone not found. Ensure next.config has output: "standalone" and next build succeeded.'
  );
  process.exit(1);
}

const staticSrc = join(root, '.next', 'static');
const staticDest = join(standaloneDir, '.next', 'static');

if (!existsSync(staticSrc)) {
  console.error('Error: .next/static not found. Run next build first.');
  process.exit(1);
}

mkdirSync(join(standaloneDir, '.next'), { recursive: true });
cpSync(staticSrc, staticDest, { recursive: true });
console.log('Copied .next/static → .next/standalone/.next/static');

const publicSrc = join(root, 'public');
const publicDest = join(standaloneDir, 'public');

if (!existsSync(publicSrc)) {
  console.warn('Warning: public/ folder not found, skipping.');
} else {
  cpSync(publicSrc, publicDest, { recursive: true });
  console.log('Copied public → .next/standalone/public');
}
