const fs = require('fs');
const jpeg = require('jpeg-js');

const hero = jpeg.decode(fs.readFileSync('C:\\Users\\hp\\.gemini\\antigravity\\brain\\b2b5929b-f456-4159-a3aa-e84f4b6f184a\\.user_uploaded\\media_1793892708501_fb580299.jpg'), { useTArray: true });
const sec2 = jpeg.decode(fs.readFileSync('C:\\Users\\hp\\.gemini\\antigravity\\brain\\b2b5929b-f456-4159-a3aa-e84f4b6f184a\\.user_uploaded\\media_1793988150416_c8b181e5.jpg'), { useTArray: true });

console.log('Hero dimensions:', hero.width, 'x', hero.height);
console.log('Sec2 dimensions:', sec2.width, 'x', sec2.height);

function getPixel(img, x, y) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return [0,0,0,0];
  const idx = (y * img.width + x) * 4;
  return [img.data[idx], img.data[idx+1], img.data[idx+2], img.data[idx+3]];
}

// 1. Inspect Left Side of Hero and Sec2
console.log('\n--- LEFT SIDE INSPECTION ---');
console.log('Hero left side y=300 to 454 (x=0 to 100):');
for (let y = 300; y <= 454; y += 30) {
  let peakX = -1, maxLum = 0;
  for (let x = 0; x < 150; x++) {
    const [r, g, b] = getPixel(hero, x, y);
    const lum = r + g + b;
    if (lum > maxLum && r > 40) { maxLum = lum; peakX = x; }
  }
  console.log(`Hero at y=${y}: peak at x=${peakX}, color=[${getPixel(hero, peakX, y)}]`);
}

console.log('\nSec2 left side y=0 to 200 (x=0 to 50):');
for (let y = 0; y <= 200; y += 30) {
  let peakX = -1, maxLum = 0;
  for (let x = 0; x < 50; x++) {
    const [r, g, b] = getPixel(sec2, x, y);
    const lum = r + g + b;
    if (lum > maxLum && r > 40) { maxLum = lum; peakX = x; }
  }
  console.log(`Sec2 at y=${y}: peak at x=${peakX}, color=[${getPixel(sec2, peakX, y)}]`);
}

// 2. Inspect Right Side of Hero and Sec2
console.log('\n--- RIGHT SIDE INSPECTION ---');
console.log('Hero right side y=300 to 454 (x=900 to 1024):');
for (let y = 300; y <= 454; y += 30) {
  let peakX = -1, maxLum = 0;
  for (let x = 900; x < 1024; x++) {
    const [r, g, b] = getPixel(hero, x, y);
    const lum = r + g + b;
    if (lum > maxLum && (r > 40 || g > 40)) { maxLum = lum; peakX = x; }
  }
  console.log(`Hero at y=${y}: peak at x=${peakX}, color=[${getPixel(hero, peakX, y)}]`);
}

console.log('\nSec2 right side y=0 to 200 (x=970 to 1024):');
for (let y = 0; y <= 200; y += 30) {
  let peakX = -1, maxLum = 0;
  for (let x = 970; x < 1024; x++) {
    const [r, g, b] = getPixel(sec2, x, y);
    const lum = r + g + b;
    if (lum > maxLum && (r > 40 || g > 40)) { maxLum = lum; peakX = x; }
  }
  console.log(`Sec2 at y=${y}: peak at x=${peakX}, color=[${getPixel(sec2, peakX, y)}]`);
}
