export const meta = {
  name: 'panpan-photos-and-menu',
  description: 'Classify 218 Google photos of PanPan Atelier and transcribe every menu board / price label twice independently',
  phases: [
    { title: 'Classify', detail: '7 agents × ~32 photos: category, subject, quality, faces, text' },
    { title: 'Transcribe', detail: 'each menu/price photo read at full size by two independent readers' },
  ],
}

const ROOT = 'C:/Users/dopelganger/Documents/Ресттораны/panpan-atelier/_data'
const BATCHES = []
for (let s = 0; s < 218; s += 32) BATCHES.push([s, Math.min(218, s + 32)])

const CLASSIFY = {
  type: 'object',
  properties: {
    photos: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          file: { type: 'string' },
          category: { type: 'string', enum: ['dish', 'pastry', 'sweet', 'drink', 'coffee', 'breakfast-set', 'display-case', 'menu-board', 'price-label', 'interior', 'exterior', 'terrace', 'packaging', 'people', 'other'] },
          subject_es: { type: 'string' },
          subject_en: { type: 'string' },
          quality: { type: 'integer', minimum: 1, maximum: 5 },
          faces: { type: 'string', enum: ['none', 'incidental', 'prominent'] },
          hands: { type: 'boolean' },
          has_readable_text: { type: 'boolean' },
          text_snippet: { type: 'string' },
          logo_visible: { type: 'boolean' },
          other_venue_suspect: { type: 'boolean' },
          notes: { type: 'string' },
        },
        required: ['file', 'category', 'subject_es', 'subject_en', 'quality', 'faces', 'hands', 'has_readable_text', 'text_snippet', 'logo_visible', 'other_venue_suspect', 'notes'],
      },
    },
  },
  required: ['photos'],
}

const TRANSCRIBE = {
  type: 'object',
  properties: {
    file: { type: 'string' },
    board_type: { type: 'string' },
    legible: { type: 'boolean' },
    sections: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          note: { type: 'string' },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                prices: { type: 'array', items: { type: 'object', properties: { label: { type: 'string' }, value: { type: 'string' } }, required: ['label', 'value'] } },
                confidence: { type: 'string', enum: ['sure', 'probable', 'guess'] },
              },
              required: ['name', 'description', 'prices', 'confidence'],
            },
          },
        },
        required: ['title', 'note', 'items'],
      },
    },
    other_text: { type: 'string' },
    date_clues: { type: 'string' },
    uncertain: { type: 'array', items: { type: 'string' } },
  },
  required: ['file', 'board_type', 'legible', 'sections', 'other_text', 'date_clues', 'uncertain'],
}

const classifyPrompt = ([a, b]) => {
  const files = []
  for (let i = a; i < b; i++) files.push(`p${String(i).padStart(3, '0')}.jpg`)
  return `You are cataloguing guest and owner photos from the Google Maps listing of **PanPan Atelier**, a bakery-café (cafetería con obrador: bollería, tostadas, bocadillos, ensaladas, zumos/licuados, café) at Gran Vía Marqués del Turia 51, Valencia. Interior facts known: untreated pine wood panels, grey walls, aluminium chain-link curtains hanging from the ceiling, wooden menu boards with brown sans type (older photos show black chalkboards).

Read EACH of these files individually with the Read tool (they are 1000 px wide JPEGs in ${ROOT}/photos/):
${files.join(', ')}

Metadata per photo (source list, Google date if known, original size) is in ${ROOT}/maps/all-photos.json — entry index n = the number in the file name. Use it only as context.

For every file return one entry:
- category: the best single category. "breakfast-set" = tray with coffee + juice + toast etc. "display-case" = the glass counter/vitrina with pastries. "menu-board" = any board/sign listing products (wood or chalk). "price-label" = small price tags / labels in the vitrina or on products.
- subject_es / subject_en: precise, concrete description of what is visible, as a food editor would caption it (e.g. "Tostada de pan de semillas con aguacate, tomate y cebolla" / "Seeded-bread toast with avocado, tomato and onion"). Do not guess ingredients you cannot see — say "relleno no visible" etc.
- quality 1–5 as a photo for a premium website (5 = sharp, well lit, appetising, good composition, usable as a hero; 1 = blurry/dark/unusable).
- faces: none / incidental (small, background, blurred) / prominent (a recognisable person). hands: true if hands/arms visible.
- has_readable_text + text_snippet: any legible text with prices or product names (quote a few words).
- logo_visible: PanPan logo / wordmark / sign visible (describe in notes).
- other_venue_suspect: true if the photo seems not to be taken at this café (different interior, a different business's branding, stock image, screenshot, promo graphic).
- notes: anything useful — e.g. "same scene as p012", "old chalkboard menu", "video thumbnail", "cup with Lavazza logo", AI-looking, watermark.

Be exact and honest; this catalogue drives which photos get published and which prices are read.`
}

const transcribePrompt = (p, reader) => `Transcribe a menu/price photo from the Google Maps listing of PanPan Atelier (bakery-café, Valencia). Reader ${reader} of two independent readings — be exhaustive and literal; do not normalise or invent.

Photo: ${p.file} (index n=${parseInt(p.file.slice(1), 10)} in ${ROOT}/maps/all-photos.json → field "url"). Preview at ${ROOT}/photos/${p.file} (1000 px).
Catalogue note: ${p.subject_es} — "${p.text_snippet}".

Steps:
1. Download the ORIGINAL: curl -sL "<url>=s0" -o <scratch file> (use a unique name like ${ROOT}/crops/${p.file.replace('.jpg', '')}-${reader}-orig.jpg; mkdir -p ${ROOT}/crops first). Use Python + PIL to crop the board into readable pieces (halves/thirds/quarters), upscale 2× with LANCZOS, save them into ${ROOT}/crops/, and Read each crop. Keep cropping tighter until every price is legible or clearly unreadable.
2. Transcribe everything: section titles, section notes ("Hasta las 11:00h", "Todos a 3,95 €"), each item's exact name, description/ingredients line, and every price with its column label (P / G, pequeño / grande, etc.). Prices exactly as printed ("2,85 €"). For icon-based combo boards (e.g. "Desayunos": café + zumo + tostada = 3,80 €) represent each combo as an item whose description lists the components in order.
3. confidence per item: sure / probable / guess. Put every doubt into "uncertain" (e.g. "price of X could be 4,50 or 4,80").
4. date_clues: anything that hints when the photo was taken or which version of the menu it is (board material, COVID screens, printed dates, brand of products).
If the photo contains no readable menu/prices, return legible=false with empty sections.`

phase('Classify')
const results = await pipeline(
  BATCHES,
  (b, _, i) => agent(classifyPrompt(b), { label: `classify ${b[0]}–${b[1] - 1}`, phase: 'Classify', schema: CLASSIFY }),
  (res, b) => {
    if (!res) return { batch: b, photos: [], reads: [] }
    const menu = res.photos.filter((p) => ['menu-board', 'price-label'].includes(p.category) || (p.has_readable_text && /€|\d[,.]\d\d/.test(p.text_snippet)))
    return parallel(menu.flatMap((p) => ['A', 'B'].map((r) => () =>
      agent(transcribePrompt(p, r), { label: `read ${p.file} ${r}`, phase: 'Transcribe', schema: TRANSCRIBE }).then((t) => ({ reader: r, ...t }))
    ))).then((reads) => ({ batch: b, photos: res.photos, reads: reads.filter(Boolean) }))
  },
)
const photos = results.filter(Boolean).flatMap((r) => r.photos)
const reads = results.filter(Boolean).flatMap((r) => r.reads)
log(`${photos.length} photos classified, ${reads.length} menu readings`)
return { photos, reads }
