/**
 * Все тексты интерфейса на двух языках. Факты (цифры, часы, адрес, цены) сюда не
 * пишутся — они в lib/restaurant.ts и lib/menu.ts и подставляются функциями.
 * Каждое утверждение опирается на источник из DESIGN.md §1.
 */

import type { PhotoKey } from "@/lib/photos";
import type { DayKey, ServiceKey, TopicKey } from "@/lib/restaurant";

export type Locale = "es" | "en";

type Captions = Partial<Record<PhotoKey, string>>;

const es = {
  htmlLang: "es",
  otherLocale: { code: "en" as Locale, label: "EN", aria: "English version" },

  meta: {
    title: "PanPan Atelier · Obrador y cafetería en la Gran Vía, Valencia",
    description:
      "Obrador y cafetería en la Gran Vía de Valencia: bollería del día, desayunos hasta las 11:00, tostas, ensaladas y zumo natural. Lun–vie de 7:30 a 21:00.",
  },

  nav: {
    skipToContent: "Saltar al contenido",
    home: "PanPan Atelier, inicio",
    sections: "Secciones",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    breakfast: "Desayunos",
    menu: "Carta",
    bakery: "Obrador",
    place: "El local",
    reviews: "Opiniones",
    visit: "Dónde y cuándo",
  },

  cta: {
    directions: "Cómo llegar",
    seeMenu: "Ver la carta",
    callLong: (n: string) => `Llamar al ${n}`,
    newTab: "(se abre en otra pestaña)",
  },

  hero: {
    eyebrow: "Obrador y cafetería · Gran\u00a0Vía,\u00a0Valencia",
    claim: "Saborea la vida… sin prisa.",
    lead: "Bollería del día, tostadas en el pan que elijas, ensaladas y zumo de naranja natural, en la Gran Vía desde hace más de diez años.",
    rating: (v: string, n: string) => `${v} de 5 · ${n} reseñas en Google`,
    hours: "Lun–vie 7:30–21:00 · sáb 7:30–14:00 · dom 8:30–14:00",
    from: (price: string) => `Desayunos desde ${price} (pizarra de 2023)`,
    photoCaption: "La barra del ventanal, con la Gran Vía al otro lado del cristal.",
  },

  about: {
    eyebrow: "La casa",
    title: "Un obrador con cafetería en el Ensanche",
    lead: "Se desayuna en la barra del ventanal, en el banco bajo el lema de la pared o en la terraza, bajo los árboles de la Gran Vía. Abren a las 7:30; los domingos, a las 8:30.",
    photoCaption: "«Saborea la vida… sin prisa», en la pared de pino del salón.",
    points: [
      {
        title: "Del obrador",
        text: "Pastelería de elaboración propia —\u2060en su Instagram enseñan, paso a paso, cómo se hace su pastel de San Marcos— y una vitrina de bollería, empanadillas y pizza desde primera hora.",
      },
      {
        title: "Tu pan, tu tostada",
        text: "En el desayuno, la tostada va en pan blanco o de semillas, y por 0,20\u00a0€ más en pan de espelta y nueces, de centeno o de masa madre; las tostas de la carta, en estos tres últimos.",
      },
      {
        title: "Encargos y para llevar",
        text: "Llama, haz tu encargo y pasa a recogerlo: estará listo cuando llegues. Y si no te quedas, te lo ponen para llevar.",
      },
    ],
  },

  breakfast: {
    eyebrow: "Desayunos · hasta las 11:00",
    title: "El desayuno, como en su pizarra",
    lead: "Dos combinaciones fijas cada mañana, con café o té, zumo de naranja y tostada. Hasta las 11:00.",
    seen: (d: string) => `Precio de la pizarra en ${d}; confírmalo en el mostrador.`,
  },

  menu: {
    eyebrow: "La carta",
    title: "Salado, dulce y recién exprimido",
    lead: "Lo que dicen sus pizarras y las etiquetas de la vitrina, con la fecha en que se vio cada precio. La carta cambia con la temporada: la de hoy está en el mostrador.",
    tabsLabel: "Secciones de la carta",
    seen: (d: string, src: string) => `Precios vistos en ${d} · ${src}.`,
  },

  bakery: {
    eyebrow: "Del obrador",
    title: "La vitrina de cada mañana",
    lead: "Cruasanes de mantequilla, ensaimadas, napolitanas y empanadillas en bandejas de pino, con sus etiquetas de zigzag; al lado, tartas y dulces. Todas las fotos son de sus clientes.",
    featureCaption: "La vitrina de bollería en enero de 2024: ensaimadas, cruasanes de mantequilla y cruasanes con azúcar glas (los precios de hoy, en la carta).",
    tiles: {
      cruasan: "Cruasán de mantequilla",
      vitrinaEmpanadillas: "Empanadillas de ternera, pollo y espinacas",
      donut: "Panut de chocolate",
      tartaQueso: "Tarta de queso",
      cocaCalabaza: "Coca de calabaza",
      tulipa: "Postre de chocolate",
    } as Captions,
  },

  place: {
    eyebrow: "El local",
    title: "Pino, cubos y la Gran Vía",
    lead: "Paredes de pino con su lema, suelo hidráulico de cubos, barra de mármol y un ventanal a la avenida. Fuera, la terraza bajo los árboles.",
    captions: {
      rincon: "El banco del rincón, bajo el lema.",
      fachada: "La banderola «pan pan» y los cierres con su espiga.",
      ventanal: "Mesa alta junto al escaparate.",
      barra: "La barra, de noche.",
      terraza: "Terraza en la Gran Vía.",
      hornacinas: "Las hornacinas de pino del salón.",
      fachadaCalle: "La fachada en Gran Via del Marqués del Túria,\u00a051.",
      esquina: "El logotipo y el zigzag, en la esquina.",
    } as Captions,
  },

  reviews: {
    eyebrow: "Opiniones",
    title: "Lo que cuentan sus clientes",
    outOf: "de 5",
    basedOn: (n: string) => `${n} reseñas en Google`,
    histogram: "Reparto de estrellas",
    starsLabel: (n: number) => (n === 1 ? "1 estrella" : `${n} estrellas`),
    stars: (n: number) => `${n} de 5 estrellas`,
    topicsTitle: "Lo más mencionado",
    topicCount: (n: string) => `mencionado en ${n} reseñas`,
    topics: {
      products: "productos",
      croissant: "croissant",
      ambience: "ambiente",
      pastries: "bollería",
      salads: "ensaladas",
      bakery: "panadería",
      bocadillos: "bocadillos",
      toasts: "tostas",
      pizza: "pizza",
      staff: "empleadas",
    } satisfies Record<TopicKey, string>,
    readAll: "Leer todas en Google",
    googleNote: "Reseñas de Google en su idioma original, sin editar. Las buenas y las malas están allí.",
  },

  visit: {
    eyebrow: "Dónde y cuándo",
    title: "A pie de calle en la Gran Vía",
    near: "En el Ensanche (L'Eixample), en el tramo arbolado de la Gran Via del Marqués del Túria.",
    hours: "Horario",
    hoursNote: "Horario contrastado entre su ficha de Google, la puerta del local y su Instagram, que no siempre coinciden; en verano el horario de fin de semana cambia (un año, en junio, colgaron «Horario verano» en la puerta). Si vienes a última hora o en fin de semana, llama antes.",
    today: "Hoy",
    openNow: (until: string) => `Abierto ahora · hasta las ${until}`,
    closedNow: (from: string) => `Cerrado ahora · abre a las ${from}`,
    closedUntilTomorrow: (from: string) => `Cerrado ahora · abre mañana a las ${from}`,
    days: { mon: "Lunes", tue: "Martes", wed: "Miércoles", thu: "Jueves", fri: "Viernes", sat: "Sábado", sun: "Domingo" } satisfies Record<DayKey, string>,
    daysShort: { mon: "L", tue: "M", wed: "X", thu: "J", fri: "V", sat: "S", sun: "D" } satisfies Record<DayKey, string>,
    contact: "Dirección y contacto",
    orders: "Encargos",
    ordersText: (phone: string) => `Llama al ${phone}, haz tu encargo y pasa a recogerlo: estará listo cuando llegues.`,
    services: "En el local",
    serviceLabels: {
      dineIn: "Para tomar aquí",
      takeaway: "Para llevar",
      orders: "Encargos por teléfono",
      terrace: "Terraza en la Gran Vía",
      wifi: "Wifi gratis",
      aircon: "Aire acondicionado",
      wheelchair: "Entrada accesible en silla de ruedas",
      cards: "Tarjeta y pago con el móvil",
    } satisfies Record<ServiceKey, string>,
    noDelivery: "No hacen entregas a domicilio.",
    busyTitle: "Cuándo venir",
    busyPeak: (day: string, hour: string) => `${day}: la hora con más gente suele ser las ${hour}.`,
    busyCaption: (day: string) => `Afluencia por horas (0–100), ${day.toLowerCase()}`,
    busyValue: (v: number) => `${v} de 100`,
    busyNote: (from: number, to: number) => `Datos de Google. La gente suele quedarse de ${from} minutos a ${to === 60 ? "una hora" : `${to} minutos`}.`,
    loadMap: "Cargar el mapa",
    mapConsent: "Al cargar el mapa, Google puede instalar cookies.",
    mapTitle: "Mapa de PanPan Atelier",
    openMaps: "Abrir en Google Maps",
  },

  ctaBand: {
    title: "Pásate a desayunar sin prisa",
  },

  footer: {
    tagline: "Obrador y cafetería en la Gran Via del Marqués del Túria, Valencia.",
    links: "Enlaces",
    sources:
      "Datos: ficha y panel de Google (septiembre de 2026), sus pizarras, etiquetas de vitrina y tiques fotografiados por clientes, su Instagram y su web anterior. Fotos: clientes de PanPan en Google.",
  },

  notFound: {
    title: "Esta página no existe",
    home: "Volver al inicio",
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  htmlLang: "en",
  otherLocale: { code: "es", label: "ES", aria: "versión en español" },

  meta: {
    title: "PanPan Atelier · Bakery and café on the Gran Vía, Valencia",
    description:
      "Bakery-café on Valencia’s Gran Vía: the day’s pastries, breakfast until 11:00, toast, salads and fresh juice. Mon–Fri 7:30–21:00.",
  },

  nav: {
    skipToContent: "Skip to content",
    home: "PanPan Atelier, home",
    sections: "Sections",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    breakfast: "Breakfast",
    menu: "Menu",
    bakery: "Bakery",
    place: "The café",
    reviews: "Reviews",
    visit: "Where & when",
  },

  cta: {
    directions: "Directions",
    seeMenu: "See the menu",
    callLong: (n: string) => `Call ${n}`,
    newTab: "(opens in a new tab)",
  },

  hero: {
    eyebrow: "Bakery and café · Gran\u00a0Vía,\u00a0Valencia",
    claim: "Savour life… no rush.",
    lead: "The day’s pastries, toast on the bread of your choice, salads and fresh orange juice, on the Gran Vía for more than ten years.",
    rating: (v: string, n: string) => `${v} out of 5 · ${n} Google reviews`,
    hours: "Mon–Fri 7:30–21:00 · Sat 7:30–14:00 · Sun 8:30–14:00",
    from: (price: string) => `Breakfast from ${price} (2023 board)`,
    photoCaption: "The window counter, with the Gran Vía on the other side of the glass.",
  },

  about: {
    eyebrow: "About",
    title: "A bakery with a café in L'Eixample",
    lead: "Breakfast is at the window counter, on the bench under the slogan on the wall, or out on the terrace under the Gran Vía’s trees. They open at 7:30; on Sundays, at 8:30.",
    photoCaption: "“Saborea la vida… sin prisa” — savour life, no rush — on the pine wall of the café.",
    points: [
      {
        title: "From their own bakery",
        text: "Cakes and pastries made in-house — on Instagram they show, step by step, how their San Marcos cake is made — and a case of pastries, empanadillas and pizza from first thing in the morning.",
      },
      {
        title: "Your bread, your toast",
        text: "Breakfast toast comes on white or seeded bread, or for €0.20 more on spelt-and-walnut, rye or sourdough; the toasts on the menu come on those last three.",
      },
      {
        title: "Orders and takeaway",
        text: "Call, place your order and pick it up: it will be ready when you arrive. And if you can’t stay, they’ll pack it to take away.",
      },
    ],
  },

  breakfast: {
    eyebrow: "Breakfast · until 11:00",
    title: "Breakfast, as on their board",
    lead: "Two set combinations every morning, with coffee or tea, orange juice and toast. Until 11:00.",
    seen: (d: string) => `Price on the board in ${d}; check it at the counter.`,
  },

  menu: {
    eyebrow: "The menu",
    title: "Savoury, sweet and freshly squeezed",
    lead: "What their boards and display-case labels say, with the date each price was seen. The menu changes with the season: today’s is at the counter.",
    tabsLabel: "Menu sections",
    seen: (d: string, src: string) => `Prices seen in ${d} · ${src}.`,
  },

  bakery: {
    eyebrow: "From the bakery",
    title: "The morning display case",
    lead: "Butter croissants, ensaimadas, napolitanas and empanadillas on pine trays with their zigzag labels; next to them, cakes and sweets. Every photo was taken by their customers.",
    featureCaption: "The pastry case in January 2024: ensaimadas, butter croissants and icing-sugar croissants (current prices are in the menu).",
    tiles: {
      cruasan: "Butter croissant",
      vitrinaEmpanadillas: "Beef, chicken and spinach empanadillas",
      donut: "Chocolate panut (their doughnut)",
      tartaQueso: "Cheesecake",
      cocaCalabaza: "Pumpkin coca (Valencian sponge cake)",
      tulipa: "Chocolate dessert",
    } as Captions,
  },

  place: {
    eyebrow: "The café",
    title: "Pine, cubes and the Gran Vía",
    lead: "Pine walls with their slogan, a cube-pattern tiled floor, a marble counter and a big window onto the avenue. Outside, the terrace under the trees.",
    captions: {
      rincon: "The corner bench, under the slogan.",
      fachada: "The “pan pan” blade sign and the herringbone shutters.",
      ventanal: "A tall table by the shop window.",
      barra: "The counter at night.",
      terraza: "The terrace on the Gran Vía.",
      hornacinas: "The pine wall niches.",
      fachadaCalle: "The frontage at Gran Via del Marqués del Túria\u00a051.",
      esquina: "The logo and the zigzag on the corner.",
    } as Captions,
  },

  reviews: {
    eyebrow: "Reviews",
    title: "What their customers say",
    outOf: "out of 5",
    basedOn: (n: string) => `${n} Google reviews`,
    histogram: "Star breakdown",
    starsLabel: (n: number) => (n === 1 ? "1 star" : `${n} stars`),
    stars: (n: number) => `${n} out of 5 stars`,
    topicsTitle: "Most mentioned",
    topicCount: (n: string) => `mentioned in ${n} reviews`,
    topics: {
      products: "products",
      croissant: "croissant",
      ambience: "atmosphere",
      pastries: "pastries",
      salads: "salads",
      bakery: "bakery",
      bocadillos: "bocadillos",
      toasts: "toasts",
      pizza: "pizza",
      staff: "staff",
    } satisfies Record<TopicKey, string>,
    readAll: "Read them all on Google",
    googleNote: "Google reviews in their original language, unedited. The good and the bad are all there.",
  },

  visit: {
    eyebrow: "Where & when",
    title: "Right on the Gran Vía",
    near: "In L'Eixample, on the tree-lined stretch of the Gran Via del Marqués del Túria.",
    hours: "Opening hours",
    hoursNote: "Hours cross-checked between their Google listing, the sign on the door and their Instagram, which don’t always agree; weekend hours change in summer (one June they put up a “Horario verano” – summer hours – sign on the door). If you’re coming late in the day or at the weekend, call first.",
    today: "Today",
    openNow: (until: string) => `Open now · until ${until}`,
    closedNow: (from: string) => `Closed now · opens at ${from}`,
    closedUntilTomorrow: (from: string) => `Closed now · opens tomorrow at ${from}`,
    days: { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" },
    daysShort: { mon: "Mo", tue: "Tu", wed: "We", thu: "Th", fri: "Fr", sat: "Sa", sun: "Su" },
    contact: "Address and contact",
    orders: "Orders",
    ordersText: (phone: string) => `Call ${phone}, place your order and pick it up: it will be ready when you arrive.`,
    services: "At the café",
    serviceLabels: {
      dineIn: "Eat in",
      takeaway: "Takeaway",
      orders: "Phone orders",
      terrace: "Terrace on the Gran Vía",
      wifi: "Free wifi",
      aircon: "Air conditioning",
      wheelchair: "Wheelchair-accessible entrance",
      cards: "Cards and mobile payments",
    },
    noDelivery: "No home delivery.",
    busyTitle: "When to come",
    busyPeak: (day: string, hour: string) => `${day}: the busiest hour is usually ${hour}.`,
    busyCaption: (day: string) => `Visits by hour (0–100), ${day}`,
    busyValue: (v: number) => `${v} out of 100`,
    busyNote: (from: number, to: number) => `Google data. People usually stay between ${from} minutes and ${to === 60 ? "an hour" : `${to} minutes`}.`,
    loadMap: "Load the map",
    mapConsent: "Loading the map lets Google set cookies.",
    mapTitle: "Map of PanPan Atelier",
    openMaps: "Open in Google Maps",
  },

  ctaBand: {
    title: "Come for an unhurried breakfast",
  },

  footer: {
    tagline: "Bakery and café on the Gran Via del Marqués del Túria, Valencia.",
    links: "Links",
    sources:
      "Data: Google listing and panel (September 2026), their boards, display-case labels and receipts photographed by customers, their Instagram and their previous website. Photos: PanPan customers on Google.",
  },

  notFound: {
    title: "This page doesn’t exist",
    home: "Back to home",
  },
};

const dictionaries: Record<Locale, Dictionary> = { es, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];
