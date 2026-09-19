/**
 * Отзывы для витрины: 6 испанских и 6 английских, в оригинале и целиком.
 * Корпус — все 510 отзывов из панели Google Поиска (`_data/maps/reviews-all.json`, 18.09.2026)
 * и полные тексты Maps (`_data/maps/reviews-es-relevant.json`). Не взяты: обрезанные «…»,
 * отзывы, где главное — имя сотрудницы, и переводы Google. Один отзыв 4★ оставлен намеренно;
 * жалобы на обслуживание и очереди честно видны в гистограмме и в Google, а не спрятаны.
 * Автор — имя и инициал. Дата: месяц, если отзыву меньше года (Google даёт «hace N meses»);
 * старше — диапазон лет: на 09.2026 «hace un año» = 2024–2025, «2 años» = 2023–2024, «3 años» = 2022–2023.
 */
export type Review = { id: string; author: string; stars: number; date: string; text: string };

export const reviews: Record<"es" | "en", Review[]> = {
  es: [
    {
      id: "aleksandra",
      author: "Aleksandra K.",
      stars: 5,
      date: "2025-11",
      text: "Uno de mis sitios favoritos para desayunar sin prisa y disfrutar un buen café. Recomiendo",
    },
    {
      id: "luz",
      author: "Luz C.",
      stars: 5,
      date: "2026-07",
      text: "Excelente y gustosa panadería todo muy bien hecho y las camareras muy atentas además de estar muy organizado y limpio",
    },
    {
      id: "nando",
      author: "Nando P.",
      stars: 4,
      date: "2026-02",
      text: "Sitio tranquilo para tomar un desayuno, tiene variedad tanto de dulce como de salado incluyendo ensaladas, zumos etc..\nRecomendable",
    },
    {
      id: "cristina",
      author: "Cristina G.",
      stars: 5,
      date: "2024–2025",
      text: "Excelente trato por parte de todas las chicas, bollería muy rica y siempre atentas, vengo cada día y lo recomiendo 100%",
    },
    {
      id: "asuncion",
      author: "Asunción G.",
      stars: 5,
      date: "2022–2023",
      text: "La coca de calabaza espectacular, el café con leche de avena buenísimo, probé también la calabaza asada que me encantó, pero sobre todo la amabilidad y cordialidad de la camarera. Un diez para el trato que recibimos.",
    },
    {
      id: "estela",
      author: "Estela G.",
      stars: 5,
      date: "2022–2023",
      text: "Me encantó el lugar, muy acogedor, buen servicio, buenos precios ( no como otros hornos que los elevan muchísimo) y la comida estaba buenisima. Yo recomiendo los croissants pequeños rellenos de chocolate.",
    },
  ],
  en: [
    {
      id: "meral",
      author: "Meral E.",
      stars: 5,
      date: "2026-04",
      text: "If you wanna eat fresh ,delicious and healthy pastry,good place for eating breakfast,highly recommend.Staffs are friendly,toilets are clean.Price is avarage.thank you🌺",
    },
    {
      id: "janet",
      author: "Janet R.",
      stars: 5,
      date: "2024–2025",
      text: "I had a wonderful breakfast and sat inside. Staff were quick, efficient and friendly. I’m making it one of my favorite places to meet friends.",
    },
    {
      id: "mohammad",
      author: "Mohammad E.",
      stars: 5,
      date: "2023–2024",
      text: "A beautiful spot for breakfast, brunch, and coffee.\n\nI had a great Cafe con Leche, and some delicious pastries.\n\nYou can find delicious baked goods and more.\n\nEverything is freshly baked and prepared.\n\nHighly recommended.",
    },
    {
      id: "rodrigo",
      author: "Rodrigo T.",
      stars: 5,
      date: "2023–2024",
      text: "Lovely staff, delicious bread and nice environment. The desayuno mediterraneo with avocado 🥑 topping on the regular bread 🥖 is delicious. Strongly recommend this place.",
    },
    {
      id: "stephanie",
      author: "Stephanie",
      stars: 5,
      date: "2022–2023",
      text: "The best sandwich club I ever ate. I lived in Valencia for two months and I ordered it 15 times because it is so good. The prices are amazing too!",
    },
    {
      id: "mark",
      author: "Mark D.",
      stars: 5,
      date: "2022–2023",
      text: "One of the best coffee shops we visited in Valencia. Amazing coffee, friendly staff, reasonable prices, pleasant surroundings and nice cheesecake. Ticked all the boxes.",
    },
  ],
};
