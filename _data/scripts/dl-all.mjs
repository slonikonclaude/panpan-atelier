// node dl-all.mjs — download every photo of maps/all-photos.json at w1000 as photos/pNNN.jpg
import fs from "node:fs";
const list = JSON.parse(fs.readFileSync("maps/all-photos.json", "utf8"));
const q = [...list];
let ok = 0, fail = 0;
async function w() {
  while (q.length) {
    const it = q.shift();
    const f = `photos/p${String(it.n).padStart(3, "0")}.jpg`;
    if (fs.existsSync(f)) { ok++; continue; }
    try {
      const r = await fetch(it.url + "=w1000");
      if (!r.ok) throw new Error(r.status);
      fs.writeFileSync(f, Buffer.from(await r.arrayBuffer()));
      ok++;
    } catch (e) { fail++; console.log("fail", it.n, e.message); }
  }
}
await Promise.all(Array.from({ length: 8 }, w));
fs.writeFileSync("photos/index.json", JSON.stringify(list.map((x) => ({ file: `p${String(x.n).padStart(3, "0")}.jpg`, n: x.n })), null, 1));
console.log("ok", ok, "fail", fail);
