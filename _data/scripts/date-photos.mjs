// node date-photos.mjs — open the Maps gallery «Todas», click every tile and read «Fecha de la imagen» from the viewer.
// Saves progressively to ../maps/photo-dates.json: [{ i, url, date, author }]
import fs from "node:fs";
import { launch, attach, sleep } from "./cdp.mjs";
const URL_PLACE = "https://www.google.com/maps/place/PanPan+Atelier/@39.4674636,-0.3685427,17z/data=!3m1!4b1!4m6!3m5!1s0xd6048b680fb2875:0x5a50d7ac5ee24336!8m2!3d39.4674636!4d-0.3685427!16s%2Fg%2F1tj5s1rt?hl=es";
const PORT = 9855;
const OUT = "../maps/photo-dates.json";
const done = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : [];
const have = new Set(done.map((d) => d.i));

await launch({ port: PORT, profile: "chrome-profile5" });
const c = await attach(PORT);
await c.send("Page.enable");
await c.send("Page.bringToFront");
await c.send("Emulation.setFocusEmulationEnabled", { enabled: true });

async function openGallery() {
  await c.navigate(URL_PLACE, 7000);
  if ((await c.evaluate("location.href")).includes("consent.google")) {
    await c.evaluate(`[...document.querySelectorAll('button')].find(b=>/Rechazar todo/.test(b.innerText))?.click()`);
    await sleep(4000);
    await c.navigate(URL_PLACE, 7000);
  }
  const title = await c.evaluate("document.title");
  if (!/PanPan/i.test(title)) throw new Error("wrong place: " + title);
  await c.evaluate(`[...document.querySelectorAll('button')].find(b=>/^\\d+\\+? fotos$|^Ver fotos$/.test((b.getAttribute('aria-label')||b.innerText).trim()))?.click()`);
  await sleep(5000);
  const ok = await c.evaluate(`(() => { const b=[...document.querySelectorAll('button:not([role=tab])')].find(b=>{const a=b.getAttribute('aria-label')||''; return a.split('·')[0]==='Todas' && !/Foto \\d/.test(a)}); if(!b) return false; b.click(); return true })()`);
  if (!ok) throw new Error("no Todas button");
  await sleep(4500);
}

await openGallery();
let misses = 0;
for (let i = 0; i < 400 && misses < 6; i++) {
  if (have.has(i)) continue;
  // scroll the grid until tile i exists, then click it
  let found = false;
  for (let k = 0; k < 40; k++) {
    found = await c.evaluate(`(() => { const a=document.querySelector('a[data-photo-index="${i}"]'); if(a){ a.scrollIntoView({block:'center'}); return true } const sc=[...document.querySelectorAll('div')].filter(d=>d.scrollHeight>d.clientHeight+50 && /auto|scroll/.test(getComputedStyle(d).overflowY) && d.querySelector('a[data-photo-index]')).pop(); if(sc) sc.scrollTop += Math.round(sc.clientHeight*0.6); return false })()`);
    if (found) break;
    await sleep(600);
  }
  if (!found) { misses++; console.log("tile not found", i); continue; }
  misses = 0;
  const url = await c.evaluate(`(() => { const a=document.querySelector('a[data-photo-index="${i}"]'); const e=a.querySelector('[style*="background-image"]'); const s=e?e.style.backgroundImage:''; a.click(); const j=s.indexOf('url('); return j<0?null:s.slice(j+4).replace(/["')]/g,'').split('=')[0] })()`);
  await sleep(2600);
  const info = await c.evaluate(`(() => { const t=document.body.innerText; const m=t.match(/Fecha de la imagen:\\s*([^\\n]+)/); const f=t.match(/\\n([^\\n]{1,60})\\n+Foto - ([^\\n]+)/); return { date: m?m[1].trim():(f?f[2].trim():null), author: f?f[1].trim():null } })()`);
  done.push({ i, url, ...info });
  have.add(i);
  fs.writeFileSync(OUT, JSON.stringify(done, null, 1));
  if (i % 10 === 0) console.log(i, info.date, info.author);
}
console.log("dated", done.filter((d) => d.date).length, "of", done.length);
c.close();
process.exit(0);
