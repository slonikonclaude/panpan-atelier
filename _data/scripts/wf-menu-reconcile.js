export const meta = {
  name: 'panpan-menu-reconcile',
  description: 'Build one dated PanPan Atelier menu from 72 board/label/receipt readings: two independent consolidations, an arbiter that checks disagreements on the original photos, then EN translation with an independent review',
  phases: [
    { title: 'Consolidate', detail: 'two independent consolidations of all readings' },
    { title: 'Arbitrate', detail: 'compare both, resolve every disagreement against the original photos' },
    { title: 'Translate', detail: 'EN names/descriptions + independent translation review' },
  ],
}

const ROOT = 'C:/Users/dopelganger/Documents/Ресттораны/panpan-atelier/_data'

const ITEM = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name_es: { type: 'string' },
    desc_es: { type: 'string' },
    variants: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          label_es: { type: 'string' },
          price: { type: ['number', 'null'] },
          seen: { type: 'string' },
          source: { type: 'string' },
          confidence: { type: 'string', enum: ['sure', 'probable', 'guess', 'none'] },
        },
        required: ['label_es', 'price', 'seen', 'source', 'confidence'],
      },
    },
    history: { type: 'array', items: { type: 'string' } },
    first_seen: { type: 'string' },
    last_seen: { type: 'string' },
    still_current: { type: 'string', enum: ['yes', 'probably', 'unknown', 'probably-not'] },
    notes: { type: 'string' },
  },
  required: ['id', 'name_es', 'desc_es', 'variants', 'history', 'first_seen', 'last_seen', 'still_current', 'notes'],
}

const MENU = {
  type: 'object',
  properties: {
    sources: {
      type: 'array',
      items: {
        type: 'object',
        properties: { file: { type: 'string' }, date: { type: 'string' }, date_basis: { type: 'string' }, kind: { type: 'string' }, board_generation: { type: 'string' } },
        required: ['file', 'date', 'date_basis', 'kind', 'board_generation'],
      },
    },
    board_generations: { type: 'string' },
    sections: {
      type: 'array',
      items: {
        type: 'object',
        properties: { id: { type: 'string' }, title_es: { type: 'string' }, note_es: { type: 'string' }, items: { type: 'array', items: ITEM } },
        required: ['id', 'title_es', 'note_es', 'items'],
      },
    },
    conflicts: { type: 'array', items: { type: 'string' } },
  },
  required: ['sources', 'board_generations', 'sections', 'conflicts'],
}

const consolidatePrompt = (who) => `You are consolidating the menu of **PanPan Atelier** (bakery-café, Gran Vía Marqués del Turia 51, Valencia) for its new website. You are consolidator ${who}; another person does the same job independently, so work only from the sources, never from assumptions.

Inputs (read them fully):
- ${ROOT}/menu-text/reads.json — 72 transcriptions (two independent readers A/B per photo) of menu boards, vitrina price tags and customer receipts. Each has file, reader, board_type, sections/items/prices with confidence, date_clues and uncertain notes.
- ${ROOT}/maps/photo-catalog.json — what each photo shows (subject_es, notes).
- ${ROOT}/maps/all-photos.json — Google photo dates (field "date", index n = number in file name) where known.
- Previews of every photo: ${ROOT}/photos/pNNN.jpg (1000 px). You may Read them. Originals can be fetched with curl "<url>=s0" (url in all-photos.json) and cropped with Python/PIL into ${ROOT}/crops/ (prefix your files with "cons${who}-") if you need to settle something.

Tasks:
1. Date every source photo: printed receipt date > EXIF date quoted by the readers > Google date. Record date_basis. Identify the board generations (e.g. handwritten chalkboards ~2019, wooden boards 2022, printed black boards 2025) and which photo shows which.
2. Build ONE menu organised the way a café website should present it (e.g. Desayunos hasta las 11:00, Menús de mediodía, Ensaladas, Tostas, Bocadillos y sándwiches, Bollería del obrador, Salados de la vitrina, Dulces y tartas, Zumos · licuados · smoothies, Cafés e infusiones, Otros). Merge the same product across sources (price tags, boards, receipts spell items differently: "CRUASÁN Mantequilla", "CROISSANT", receipt abbreviations like "CR MANT").
3. For every item keep: the Spanish name as the café writes it (clean capitalisation, fix obvious typos but keep their wording), a short Spanish description ONLY from what the boards/tags say (ingredients lists from boards are gold; no invented adjectives), each price variant (P/G, unidad, porción, media/entera…) with price as a number, the month it was seen (YYYY-MM), the source file, and confidence. Use the MOST RECENT legible price as the variant; list the whole price history in history[] as short strings "2022-07 3,00 € (p011 wood board)". Mark still_current: yes (seen on the 2025 boards/tags), probably (seen 2024+), unknown, probably-not (only on old generations and absent from newer boards).
4. Receipts: use them to confirm or date prices and to discover products that are not on boards (café con leche, capuchino, infusiones, bocadillos…). A receipt price includes IVA and is authoritative for its date.
5. conflicts[]: every disagreement between readers or sources you could not settle, stated precisely.
Return the full structured result. Be exhaustive — every product that appears with a name in any reading must be in the menu (you may mark old ones probably-not).`

const arbiterPrompt = (a, b) => `Two people consolidated the menu of PanPan Atelier (Valencia bakery-café) independently from the same 72 readings. Your job is to produce the FINAL menu, resolving every difference between them against the evidence.

Consolidation A:
${JSON.stringify(a)}

Consolidation B:
${JSON.stringify(b)}

Evidence you can and should consult: ${ROOT}/menu-text/reads.json (all readings), ${ROOT}/maps/photo-catalog.json, ${ROOT}/maps/all-photos.json (urls, dates), previews ${ROOT}/photos/pNNN.jpg. For every price or name where A and B differ, or where either marks confidence guess/probable on a 2024–2025 source, download the original (curl -sL "<url>=s0"), crop the exact tag/board line with Python/PIL (upscale 2–4×, try contrast/sharpen), save crops as ${ROOT}/crops/arb-*.jpg and Read them. Decide from what you see; if still unreadable, set price null and confidence "none" rather than guessing.

Rules: most recent legible price wins; keep the full history; names in the café's own Spanish; descriptions only from boards/tags; sections ordered for a café website. Put in conflicts[] only what remains genuinely unresolved, each with what you checked. Return the complete final menu.`

const TRANSLATION = {
  type: 'object',
  properties: {
    sections: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title_en: { type: 'string' },
          note_en: { type: 'string' },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name_en: { type: 'string' },
                desc_en: { type: 'string' },
                variant_labels_en: { type: 'array', items: { type: 'string' } },
              },
              required: ['id', 'name_en', 'desc_en', 'variant_labels_en'],
            },
          },
        },
        required: ['id', 'title_en', 'note_en', 'items'],
      },
    },
    glossary: { type: 'array', items: { type: 'string' } },
  },
  required: ['sections', 'glossary'],
}

const translatePrompt = (menu) => `Translate this Spanish café menu (PanPan Atelier, Valencia) into natural British-English menu copy for the English version of its website.

${JSON.stringify(menu.sections.map((s) => ({ id: s.id, title_es: s.title_es, note_es: s.note_es, items: s.items.map((i) => ({ id: i.id, name_es: i.name_es, desc_es: i.desc_es, variant_labels_es: i.variants.map((v) => v.label_es) })) })))}

Rules: keep Spanish/Valencian product names that have no real English equivalent and add a short gloss in desc_en (e.g. "Ensaimada — Mallorcan spiral pastry dusted with icing sugar"; "coca de calabaza — Valencian pumpkin sponge cake"; "empanadilla — baked turnover"; "tostada con tomate — toast with grated tomato and olive oil"). Translate ingredient lists faithfully — do not add or drop ingredients, do not add adjectives. "Paleta ibérica" is Iberian cured shoulder (not ham leg). "Mantequilla" butter, "semillas" seeded bread, "centeno" rye, "espelta" spelt. Variant labels: P → small, G → large, unidad → each, porción → slice, etc. Keep ids exactly. glossary[]: list every non-obvious choice you made ("pan de masa madre → sourdough bread").`

const reviewPrompt = (menu, tr) => `You are an independent reviewer of an English translation of a Spanish café menu (PanPan Atelier, Valencia). Spanish source:
${JSON.stringify(menu.sections.map((s) => ({ id: s.id, title_es: s.title_es, note_es: s.note_es, items: s.items.map((i) => ({ id: i.id, name_es: i.name_es, desc_es: i.desc_es, variant_labels_es: i.variants.map((v) => v.label_es) })) })))}

Translation:
${JSON.stringify(tr)}

Check every item: meaning faithful (no added/dropped ingredients or claims), natural British menu English, glosses correct for Spanish/Valencian foods, consistent terminology across items, variant labels right. Return the corrected full translation in the same shape; put each change you made into glossary[] as "id: old → new (reason)".`

phase('Consolidate')
const [A, B] = await parallel(['A', 'B'].map((w) => () => agent(consolidatePrompt(w), { label: `consolidate ${w}`, phase: 'Consolidate', schema: MENU, effort: 'high' })))
if (!A || !B) return { error: 'consolidation failed', A, B }

phase('Arbitrate')
const final = await agent(arbiterPrompt(A, B), { label: 'arbiter', phase: 'Arbitrate', schema: MENU, effort: 'high' })
if (!final) return { error: 'arbiter failed', A, B }

phase('Translate')
const tr = await agent(translatePrompt(final), { label: 'translate EN', phase: 'Translate', schema: TRANSLATION })
const reviewed = tr ? await agent(reviewPrompt(final, tr), { label: 'review EN', phase: 'Translate', schema: TRANSLATION }) : null
return { final, translation: reviewed || tr, draftTranslation: tr, A, B }
