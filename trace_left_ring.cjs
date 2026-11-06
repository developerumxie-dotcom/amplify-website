const fs = require('fs');
const jpeg = require('jpeg-js');

const hero = jpeg.decode(fs.readFileSync('C:\\Users\\hp\\.gemini\\antigravity\\brain\\b2b5929b-f456-4159-a3aa-e84f4b6f184a\\.user_uploaded\\media_1793892708501_fb580299.jpg'), { useTArray: true });
const sec2 = jpeg.decode(fs.readFileSync('C:\\Users\\hp\\.gemini\\antigravity\\brain\\b2b5929b-f456-4159-a3aa-e84f4b6f184a\\.user_uploaded\\media_1793988150416_c8b181e5.jpg'), { useTArray: true });

function getPixel(img, x, y) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return [0,0,0,0];
  const idx = (y * img.width + x) * 4;
  return [img.data[idx], img.data[idx+1], img.data[idx+2], img.data[idx+3]];
}

console.log('Finding all points of the left ring across Hero:');
for (let y = 320; y < 454; y += 10) {
  let bestX = -1, maxScore = 0;
  for (let x = 0; x < 200; x++) {
    const [r, g, b] = getPixel(hero, x, y);
    // Left ring is reddish-crimson: high r, moderate g/b or saturated red
    const score = r - (g + b) * 0.4;
    if (score > maxScore && r > 80) {
      maxScore = score;
      bestX = x;
    }
  }
  if (bestX !== -1) {
    console.log(`Hero y=${y}: ring at x=${bestX}, color=[${getPixel(hero, bestX, y)}]`);
  }
}

console.log('\nFinding all points of the left ring across Sec2 (y=0 to 200 corresponds to y=454 to 654):');
for (let y = 0; y <= 200; y += 15) {
  let bestX = -1, maxScore = 0;
  for (let x = 0; x < 45; x++) {
    const [r, g, b] = getPixel(sec2, x, y);
    const score = r - (g + b) * 0.4;
    if (score > maxScore && r > 70) {
      maxScore = score;
      bestX = x;
    }
  }
  if (bestX !== -1) {
    console.log(`Sec2 y=${y} (global y=${454 + y}): ring at x=${bestX}, color=[${getPixel(sec2, bestX, y)}]`);
  }
}
