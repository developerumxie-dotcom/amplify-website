const fs = require('fs');
const zlib = require('zlib');
const jpeg = require('jpeg-js');

function readPNG(filePath) {
  const buf = fs.readFileSync(filePath);
  let offset = 8, width, height, bitDepth, colorType;
  const idatChunks = [];

  while (offset < buf.length) {
    const length = buf.readUInt32BE(offset);
    const type = buf.toString('ascii', offset + 4, offset + 8);
    if (type === 'IHDR') {
      width = buf.readUInt32BE(offset + 8);
      height = buf.readUInt32BE(offset + 12);
      bitDepth = buf[offset + 16];
      colorType = buf[offset + 17];
    } else if (type === 'IDAT') {
      idatChunks.push(buf.subarray(offset + 8, offset + 8 + length));
    } else if (type === 'IEND') break;
    offset += 12 + length;
  }

  const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
  const bytesPerPixel = colorType === 6 ? 4 : (colorType === 2 ? 3 : 1);
  const stride = width * bytesPerPixel;
  const pixels = Buffer.alloc(width * height * 4);

  let srcOffset = 0;
  let prevRow = Buffer.alloc(stride);

  for (let y = 0; y < height; y++) {
    const filterType = decompressed[srcOffset++];
    const currentRow = Buffer.alloc(stride);

    for (let i = 0; i < stride; i++) {
      const raw = decompressed[srcOffset++];
      const a = i >= bytesPerPixel ? currentRow[i - bytesPerPixel] : 0;
      const b = prevRow[i];
      const c = i >= bytesPerPixel ? prevRow[i - bytesPerPixel] : 0;

      let val = 0;
      if (filterType === 0) val = raw;
      else if (filterType === 1) val = (raw + a) & 0xff;
      else if (filterType === 2) val = (raw + b) & 0xff;
      else if (filterType === 3) val = (raw + Math.floor((a + b) / 2)) & 0xff;
      else if (filterType === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        const pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
        val = (raw + pr) & 0xff;
      }
      currentRow[i] = val;
    }

    for (let x = 0; x < width; x++) {
      const dstIdx = (y * width + x) * 4;
      const srcIdx = x * bytesPerPixel;
      if (bytesPerPixel === 4) {
        pixels[dstIdx] = currentRow[srcIdx];
        pixels[dstIdx+1] = currentRow[srcIdx+1];
        pixels[dstIdx+2] = currentRow[srcIdx+2];
        pixels[dstIdx+3] = currentRow[srcIdx+3];
      } else if (bytesPerPixel === 3) {
        pixels[dstIdx] = currentRow[srcIdx];
        pixels[dstIdx+1] = currentRow[srcIdx+1];
        pixels[dstIdx+2] = currentRow[srcIdx+2];
        pixels[dstIdx+3] = 255;
      }
    }
    prevRow = currentRow;
  }
  return { width, height, data: pixels };
}

const png = readPNG('C:\\Users\\hp\\.gemini\\antigravity\\brain\\b2b5929b-f456-4159-a3aa-e84f4b6f184a\\website_full_sec2.png');
console.log('PNG size:', png.width, 'x', png.height);

// Crop second section Y: 460 to 1100
const cropY = 460;
const cropH = Math.min(640, png.height - cropY);
const cropW = png.width;
const croppedBuf = Buffer.alloc(cropW * cropH * 4);

for (let y = 0; y < cropH; y++) {
  for (let x = 0; x < cropW; x++) {
    const srcIdx = ((cropY + y) * png.width + x) * 4;
    const dstIdx = (y * cropW + x) * 4;
    croppedBuf[dstIdx] = png.data[srcIdx];
    croppedBuf[dstIdx+1] = png.data[srcIdx+1];
    croppedBuf[dstIdx+2] = png.data[srcIdx+2];
    croppedBuf[dstIdx+3] = png.data[srcIdx+3];
  }
}

const encoded = jpeg.encode({ data: croppedBuf, width: cropW, height: cropH }, 95);
fs.writeFileSync('C:\\Users\\hp\\.gemini\\antigravity\\brain\\b2b5929b-f456-4159-a3aa-e84f4b6f184a\\website_verticals_section_rendered.jpg', encoded.data);
console.log('Cropped second section saved successfully.');
