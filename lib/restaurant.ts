/**
 * Факты о PanPan Atelier (Gran Via del Marqués del Túria, 51).
 * Источники: карточка Google Maps (`0xd6048b680fb2875:0x5a50d7ac5ee24336`, снята
 * 18.09.2026 → `_data/maps/`), панель Google Поиска (510 отзывов, «Horas punta»),
 * их Instagram и старый сайт на DISH (`_data/web/`). Ничего не выдумано: если поля в
 * источнике нет, его нет и здесь. Расхождения решены в DESIGN.md §2–3.
 */

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export const DAYS: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export type Shift = { opens: string; closes: string };

/**
 * Часы сведены из пяти источников (DESIGN.md §2.2): будни 7:30–21:00, суббота 7:30–14:00,
 * воскресенье 8:30–14:00. Карточка Google (не подтверждена владельцем) пишет будни до 21:30 и
 * воскресенье с 7:30, но её же «Horas punta» дают ноль посетителей в 21:00 по будням и в 7:00 по
 * воскресеньям; табличка на двери (09.2023), Instagram и сайт DISH — до 21:00, воскресенье с 8:30.
 * Закрытие в выходные в 14:00 — по карточке и «Horas punta» (после 14:00 пусто).
 */
export const venueHours: { day: DayKey; shifts: Shift[] }[] = DAYS.map((day) => ({
  day,
  shifts: [day === "sun" ? { opens: "8:30", closes: "14:00" } : { opens: "7:30", closes: day === "sat" ? "14:00" : "21:00" }],
}));

export const restaurant = {
  name: "PanPan Atelier",
  /** Как на вывеске: «pan pan» строчными в две строки. */
  shortName: "PanPan",

  address: {
    street: "Gran Via del Marqués del Túria, 51",
    district: "L'Eixample",
    /** Их тики (2024), пакетики сахара и сайт DISH — 46005; карточка Google пишет 46004 (DESIGN.md §2.4). */
    postalCode: "46005",
    city: "València",
    region: "Comunitat Valenciana",
    country: "ES",
  },

  geo: { lat: 39.4674636, lng: -0.3685427 },
  plusCode: "8CFXFJ8J+XH",

  /** Карточка Google, их Instagram («Encargos: 963 06 08 11») и сайт DISH — один номер. */
  phone: { display: "963\u00a006\u00a008\u00a011", tel: "+34963060811" },

  instagram: { handle: "panpanatelier", url: "https://www.instagram.com/panpanatelier/" },
  facebook: { url: "https://www.facebook.com/panpanatelier/" },

  /** Короткая ссылка — та, что прислал заказчик; ведёт на эту карточку (place id ChIJdSj7gLZIYA0RNkPiXqzXUFo). */
  googleMapsUrl: "https://maps.app.goo.gl/aU2HVCUi5Es3umQV9",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=PanPan+Atelier%2C+Gran+Via+del+Marqu%C3%A9s+del+T%C3%BAria+51%2C+46005+Val%C3%A8ncia&destination_place_id=ChIJdSj7gLZIYA0RNkPiXqzXUFo",
  googleMapsEmbedQuery: "PanPan+Atelier,+Gran+Via+del+Marqu%C3%A9s+del+T%C3%BAria,+51,+46005+Val%C3%A8ncia",

  rating: {
    value: 4.3,
    count: 510,
    /** Распределение звёзд из карточки (`[175][3]`, там 1★→5★), здесь от 5 к 1; сумма = 510. */
    histogram: [
      { stars: 5, count: 323 },
      { stars: 4, count: 108 },
      { stars: 3, count: 36 },
      { stars: 2, count: 13 },
      { stars: 1, count: 30 },
    ],
  },

  /** Темы отзывов Google (`[153]`) с числом упоминаний — все десять, как есть. */
  topics: [
    { key: "products", count: 29 },
    { key: "croissant", count: 16 },
    { key: "ambience", count: 14 },
    { key: "pastries", count: 11 },
    { key: "salads", count: 11 },
    { key: "bakery", count: 11 },
    { key: "bocadillos", count: 7 },
    { key: "toasts", count: 6 },
    { key: "pizza", count: 5 },
    { key: "staff", count: 5 },
  ],

  /** Карточка и панель Поиска: «1-10 € por persona · Notificado por 19 personas» (15 из 19 — 1–10 €). */
  pricePerPerson: { from: 1, to: 10, reports: 19 },

  /**
   * «Horas punta» Google (`[84]`): загрузка 0–100 по часам, 7:00–20:00. Индексы Google 1–7 =
   * пн–вс. Нули в часы, когда закрыто, отброшены. Плюс «La gente suele pasar de 25 minutos a 1 hora».
   */
  popularTimes: {
    mon: [62, 68, 72, 79, 94, 82, 88, 68, 60, 46, 56, 65, 66, 42],
    tue: [50, 57, 65, 72, 71, 65, 52, 36, 42, 50, 71, 71, 63, 52],
    wed: [46, 55, 50, 56, 63, 57, 56, 49, 53, 47, 53, 75, 81, 69],
    thu: [31, 44, 57, 69, 76, 73, 72, 65, 60, 59, 57, 52, 47, 40],
    fri: [43, 78, 94, 89, 79, 68, 60, 59, 53, 56, 69, 75, 68, 52],
    sat: [27, 31, 55, 81, 100, 76, 55],
    sun: [0, 39, 52, 65, 71, 76, 66],
  } satisfies Record<DayKey, number[]>,
  popularFrom: 7,
  typicalStay: { from: 25, to: 60 },

  /**
   * Атрибуты карточки `[100]` (флаг 1 = да): comer allí, para llevar, acceso para sillas de ruedas,
   * NFC, tarjetas de crédito y débito, aparcamiento en la calle (de pago y gratuito); доставки нет.
   * С их сайта DISH: aire acondicionado, terraza, wifi gratis. Терраса видна на фото гостей.
   */
  services: ["dineIn", "takeaway", "orders", "terrace", "wifi", "aircon", "wheelchair", "cards"] as const,
  delivery: false,

  hours: venueHours,
} as const;

export type TopicKey = (typeof restaurant.topics)[number]["key"];
export type ServiceKey = (typeof restaurant.services)[number];
