/**
 * Снимки из public/photos. Каждое имя есть в двух ширинах: <name>-800.webp и
 * <name>-1600.webp (scripts/optimize-photos.mjs; меньшие исходники не растягиваются —
 * фактическая ширина считается в srcFor). width/height — размеры `_photos/<name>.jpg`
 * из photo-manifest.json, против сдвига вёрстки.
 *
 * Откуда (DESIGN.md §8): все кадры — фото гостей и владельца из карточки Google
 * (номера pNNN → `_data/maps/all-photos.json`, отбор `_data/scripts/make-photos.py`).
 * Лиц, чеков и чужих брендов на первом плане нет. Повторы запрещены: каждый кадр
 * стоит на странице один раз. `position` — точка кадрирования для object-cover.
 * alt описывает то, что видно, — без названий блюд, которых на фото не разобрать.
 */

import { withBase } from "@/lib/basePath";

export type Photo = {
  name: string;
  width: number;
  height: number;
  alt: { es: string; en: string };
  position?: string;
};

const p = (name: string, width: number, height: number, es: string, en: string, position?: string): Photo => ({
  name,
  width,
  height,
  alt: { es, en },
  position,
});

export const photos = {
  // Hero — p206
  hero: p(
    "hero",
    1800,
    2400,
    "Capuchino y focaccia de jamón y tomate en la barra de pino junto al ventanal; en el cristal, el cartel «pan pan» y, fuera, la Gran Vía arbolada al sol",
    "A cappuccino and a ham-and-tomato focaccia on the pine window counter; the «pan pan» sign on the glass and the tree-lined Gran Vía in the sun outside",
    "50% 62%",
  ),

  // Desayunos
  desayuno: p(
    "desayuno",
    1674,
    2400,
    "Desayuno visto desde arriba: capuchino, zumo de naranja, tostada con mermelada y mantequilla y un cruasán de jamón y queso",
    "Breakfast from above: cappuccino, orange juice, toast with jam and butter, and a ham-and-cheese croissant",
    "50% 55%",
  ),
  desayunoCruasan: p(
    "desayuno-cruasan",
    1800,
    2400,
    "Capuchino con cacao, zumo de naranja natural y cruasán de mantequilla en una bandeja de madera",
    "Cocoa-dusted cappuccino, fresh orange juice and a butter croissant on a wooden tray",
    "50% 60%",
  ),

  // La carta
  tostadaAguacate: p("tostada-aguacate", 2400, 1807, "Tostada de pan de masa madre con aguacate, tomate en dados y cebolla", "Sourdough toast with avocado, diced tomato and onion", "50% 50%"),
  ensalada: p("ensalada", 1800, 2400, "Ensalada en bol con canónigos, salmón, tomate seco, queso fresco y aceitunas negras, junto a un café y un zumo", "A bowl of lamb's lettuce, salmon, sun-dried tomato, fresh cheese and black olives, with a coffee and a juice", "50% 55%"),
  sandwichClub: p("sandwich-club", 1800, 2400, "Sándwich club de pan de molde tostado con lechuga, tomate, pollo, beicon, jamón y queso", "Club sandwich on toasted bread with lettuce, tomato, chicken, bacon, ham and cheese", "50% 55%"),
  tostadaTomate: p("tostada-tomate", 1800, 2400, "Tostada de barra con semillas y aceite de oliva, con tomate triturado aparte", "Seeded baguette toast with olive oil and grated tomato on the side", "50% 55%"),

  // Del obrador
  cruasan: p("cruasan", 2400, 1800, "Cruasán de mantequilla glaseado en primer plano; detrás, dos cafés con leche", "A glazed butter croissant in close-up, with two cafés con leche behind", "50% 70%"),
  napolitana: p("napolitana", 2400, 2400, "Napolitana de chocolate hojaldrada en plato turquesa, con un café con leche", "A flaky chocolate napolitana on a turquoise plate, with a café con leche", "50% 60%"),
  donut: p("donut", 1800, 2400, "Dónut de chocolate con perlas crujientes y un muffin detrás", "A chocolate doughnut with crunchy pearls, and a muffin behind", "50% 62%"),
  tartaQueso: p("tarta-queso", 1800, 2400, "Porción de tarta de queso con mermelada roja y una frambuesa", "A slice of cheesecake with red jam and a raspberry", "50% 62%"),
  cocaCalabaza: p("coca-calabaza", 2400, 1318, "Porción de coca de calabaza en plato turquesa y un capuchino con cacao en bandeja de madera", "A slice of pumpkin coca on a turquoise plate and a cocoa-dusted cappuccino on a wooden tray", "62% 55%"),
  tulipa: p("tulipa", 2400, 1800, "Tulipa de chocolate espolvoreada con cacao y un café solo", "A cocoa-dusted chocolate tulip dessert and an espresso", "60% 55%"),
  licuados: p("licuados", 1350, 2400, "Licuado de fresa, zumo de naranja y tarta de queso ante la pared de pino", "A strawberry smoothie, an orange juice and cheesecake against the pine wall", "50% 55%"),
  vitrinaBolleria: p("vitrina-bolleria", 2400, 1800, "Vitrina de bollería: ensaimadas, cruasanes de mantequilla y cruasanes con azúcar glas, con sus etiquetas de precio", "The pastry case: ensaimadas, butter croissants and icing-sugar croissants, with their price tags", "50% 55%"),
  vitrinaEmpanadillas: p("vitrina-empanadillas", 2400, 1800, "Filas de empanadillas horneadas de ternera, pollo y espinacas sobre madera de pino", "Rows of baked beef, chicken and spinach empanadillas on pine boards", "50% 60%"),
  vitrinaDulce: p("vitrina-dulce", 2400, 1352, "Vitrina dulce: éclairs, dónuts de chocolate y decorados y una tarta de frambuesa", "The sweet case: éclairs, chocolate and decorated doughnuts and a raspberry tart", "50% 55%"),
  vitrinaSalados: p("vitrina-salados", 2400, 1352, "Vitrina de salados: cruasanes de jamón y queso, napolitanas, empanadillas y pizza", "The savoury case: ham-and-cheese croissants, napolitanas, empanadillas and pizza", "50% 60%"),

  // El local
  rincon: p("rincon", 2400, 1800, "Rincón con banco corrido y cojines bajo el lema «Saborea la vida… sin prisa» en la pared de pino, y suelo hidráulico de cubos", "A corner bench with cushions under the slogan «Saborea la vida… sin prisa» on the pine wall, over a cube-pattern tiled floor", "50% 55%"),
  lema: p("lema", 2400, 1406, "El lema «Saborea la vida… sin prisa» en letras grises sobre los paneles de pino, con espigas tras el cristal", "The slogan «Saborea la vida… sin prisa» in grey letters on the pine panels, with wheat stalks behind the glass", "50% 60%"),
  barra: p("barra", 2400, 1350, "La barra de mármol de noche, con las vitrinas de bollería, la cafetera y las pizarras de madera", "The marble counter at night, with the pastry cases, the coffee machine and the wooden menu boards", "50% 50%"),
  ventanal: p("ventanal", 1351, 2400, "Mesa alta de madera con taburetes blancos junto al escaparate que da a la Gran Vía", "A tall wooden table with white stools by the window onto the Gran Vía", "50% 55%"),
  hornacinas: p("hornacinas", 2400, 1800, "Dos hornacinas de pino iluminadas con plantas y libros en la pared gris", "Two lit pine niches with plants and books on the grey wall", "50% 50%"),
  fachada: p("fachada", 2400, 1800, "La fachada desde abajo: la banderola «pan pan» con el zigzag y los cierres con dibujo de espiga", "The frontage from below: the «pan pan» blade sign with its zigzag and the herringbone shutters", "40% 50%"),
  fachadaCalle: p("fachada-calle", 2400, 1800, "La fachada en la Gran Vía con tres logotipos «pan pan», un olivo en maceta y plantas en la entrada", "The Gran Vía frontage with three «pan pan» logos, a potted olive tree and plants at the door", "50% 55%"),
  esquina: p("esquina", 1800, 2400, "La esquina del local al sol: el logotipo «pan pan» y el zigzag sobre la pared marrón", "The corner of the shop in the sun: the «pan pan» logo and zigzag on the brown wall", "60% 40%"),
  terraza: p("terraza", 1351, 2400, "Empanadilla, porción de pizza y café en la terraza, bajo los árboles de la Gran Vía", "An empanadilla, a pizza slice and a coffee on the terrace under the Gran Vía trees", "50% 65%"),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/**
 * srcset с фактическими ширинами: исходник 1024 px не превращается в «1600w».
 */
export function srcFor(photo: Photo) {
  const small = withBase(`/photos/${photo.name}-800.webp`);
  if (photo.width <= 800) return { src: small, srcSet: `${small} ${photo.width}w` };
  const large = withBase(`/photos/${photo.name}-1600.webp`);
  return { src: large, srcSet: `${small} 800w, ${large} ${Math.min(1600, photo.width)}w` };
}
