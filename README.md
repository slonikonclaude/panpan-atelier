# PanPan Atelier — сайт обрадора-кафетерии

Двуязычный лендинг PanPan Atelier (Gran Via del Marqués del Túria, 51 — L'Eixample,
València): испанский в корне, английский в `/en/`. Next.js со статическим экспортом,
публикация на GitHub Pages через `.github/workflows/deploy.yml`.

Адрес: https://slonikonclaude.github.io/panpan-atelier/

## Команды

```
npm run dev          # локально (в папке «Рестораны» — порт 3390, .claude/launch.json)
npm run build        # статический экспорт в out/
npm run photos       # _photos/ → WebP 800/1600 в public/photos, вордмарк → public/brand
npm run check:menu   # сверка цен сайта с итоговой картой (_data/menu-text/menu-final.json)
node scripts/make-icons.mjs   # иконки app/ и превью public/og.jpg
```

## Где что лежит

- `DESIGN.md` — источники, расхождения (три версии часов, поколения досок, правило цен), дизайн-решения.
- `lib/restaurant.ts` — факты карточки Google; `lib/menu.ts` — карта и цены с датами;
  `lib/reviews.ts` — отзывы для витрины; `lib/photos.ts` — снимки; `lib/dictionaries.ts` — тексты ES/EN.
- `_data/` — сырьё: карточка и отзывы Google, каталог 218 фото, 72 прочтения досок/ценников/тиков,
  сведённая карта, Instagram, прежний сайт, скрипты сбора (`_data/scripts/`). Фото в полном размере
  и кропы в репозиторий не входят (лица гостей, тики) — восстанавливаются скриптами по ссылкам.
