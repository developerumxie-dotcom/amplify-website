// Calculate ellipse points for various parameters
function getEllipsePoint(cx, cy, rx, ry, angleDeg, t) {
  // t from 0 to 2*PI
  const rad = angleDeg * Math.PI / 180;
  const cosA = Math.cos(rad);
  const sinA = Math.sin(rad);
  const xLocal = rx * Math.cos(t);
  const yLocal = ry * Math.sin(t);
  const x = cx + xLocal * cosA - yLocal * sinA;
  const y = cy + xLocal * sinA + yLocal * cosA;
  return { x, y };
}

// Target:
// Right apex near x = 145-155, y = 355-365
// Bottom pass near x = 20-40 at y = 470-520 (sec2)
// Top pass near x = 0 at y = 280-320 (hero)

const candidates = [
  { cx: -80, cy: 420, rx: 235, ry: 80, angle: -16 },
  { cx: -100, cy: 430, rx: 255, ry: 90, angle: -18 },
  { cx: -90, cy: 415, rx: 245, ry: 85, angle: -15 },
  { cx: -70, cy: 410, rx: 225, ry: 80, angle: -14 },
];

for (const c of candidates) {
  console.log(`\nCandidate: cx=${c.cx}, cy=${c.cy}, rx=${c.rx}, ry=${c.ry}, angle=${c.angle}`);
  // Find rightmost point (max x)
  let maxX = -999, maxY = 0;
  for (let deg = 0; deg < 360; deg += 1) {
    const pt = getEllipsePoint(c.cx, c.cy, c.rx, c.ry, c.angle, deg * Math.PI / 180);
    if (pt.x > maxX) { maxX = pt.x; maxY = pt.y; }
  }
  console.log(`  Rightmost apex: x=${maxX.toFixed(1)}, y=${maxY.toFixed(1)}`);
  
  // Find points at y = 454 (hero/sec2 boundary)
  for (let deg = 0; deg < 360; deg += 1) {
    const pt = getEllipsePoint(c.cx, c.cy, c.rx, c.ry, c.angle, deg * Math.PI / 180);
    if (Math.abs(pt.y - 454) < 3) {
      console.log(`  Crossing at y=454: x=${pt.x.toFixed(1)}, y=${pt.y.toFixed(1)}`);
    }
    if (Math.abs(pt.y - 500) < 3) {
      console.log(`  Crossing at y=500: x=${pt.x.toFixed(1)}, y=${pt.y.toFixed(1)}`);
    }
  }
}
