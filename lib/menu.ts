/**
 * Карта PanPan Atelier — как на их досках и ценниках витрины.
 *
 * Источник — `_data/menu-text/menu-final.json`: 72 прочтения фото (доски, ценники, тики
 * гостей; по два независимых на кадр), сведённые двумя агентами и арбитром по оригиналам.
 * Правило цен (DESIGN.md §3): самая свежая разборчивая цена; у раздела — месяц и источник;
 * у позиции, чья цена заметно старше раздела, — год в скобках (`seen`). Цены сосновых досок
 * 2022 года на сайт не идут: у салатов и части сэндвичей цены нет, а не «примерно».
 * `npm run check:menu` сверяет каждую цену здесь с menu-final.json.
 *
 * Названия — как пишет заведение (Cruasán, Panut, Panquemao); описания — только из
 * состава на их досках. Английский — перевод с глоссами для испанских блюд.
 */

import type { PhotoKey } from "@/lib/photos";

type T = { es: string; en: string };

export type ComboIcon = "cup" | "juice" | "toast" | "tomato" | "jar" | "ham" | "avocado" | "fruit";
export type Combo = { id: string; name: T; parts: { icon: ComboIcon; label: T; size?: "P" | "G" }[]; price: number | null; seen: string };

/** `seen` — год/месяц, если цена старше даты раздела (показывается мелко в скобках). */
export type Price = { label?: T; value: number; seen?: string };
export type MenuItem = { id: string; name: T; desc?: T; prices: Price[]; note?: T };
export type MenuSection = { id: string; title: T; note?: T; photo?: PhotoKey; seen: string; source: T; items: MenuItem[] };

const t = (es: string, en: string): T => ({ es, en });

/* ───────────────────────── Desayunos (pizarra G3, p158/p149, 10.2023) ───────────────────────── */

export const breakfasts: Combo[] = [
  {
    id: "desayuno-mediterraneo",
    name: t("Mediterráneo", "Mediterranean"),
    parts: [
      { icon: "cup", label: t("Café o té", "Coffee or tea") },
      { icon: "juice", size: "P", label: t("zumo de naranja pequeño", "small orange juice") },
      { icon: "toast", label: t("½ tostada de pan blanco o de semillas", "half-size toast, white or seeded bread") },
      { icon: "tomato", label: t("tomate, o mermelada y mantequilla", "tomato, or jam and butter") },
    ],
    price: 4,
    seen: "2023-10",
  },
  {
    id: "desayuno-healthy",
    name: t("Healthy", "Healthy"),
    parts: [
      { icon: "cup", label: t("Café o té", "Coffee or tea") },
      { icon: "juice", size: "G", label: t("zumo de naranja grande o licuado pequeño", "large orange juice or small juice blend") },
      { icon: "toast", label: t("tostada de pan blanco o de semillas", "toast, white or seeded bread") },
      { icon: "ham", label: t("paleta ibérica o aguacate", "Iberian cured pork shoulder or avocado") },
      { icon: "tomato", label: t("tomate, o mermelada y mantequilla", "tomato, or jam and butter") },
      { icon: "fruit", label: t("vaso de fruta", "fruit pot") },
    ],
    price: 7.75,
    seen: "2023-10",
  },
];

/** Сноски доски завтраков (G2 2022 и G3 2025 — одинаковые) и тика 07.2024. */
export const breakfastNotes: T[] = [
  t(
    "Por 0,20 € más, cambia la tostada por pan de espelta y nueces, de centeno o de masa madre.",
    "For €0.20 more, have your toast on spelt-and-walnut, rye or sourdough bread.",
  ),
  t("Consulta la carta para añadir toppings a tu desayuno.", "Ask for the menu to add toppings to your breakfast."),
  t(
    "Suelta, la tostada integral: media 0,75 €, entera 1,50 €; el topping de tomate, 0,50 € (tiques de 2024).",
    "Wholemeal toast on its own: half €0.75, whole €1.50; tomato topping €0.50 (2024 receipts).",
  ),
];

/** Самая дешёвая комбинация — для hero. */
export const breakfastFrom = Math.min(...breakfasts.map((b) => b.price ?? Infinity));

/* ───────────────────────── La carta ───────────────────────── */

export const menuSections: MenuSection[] = [
  {
    id: "ensaladas",
    title: t("Ensaladas y menús", "Salads & set menus"),
    photo: "ensalada",
    seen: "2023-10",
    source: t("pizarra de menús", "set-menu board"),
    note: t(
      "Las seis ensaladas son las de la pizarra de noviembre de 2025; allí todas cuestan entre 5 y 6 €, pero la cifra exacta no se lee en la foto. Los menús: ensalada a elegir; bebida: zumo de naranja pequeño, refresco, cerveza o agua; tosta de aguacate o salmón. *Café o té, excepto capuchino y café con leche grande.",
      "The six salads are those on the November 2025 board; there they all cost between €5 and €6, but the exact figures can’t be read in the photo. Set menus: any salad; drink: small orange juice, soft drink, beer or water; avocado or salmon toast. *Coffee or tea, except cappuccino and large café con leche.",
    ),
    items: [
      {
        id: "menu-basico",
        name: t("Menú Básico", "Basic set menu"),
        desc: t("Ensalada + bebida + café o té*", "Salad + drink + coffee or tea*"),
        prices: [{ value: 8.25 }],
      },
      {
        id: "menu-completo",
        name: t("Menú Completo", "Full set menu"),
        desc: t("Ensalada + tosta + bebida + café o té*", "Salad + toast + drink + coffee or tea*"),
        prices: [{ value: 10.25 }],
      },
      {
        id: "ensalada-fusilli",
        name: t("Ensalada Fusilli", "Fusilli salad"),
        desc: t(
          "Pasta fusilli tricolor, aceitunas negras, anchoas, tomates cherry, mozzarella fresca y salsa pesto",
          "Tricolour fusilli, black olives, anchovies, cherry tomatoes, fresh mozzarella and pesto",
        ),
        prices: [],
      },
      {
        id: "ensalada-cesar",
        name: t("Ensalada César", "Caesar salad"),
        desc: t(
          "Lechugas variadas, pollo braseado, picatostes, queso Grana Padano y salsa César",
          "Mixed lettuce, grilled chicken, croutons, Grana Padano and Caesar dressing",
        ),
        prices: [],
      },
      {
        id: "ensalada-otono",
        name: t("Ensalada Otoño", "Autumn salad"),
        desc: t(
          "Canónigos, manzana, nueces tostadas, cacahuetes caramelizados, tomate cherry, queso de cabra y crujiente de yuca",
          "Lamb’s lettuce, apple, toasted walnuts, caramelised peanuts, cherry tomatoes, goat’s cheese and cassava crisps",
        ),
        prices: [],
      },
      {
        id: "ensalada-ventresca",
        name: t("Ensalada Ventresca", "Ventresca salad"),
        desc: t(
          "Lechuga romana, cebolla morada, ventresca de atún, maíz dulce, espárragos, huevo duro, zanahoria rallada y tomate cherry",
          "Romaine, red onion, tuna belly (ventresca), sweetcorn, asparagus, hard-boiled egg, grated carrot and cherry tomatoes",
        ),
        prices: [],
      },
      {
        id: "ensalada-bahia",
        name: t("Ensalada Bahía", "Bahía salad"),
        desc: t(
          "Canónigos, pasta fusilli tricolor, salmón ahumado, tomate seco, aceitunas negras, queso feta y vinagreta de mostaza",
          "Lamb’s lettuce, tricolour fusilli, smoked salmon, sun-dried tomato, black olives, feta and mustard vinaigrette",
        ),
        prices: [],
      },
      {
        id: "ensalada-cobb",
        name: t("Ensalada Cobb", "Cobb salad"),
        desc: t(
          "Mezcla de lechugas y brotes, huevo duro, aguacate, tomate, pollo braseado, queso azul y salsa especial ranchera",
          "Mixed lettuce and baby leaves, hard-boiled egg, avocado, tomato, grilled chicken, blue cheese and their special ranch dressing",
        ),
        prices: [],
      },
    ],
  },
  {
    id: "tostas",
    title: t("Tostas", "Toasts"),
    photo: "tostadaAguacate",
    seen: "2023-10",
    source: t("pizarra de tostas y sándwiches", "toasts & sandwiches board"),
    note: t("Elige el pan para la tosta: de espelta y nueces, de centeno o de masa madre.", "Choose the bread for your toast: spelt-and-walnut, rye or sourdough."),
    items: [
      {
        id: "tosta-salmon",
        name: t("Tosta de salmón", "Smoked salmon toast"),
        desc: t(
          "Mahonesa, mézclum, huevo duro, cebolla tierna, pepinillos en vinagre y salmón ahumado",
          "Mayonnaise, mixed leaves, hard-boiled egg, spring onion, pickled gherkins and smoked salmon",
        ),
        prices: [{ value: 4.75 }],
      },
      {
        id: "tosta-aguacate",
        name: t("Tosta de aguacate", "Avocado toast"),
        desc: t("Aguacate, tomate, cebolla morada, zumo de limón y aceite de oliva", "Avocado, tomato, red onion, lemon juice and olive oil"),
        prices: [{ value: 4.25 }],
      },
    ],
  },
  {
    id: "sandwiches",
    title: t("Sándwiches y bocadillos", "Sandwiches & bocadillos"),
    photo: "sandwichClub",
    seen: "2023-10",
    source: t("pizarra de tostas y sándwiches", "toasts & sandwiches board"),
    note: t(
      "Los precios de los sándwiches club, de ventresca y de York y queso quedan tapados por el reflejo de una lámpara en la foto de la pizarra: consúltalos en el mostrador. En la vitrina hay además bocadillos de barra de semillas.",
      "The prices of the club, ventresca and ham-and-cheese sandwiches are hidden by a lamp’s glare in the photo of the board: ask at the counter. The case also has bocadillos on seeded baguettes.",
    ),
    items: [
      {
        id: "sandwich-salmon",
        name: t("Sándwich de salmón", "Smoked salmon sandwich"),
        desc: t(
          "Pan de molde de tritordeum, mahonesa, mézclum, cebolla tierna, huevo duro, pepinillos en vinagre y salmón ahumado",
          "Sliced tritordeum bread, mayonnaise, mixed leaves, spring onion, hard-boiled egg, pickled gherkins and smoked salmon",
        ),
        prices: [{ value: 4.95 }],
      },
      {
        id: "sandwich-club",
        name: t("Sándwich club", "Club sandwich"),
        desc: t(
          "Pan de molde, mahonesa, lechuga, tomate, jamón York, queso Edam, pollo braseado y bacon",
          "Sliced bread, mayonnaise, lettuce, tomato, cooked ham, Edam, grilled chicken and bacon",
        ),
        prices: [],
      },
      {
        id: "sandwich-ventresca",
        name: t("Sándwich con ventresca", "Tuna belly sandwich"),
        desc: t(
          "Pan de molde de tritordeum, mahonesa, lechuga romana, tomate, espárragos, aguacate, huevo duro y ventresca de atún",
          "Sliced tritordeum bread, mayonnaise, romaine, tomato, asparagus, avocado, hard-boiled egg and tuna belly (ventresca)",
        ),
        prices: [],
      },
      {
        id: "sandwich-york-queso",
        name: t("Sándwich de York y queso a la plancha", "Grilled ham and cheese sandwich"),
        desc: t("Pan de molde, jamón York y queso Edam", "Sliced bread, cooked ham and Edam"),
        prices: [],
      },
      {
        id: "focaccia-jamon",
        name: t("Focaccia de jamón", "Ham focaccia"),
        prices: [{ value: 3.75 }],
      },
    ],
  },
  {
    id: "bolleria",
    title: t("Bollería", "Pastries"),
    photo: "napolitana",
    seen: "2025-11",
    source: t("etiquetas de la vitrina y tiques", "display-case labels and receipts"),
    note: t("Precio por pieza, IVA incluido.", "Price per piece, VAT included."),
    items: [
      { id: "cruasan-mantequilla", name: t("Cruasán de mantequilla", "Butter croissant"), prices: [{ value: 1.5 }] },
      { id: "mini-cruasan-chocolate", name: t("Mini cruasán de chocolate", "Mini chocolate croissant"), prices: [{ value: 0.8 }] },
      { id: "ensaimada", name: t("Ensaimada", "Ensaimada"), desc: t("", "Mallorcan spiral pastry dusted with icing sugar"), prices: [{ value: 0.95 }] },
      { id: "mini-cruasan-almendra", name: t("Mini cruasán de almendra", "Mini almond croissant"), prices: [{ value: 1.2, seen: "2024" }] },
      {
        id: "panut",
        name: t("Panut", "Panut"),
        desc: t("El dónut de la casa", "Their house doughnut"),
        prices: [
          { label: t("blanco", "plain glazed"), value: 0.95, seen: "2023" },
          { label: t("chocolate", "chocolate"), value: 1, seen: "2023" },
          { label: t("colores", "sprinkles"), value: 1.4, seen: "2024" },
        ],
      },
      { id: "caracola-chocolate", name: t("Caracola de chocolate", "Chocolate swirl"), prices: [{ value: 1.95, seen: "2023" }] },
      { id: "panquemao", name: t("Panquemao", "Panquemao"), desc: t("", "Valencian sweet brioche-style bun"), prices: [{ value: 1.4, seen: "2023" }] },
      { id: "mini-cruasan-mantequilla", name: t("Mini cruasán de mantequilla", "Mini butter croissant"), prices: [{ value: 0.65, seen: "2023" }] },
    ],
  },
  {
    id: "salados",
    title: t("Salados", "Savoury"),
    photo: "vitrinaSalados",
    seen: "2025-11",
    source: t("etiquetas de la vitrina y tiques", "display-case labels and receipts"),
    items: [
      {
        id: "pizza",
        name: t("Pizza, porción", "Pizza, by the slice"),
        prices: [
          { label: t("peperoni", "pepperoni"), value: 2.85 },
          { label: t("bacon y queso", "bacon and cheese"), value: 2.85 },
          { label: t("jamón y queso", "ham and cheese"), value: 2.75, seen: "2023" },
          { label: t("cuatro quesos", "four cheese"), value: 2.75, seen: "2023" },
          { label: t("verduras", "vegetable"), value: 2.75, seen: "2023" },
        ],
      },
      {
        id: "empanadillas",
        name: t("Empanadillas", "Empanadillas"),
        desc: t("", "Small savoury turnovers"),
        prices: [
          { label: t("ternera", "beef"), value: 2.2, seen: "2024" },
          { label: t("pollo", "chicken"), value: 2.2, seen: "2024" },
          { label: t("espinacas", "spinach"), value: 2, seen: "2024" },
          { label: t("pisto", "pisto"), value: 2, seen: "2023" },
        ],
        note: t("", "Pisto is a Spanish ratatouille-style vegetable stew."),
      },
      { id: "quiche", name: t("Quiche de York y queso", "Ham and cheese quiche"), prices: [{ value: 1.9, seen: "2024" }] },
      { id: "cruasan-jamon-queso", name: t("Cruasán de jamón y queso", "Ham and cheese croissant"), prices: [{ value: 2.75, seen: "2023" }] },
      { id: "napolitana-jamon-queso", name: t("Napolitana de jamón y queso", "Ham and cheese napolitana"), desc: t("", "A flat, rectangular flaky pastry"), prices: [{ value: 1.75, seen: "2023" }] },
    ],
  },
  {
    id: "dulces",
    title: t("Dulces", "Sweets"),
    photo: "vitrinaDulce",
    seen: "2023-04",
    source: t("etiquetas de la vitrina y tiques", "display-case labels and receipts"),
    note: t(
      "Solo lo que aparece con nombre en etiquetas y tiques. En la vitrina refrigerada hay además tartas del día.",
      "Only what appears by name on labels and receipts. The chilled cabinet also holds the day’s cakes.",
    ),
    items: [
      {
        id: "san-marcos",
        name: t("Pastel de San Marcos", "San Marcos cake"),
        desc: t("El que enseñan a elaborar en su Instagram", "A classic Spanish layered cake — the one they show being made on their Instagram"),
        prices: [{ value: 2.95 }],
      },
      { id: "cookie", name: t("Cookie de pepitas de chocolate", "Chocolate chip cookie"), prices: [{ value: 1.5 }] },
      {
        id: "eclair",
        name: t("Éclair", "Éclair"),
        desc: t("De chocolate, de café o de vainilla", "Chocolate, coffee or vanilla"),
        prices: [],
      },
      { id: "coca-calabaza", name: t("Coca de calabaza", "Pumpkin coca"), desc: t("", "Valencian pumpkin sponge cake"), prices: [] },
    ],
  },
  {
    id: "zumos",
    title: t("Zumos y licuados", "Juices & juice blends"),
    photo: "licuados",
    seen: "2024-11",
    source: t("tique", "receipt"),
    note: t(
      "La pizarra de bebidas actual no se lee en las fotos. En la de julio de 2022: zumo de naranja pequeño 1,90 € y grande 2,85 €; licuados 3,00 € pequeño y 4,00 € grande; smoothies, todos a 3,95 €.",
      "Today’s drinks board can’t be read in the photos. On the July 2022 board: small orange juice €1.90, large €2.85; juice blends €3.00 small and €4.00 large; smoothies all €3.95.",
    ),
    items: [
      {
        id: "zumo-naranja",
        name: t("Zumo de naranja natural", "Fresh orange juice"),
        prices: [{ value: 2.2 }],
        note: t("Precio de un tique de noviembre de 2024, sin tamaño indicado.", "Price from a November 2024 receipt, size not stated."),
      },
      { id: "licuado-multivitaminico", name: t("Licuado multivitamínico", "Multivitamin juice blend"), desc: t("Naranja, manzana, zanahoria y limón", "Orange, apple, carrot and lemon"), prices: [] },
      { id: "licuado-digestivo", name: t("Licuado digestivo", "Digestive juice blend"), desc: t("Piña y manzana", "Pineapple and apple"), prices: [] },
      { id: "licuado-antioxidante", name: t("Licuado antioxidante", "Antioxidant juice blend"), desc: t("Espinaca, pepino, manzana y limón", "Spinach, cucumber, apple and lemon"), prices: [] },
      { id: "licuado-refrescante", name: t("Licuado refrescante", "Refreshing juice blend"), desc: t("Manzana, limón y jengibre", "Apple, lemon and ginger"), prices: [] },
      {
        id: "smoothies",
        name: t("Smoothies", "Smoothies"),
        desc: t(
          "Plátano y fresa · melocotón, fresa y papaya · pera y mango · piña, mango y papaya · manzana, frambuesa, mora y mango",
          "Banana and strawberry · peach, strawberry and papaya · pear and mango · pineapple, mango and papaya · apple, raspberry, blackberry and mango",
        ),
        prices: [],
      },
    ],
  },
  {
    id: "cafes",
    title: t("Cafés e infusiones", "Coffee & tea"),
    photo: "desayunoCruasan",
    seen: "2024-11",
    source: t("tiques", "receipts"),
    note: t(
      "Café Lavazza. La bebida de avena y el descafeinado no se cobran aparte (tique de julio de 2024).",
      "Lavazza coffee. Oat drink and decaf cost nothing extra (July 2024 receipt).",
    ),
    items: [
      {
        id: "cafe-con-leche",
        name: t("Café con leche", "Café con leche"),
        desc: t("", "Espresso with hot milk"),
        prices: [
          { label: t("normal", "regular"), value: 1.75 },
          { label: t("grande", "large"), value: 1.9 },
        ],
      },
      { id: "capuchino", name: t("Capuchino", "Cappuccino"), prices: [{ value: 2.25 }] },
      { id: "cafes", name: t("Café solo, americano, cortado y bombón", "Espresso, americano, cortado and café bombón"), desc: t("", "Cortado: espresso with a dash of milk; bombón: espresso with sweetened condensed milk"), prices: [] },
      { id: "colacao", name: t("ColaCao", "ColaCao"), desc: t("", "Spanish cocoa drink"), prices: [] },
      { id: "infusiones", name: t("Infusiones", "Tea and infusions"), desc: t("Té moruno, poleo, manzanilla y poleo menta", "Moroccan mint tea, pennyroyal, camomile and pennyroyal mint"), prices: [] },
    ],
  },
];
