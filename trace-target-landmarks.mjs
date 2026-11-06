import fs from 'fs';
import jpeg from 'jpeg-js';

const buf = fs.readFileSync('public/target_ref.jpg');
const { width, height, data } = jpeg.decode(buf, { useTArray: true });

function getPixel(x, y) {
  x = Math.round(Math.max(0, Math.min(width - 1, x)));
  y = Math.round(Math.max(0, Math.min(height - 1, y)));
  const idx = (y * width + x) * 4;
  return [data[idx], data[idx + 1], data[idx + 2]];
}

// Find key landmarks in target reference image:
console.log('--- TARGET REFERENCE IMAGE (IMAGE 2) LANDMARKS ---');

// 1. Eye position: in cyan head x: 720..760, y: 270..300, find dark pixel surrounded by bright cyan
let eye = null, minEyeBright = 999;
for (let y = 270; y <= 300; y++) {
  for (let x = 720; x <= 760; x++) {
    const p = getPixel(x, y);
    // Cyan around it is bright (b > 180, g > 150)
    // Eye pixel is dark
    const b = (p[0] + p[1] + p[2]) / 3;
    if (b < minEyeBright) {
      minEyeBright = b;
      eye = { x, y, rgb: p };
    }
  }
}
console.log('Eye dot:', eye);

// 2. Beak tip: farthest right point of head
let beakTip = null, maxBeakX = 0;
for (let y = 300; y <= 360; y++) {
  for (let x = 750; x <= 830; x++) {
    const p = getPixel(x, y);
    if ((p[1] > 60 || p[2] > 80) && x > maxBeakX) {
      maxBeakX = x;
      beakTip = { x, y, rgb: p };
    }
  }
}
console.log('Beak tip:', beakTip);

// 3. Head crown: top apex of cyan head
let headCrown = null, minCrownY = 999;
for (let y = 240; y <= 280; y++) {
  for (let x = 710; x <= 750; x++) {
    const p = getPixel(x, y);
    if ((p[1] > 140 && p[2] > 180) && y < minCrownY) {
      minCrownY = y;
      headCrown = { x, y, rgb: p };
    }
  }
}
console.log('Head crown:', headCrown);

// 4. Upper wing tip
let wingTip = null, minWingScore = 999999;
for (let y = 100; y <= 150; y++) {
  for (let x = 230; x <= 270; x++) {
    const p = getPixel(x, y);
    if (p[1] > 60 || p[2] > 80) {
      const score = x + y;
      if (score < minWingScore) {
        minWingScore = score;
        wingTip = { x, y, rgb: p };
      }
    }
  }
}
console.log('Upper wing tip:', wingTip);

// 5. Dorsal apex: top crest of body
let dorsalApex = null, minDorsalY = 999;
for (let y = 180; y <= 220; y++) {
  for (let x = 500; x <= 540; x++) {
    const p = getPixel(x, y);
    if ((p[0] > 100 || p[1] > 100) && y < minDorsalY) {
      minDorsalY = y;
      dorsalApex = { x, y, rgb: p };
    }
  }
}
console.log('Dorsal apex:', dorsalApex);

// 6. Lower wing tip
let lowerWingTip = null, maxLowerScore = -999999;
for (let y = 500; y <= 570; y++) {
  for (let x = 220; x <= 270; x++) {
    const p = getPixel(x, y);
    if (p[0] > 80 || p[2] > 80) {
      const score = y - x;
      if (score > maxLowerScore) {
        maxLowerScore = score;
        lowerWingTip = { x, y, rgb: p };
      }
    }
  }
}
console.log('Lower wing tip:', lowerWingTip);
