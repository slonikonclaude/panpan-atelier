// Prototype of the zigzag «espiga» mark: parallel zigzags clipped to a square (as on their façade / wall sign).
import sharp from "sharp";
export function espigaPaths({ rows = 9, amp = 12, step = 11.6, stroke = 3.8, offset = -5 } = {}) {
  const lines = [];
  for (let k = 0; k < rows; k++) {
    const yPeak = offset + k * step; // y of peaks (x = 0, 33.3, 66.7, 100)
    const pts = [];
    for (let j = 0; j <= 6; j++) pts.push(`${(j * 100) / 6},${j % 2 ? yPeak + amp : yPeak}`);
    lines.push(pts.join(" "));
  }
  return { lines, stroke };
}
const { lines, stroke } = espigaPaths();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 94" width="600" height="564"><rect width="100" height="94" fill="#6b4a3c"/><defs><clipPath id="c"><rect width="100" height="94"/></clipPath></defs><g clip-path="url(#c)" fill="none" stroke="#e8e0c8" stroke-width="${stroke}" stroke-linejoin="miter" stroke-miterlimit="10">${lines.map((p) => `<polyline points="${p}"/>`).join("")}</g></svg>`;
await sharp(Buffer.from(svg)).png().toFile("_data/crops/espiga-proto.png");
console.log("ok");
