import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const distDir = path.join(__dirname, 'dist');
const distAssets = path.join(distDir, 'assets');
const rootAssets = path.join(__dirname, 'assets');
const publicAssets = path.join(__dirname, 'public', 'assets');
const distModels = path.join(distDir, 'models');
const rootModels = path.join(__dirname, 'models');
const publicModels = path.join(__dirname, 'public', 'models');

// 1. Ensure dist/index.html and dist/404.html exist from dist/index.dev.html
const distDevHtml = path.join(distDir, 'index.dev.html');
const distHtml = path.join(distDir, 'index.html');
const dist404 = path.join(distDir, '404.html');

if (fs.existsSync(distDevHtml)) {
  fs.copyFileSync(distDevHtml, distHtml);
  fs.copyFileSync(distDevHtml, dist404);
  console.log('✓ Created dist/index.html and dist/404.html for GitHub Pages deployment!');
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

// 5. Ensure root models and dist models are synchronized
if (fs.existsSync(publicModels)) {
  fs.cpSync(publicModels, rootModels, { recursive: true, force: true });
  fs.cpSync(publicModels, distModels, { recursive: true, force: true });
  console.log('✓ Synced public/models into root and dist models folders!');
}

console.log('★ GitHub Pages dist build synchronized successfully!');
