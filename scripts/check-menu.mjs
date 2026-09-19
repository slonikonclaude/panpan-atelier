/**
 * Сверка цен сайта с источником (DESIGN.md §3): каждая цена в lib/menu.ts должна быть
 * в `_data/menu-text/menu-final.json` у той же позиции (или в её истории) с тем же значением,
 * а год-пометка `seen` — совпадать с годом, когда цену видели. Плюс обратная проверка:
 * цены из источника, увиденные в 10.2023 и позже со sure/probable, не должны пропасть с сайта молча.
 * Node 24 импортирует .ts напрямую: `npm run check:menu`.
 */
import fs from "node:fs";
import { breakfasts, menuSections } from "../lib/menu.ts";

const final = JSON.parse(fs.readFileSync("_data/menu-text/menu-final.json", "utf8"));
const src = new Map(final.sections.flatMap((s) => s.items.map((i) => [i.id, i])));

// Id на сайте ≠ id источника там, где позиции объединены или переименованы.
const ALIAS = {
  "desayuno-mediterraneo": "desayuno-mediterraneo",
  "desayuno-healthy": "desayuno-healthy",
  panut: "panut",
  pizza: "pizza-porcion",
  quiche: "quiche-york-queso",
  cookie: "cookie-chocolate",
  "cafe-con-leche": "cafe-con-leche",
  "zumo-naranja": "zumo-naranja",
};

const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s*\(.*\)$/, "").trim();
let errors = 0;
let checked = 0;
const fail = (msg) => {
  errors++;
  console.log("✗", msg);
};

function check(siteId, value, label, seenYear) {
  const it = src.get(ALIAS[siteId] ?? siteId);
  if (!it) return fail(`${siteId}: нет в menu-final.json`);
  const variants = it.variants.filter((v) => v.price === value);
  const hist = it.history.filter((h) => h.includes(value.toFixed(2).replace(".", ",")));
  if (!variants.length && !hist.length) return fail(`${siteId}${label ? " / " + label : ""}: ${value} € нет ни в вариантах, ни в истории`);
  if (label) {
    const v = it.variants.find((x) => norm(x.label_es).startsWith(norm(label)) || norm(label).startsWith(norm(x.label_es)));
    if (v && v.price !== value) fail(`${siteId} / ${label}: на сайте ${value}, в источнике ${v.price}`);
  }
  if (seenYear) {
    const years = [...variants.map((v) => v.seen.slice(0, 4)), ...hist.map((h) => h.slice(0, 4))];
    if (!years.includes(seenYear)) fail(`${siteId}: пометка (${seenYear}), а цена ${value} видена в ${[...new Set(years)].join("/")}`);
  }
  checked++;
}

for (const b of breakfasts) if (b.price !== null) check(b.id, b.price, null, b.seen.slice(0, 4));
for (const s of menuSections)
  for (const it of s.items)
    for (const p of it.prices) check(it.id, p.value, p.label?.es ?? null, p.seen ? p.seen.slice(0, 4) : null);

// Обратная проверка: свежие уверенные цены источника не потеряны.
const onSite = new Set([...breakfasts.map((b) => b.price), ...menuSections.flatMap((s) => s.items.flatMap((i) => i.prices.map((p) => p.value)))]);
for (const it of src.values())
  for (const v of it.variants)
    if (v.price && v.seen >= "2023-10" && ["sure", "probable"].includes(v.confidence) && !onSite.has(v.price))
      console.log(`· не на сайте: ${it.id} ${v.label_es} ${v.price} € (${v.seen}, ${v.confidence})`);

console.log(errors ? `\n${errors} расхождений` : `\nOK: ${checked} цен совпадают с источником`);
process.exit(errors ? 1 : 0);
