/**
 * Иконки сайта и превью для соцсетей (DESIGN.md §4). Запускается руками: `node scripts/make-icons.mjs`.
 *  - app/icon.png 64 и app/apple-icon.png 180: зигзаг-колос цвета пшеницы на какао фасада;
 *  - public/og.jpg 1200×630: слева знак «pan / pan» и лозунг на муке, справа кадр hero.
 * Цвета продублированы из app/globals.css: sharp не читает CSS-переменные.
 */
import sharp from "sharp";

const COCOA = "#2a1f19";
const WHEAT = "#d8b884";
const FLOUR = "#f7f2ea";
const CRUST = "#d9823a";

// Та же геометрия, что в components/Logo.tsx (Espiga).
const zig = (stroke) => {
  const rows = [];
  for (let k = 0; k < 9; k++) {
    const peak = -5 + k * 12.5;
    const pts = Array.from({ length: 7 }, (_, j) => `${((j * 100) / 6).toFixed(2)},${j % 2 ? peak + 12 : peak}`).join(" ");
    rows.push(`<polyline points="${pts}" fill="none" stroke="${stroke}" stroke-width="5" stroke-linejoin="miter"/>`);
  }
  return rows.join("");
};

const icon = (pad) => `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${pad ? 0 : 112}" fill="${COCOA}"/>
  <svg x="${pad ? 136 : 116}" y="${pad ? 136 : 116}" width="${pad ? 240 : 280}" height="${pad ? 240 : 280}" viewBox="0 0 100 100" overflow="hidden">${zig(WHEAT)}</svg>
</svg>`;

await sharp(Buffer.from(icon(false))).resize(64, 64).png().toFile("app/icon.png");
await sharp(Buffer.from(icon(true))).resize(180, 180).png().toFile("app/apple-icon.png");

// OG: знак из той же маски, что на сайте (белый PNG → перекраска в cocoa).
const mark = await sharp("_photos/logo-white.png").resize({ height: 250 }).toBuffer();
const markMeta = await sharp(mark).metadata();
const markCocoa = await sharp({ create: { width: markMeta.width, height: markMeta.height, channels: 4, background: COCOA } })
  .composite([{ input: mark, blend: "dest-in" }])
  .png()
  .toBuffer();
const photo = await sharp("_photos/hero.jpg").resize(560, 630, { fit: "cover", position: "centre" }).toBuffer();
const text = `
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="630">
  <text x="72" y="468" font-family="Georgia, 'Times New Roman', serif" font-size="46" fill="${COCOA}">Saborea la vida… sin prisa.</text>
  <text x="72" y="530" font-family="'Segoe UI', Arial, sans-serif" font-size="19" font-weight="700" letter-spacing="2" fill="#685648">OBRADOR Y CAFETERÍA · GRAN VÍA, VALENCIA</text>
  <svg x="${72 + markMeta.width + 28}" y="${110 + 250 - 86}" width="76" height="76" viewBox="0 0 100 100" overflow="hidden">${zig(CRUST)}</svg>
</svg>`;
await sharp({ create: { width: 1200, height: 630, channels: 3, background: FLOUR } })
  .composite([
    { input: markCocoa, left: 72, top: 110 },
    { input: Buffer.from(text), left: 0, top: 0 },
    { input: photo, left: 640, top: 0 },
  ])
  .jpeg({ quality: 86 })
  .toFile("public/og.jpg");
await sharp(Buffer.from(icon(false))).png().toFile("_data/icon-preview.png");
console.log("icons + og ok");
