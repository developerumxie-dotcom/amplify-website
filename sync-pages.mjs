import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const distDir = path.join(__dirname, 'dist');
const distAssets = path.join(distDir, 'assets');
const rootAssets = path.join(__dirname, 'assets');
const publicAssets = path.join(__dirname, 'public', 'assets');

// 1. Ensure dist/index.html exists from dist/index.dev.html
const distDevHtml = path.join(distDir, 'index.dev.html');
const distHtml = path.join(distDir, 'index.html');
const rootHtml = path.join(__dirname, 'index.html');

if (fs.existsSync(distDevHtml)) {
  fs.copyFileSync(distDevHtml, distHtml);
  fs.copyFileSync(distDevHtml, rootHtml);
  console.log('✓ Updated root index.html and dist/index.html with production bundle!');
} else if (fs.existsSync(distHtml)) {
  fs.copyFileSync(distHtml, rootHtml);
  console.log('✓ Updated root index.html with dist/index.html!');
}

// 2. Ensure root assets folder exists
if (!fs.existsSync(rootAssets)) {
  fs.mkdirSync(rootAssets, { recursive: true });
}

// 3. Copy dist/assets to root assets
if (fs.existsSync(distAssets)) {
  fs.cpSync(distAssets, rootAssets, { recursive: true, force: true });
  console.log('✓ Synced dist/assets into root assets folder!');
}

// 4. Ensure public/assets are also in root assets
if (fs.existsSync(publicAssets)) {
  fs.cpSync(publicAssets, rootAssets, { recursive: true, force: true });
  console.log('✓ Synced public/assets into root assets folder!');
}

console.log('★ GitHub Pages root and dist build synchronized successfully!');
