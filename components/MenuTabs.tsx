"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";
import { Img } from "@/components/Img";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { formatMonth, formatPrice } from "@/lib/format";
import type { MenuSection } from "@/lib/menu";
import { photos } from "@/lib/photos";

/**
 * Вкладки карты (DESIGN.md §7.4). Настоящий tablist: стрелки ←/→, Home/End, фокус
 * переезжает вместе с выбором. Лента вкладок липкая внутри секции — поэтому у секции
 * `overflow-x-clip`, а не `overflow-hidden` (hidden сломал бы sticky).
 *
 * Все панели есть в HTML (неактивные — `hidden`): без JS, при печати и для поисковиков карта
 * видна целиком (правила в RootShell и globals.css, заголовок панели — из `data-title`).
 * При смене вкладки из глубины длинного списка страница возвращается к началу карты (лента
 * «прилипла» поверх панели — значит, её начало выше экрана), а выбранная вкладка въезжает в ленту.
 *
 * Первая панель приходит из SSR без анимации (motion вписал бы opacity:0 в HTML);
 * проявление — только после первой смены вкладки, и только opacity/transform.
 */
export function MenuTabs({ locale, sections }: { locale: Locale; sections: MenuSection[] }) {
  const m = getDictionary(locale).menu;
  const [active, setActive] = useState(sections[0].id);
  const [changed, setChanged] = useState(false);
  const reduced = useReducedMotion();
  const base = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const select = (id: string, focus = false) => {
    if (id === active) return;
    const strip = stripRef.current;
    const panel = document.getElementById(`${base}-panel-${active}`);
    const stuck = strip && panel && panel.getBoundingClientRect().top < strip.getBoundingClientRect().bottom - 1;
    setActive(id);
    setChanged(true);
    const tab = document.getElementById(`${base}-tab-${id}`);
    if (focus) tab?.focus();
    tab?.scrollIntoView({ inline: "nearest", block: "nearest", behavior: reduced ? "auto" : "smooth" });
    if (stuck) rootRef.current?.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" });
  };

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = sections.length;
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % n;
    else if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    select(sections[next].id, true);
  };

  const p = (v: number) => formatPrice(v, locale);

  const content = (section: MenuSection) => {
    const photo = section.photo ? photos[section.photo] : null;
    return (
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-14">
        <div className="flex flex-col gap-5">
          {photo ? (
            <div className="overflow-hidden rounded-[1.5rem] bg-pine">
              <Img photo={photo} locale={locale} sizes="(min-width: 1024px) 480px, 92vw" className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]" />
            </div>
          ) : null}
          {section.note?.[locale] ? <p className="text-[0.95rem] text-muted">{section.note[locale]}</p> : null}
          <p className="text-[0.85rem] text-muted">{m.seen(formatMonth(section.seen, locale), section.source[locale])}</p>
        </div>

        <ul className="flex flex-col">
          {section.items.map((it) => (
            <li key={it.id} className="border-b border-line py-4 first:pt-0 last:border-b-0">
              <div className="flex items-baseline gap-3">
                <h3 className="min-w-0 font-display text-[1.25rem] leading-snug text-cocoa sm:text-[1.35rem]">{it.name[locale]}</h3>
                {it.prices.length === 1 && !it.prices[0].label ? (
                  <>
                    <span aria-hidden="true" className="leader" />
                    <span className="tabular shrink-0 font-bold text-cocoa">
                      {p(it.prices[0].value)}
                      <Year seen={it.prices[0].seen} />
                    </span>
                  </>
                ) : null}
              </div>
              {it.desc?.[locale] ? <p className="mt-1 max-w-[60ch] text-[0.95rem] text-muted">{it.desc[locale]}</p> : null}
              {it.prices.length > 1 || (it.prices.length === 1 && it.prices[0].label) ? (
                <p className="tabular mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[0.95rem] text-cocoa">
                  {it.prices.map((pr) => (
                    <span key={pr.label?.[locale] ?? "x"} className="whitespace-nowrap">
                      {pr.label ? <span className="text-muted">{pr.label[locale]} </span> : null}
                      <span className="font-bold">{p(pr.value)}</span>
                      <Year seen={pr.seen} />
                    </span>
                  ))}
                </p>
              ) : null}
              {it.note?.[locale] ? <p className="mt-1 text-[0.85rem] text-muted">{it.note[locale]}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div ref={rootRef}>
      <div ref={stripRef} className="sticky top-18 z-20 -mx-5 border-b border-line bg-flour/95 px-5 backdrop-blur-md sm:-mx-8 sm:px-8">
        <div
          role="tablist"
          aria-label={m.tabsLabel}
          className="-mb-px flex gap-1 overflow-x-auto py-2 [scrollbar-width:none] pointer-fine:[scrollbar-width:thin]"
        >
          {sections.map((s, i) => {
            const selected = s.id === active;
            return (
              <button
                key={s.id}
                id={`${base}-tab-${s.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${base}-panel-${s.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(s.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={`inline-flex min-h-11 shrink-0 cursor-pointer items-center whitespace-nowrap rounded-full px-4 text-[0.95rem] font-bold transition-colors duration-200 focus-visible:outline-offset-[-4px] ${
                  selected ? "bg-cocoa text-on-dark focus-visible:outline-on-dark" : "text-cocoa hover:bg-pine"
                }`}
              >
                {s.title[locale]}
              </button>
            );
          })}
        </div>
      </div>

      {sections.map((s) => {
        const isActive = s.id === active;
        return (
          <div
            key={s.id}
            id={`${base}-panel-${s.id}`}
            role="tabpanel"
            aria-labelledby={`${base}-tab-${s.id}`}
            data-title={s.title[locale]}
            tabIndex={0}
            hidden={!isActive}
            className="menu-panel pt-10 focus-visible:outline-offset-8"
          >
            {isActive && changed && !reduced ? (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                {content(s)}
              </motion.div>
            ) : (
              content(s)
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Год рядом с ценой, если она заметно старше даты раздела (lib/menu.ts, DESIGN.md §3).
 * Мелкое «(2023)» читается и глазами, и скринридером как часть цены.
 */
function Year({ seen }: { seen?: string }) {
  if (!seen) return null;
  return <span className="ml-1 text-[0.78rem] font-normal text-muted">({seen.slice(0, 4)})</span>;
}
