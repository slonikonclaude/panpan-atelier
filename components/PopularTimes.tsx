"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { DAYS, restaurant, type DayKey } from "@/lib/restaurant";

/**
 * «Cuándo venir» — загрузка по часам из «Horas punta» Google (DESIGN.md §7.8).
 * Вкладки дней — настоящий tablist (стрелки, Home/End); столбики — декор, смысл
 * дублируется текстом: подпись самого людного часа и скрытая таблица для скринридеров.
 * Сегодняшний день (по Мадриду) берётся через useSyncExternalStore: на сервере и при
 * гидратации — понедельник (снимок сервера null), сразу после — сегодняшний; без setState в эффекте.
 */

const WEEKDAY: Record<string, DayKey> = { Mon: "mon", Tue: "tue", Wed: "wed", Thu: "thu", Fri: "fri", Sat: "sat", Sun: "sun" };

function madridDay(): DayKey {
  const wd = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Madrid", weekday: "short" }).format(new Date());
  return WEEKDAY[wd] ?? "mon";
}

const noSubscribe = () => () => {};

export function PopularTimes({ locale }: { locale: Locale }) {
  const v = getDictionary(locale).visit;
  const today = useSyncExternalStore(noSubscribe, madridDay, () => null);
  const [picked, setDay] = useState<DayKey | null>(null);
  const day: DayKey = picked ?? today ?? "mon";
  const base = useId();

  const values = restaurant.popularTimes[day];
  const from = restaurant.popularFrom;
  const peak = values.indexOf(Math.max(...values));

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % DAYS.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + DAYS.length) % DAYS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = DAYS.length - 1;
    else return;
    e.preventDefault();
    setDay(DAYS[next]);
    document.getElementById(`${base}-tab-${DAYS[next]}`)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={v.busyTitle} className="flex flex-wrap gap-1.5">
        {DAYS.map((d, i) => {
          const selected = d === day;
          return (
            <button
              key={d}
              id={`${base}-tab-${d}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${base}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setDay(d)}
              onKeyDown={(e) => onKey(e, i)}
              className={`inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full border px-3 text-[0.9rem] font-bold transition-colors duration-200 ${
                selected ? "border-cocoa bg-cocoa text-on-dark" : "border-line text-cocoa hover:border-cocoa"
              }`}
            >
              <span aria-hidden="true">{v.daysShort[d]}</span>
              <span className="sr-only">{v.days[d]}</span>
            </button>
          );
        })}
      </div>

      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${day}`} className="mt-6">
        <p className="tabular text-cocoa">{v.busyPeak(v.days[day], `${from + peak}:00`)}</p>
        <div aria-hidden="true" className="mt-5 flex h-36 items-end gap-1.5 border-b border-line">
          {values.map((value, i) => (
            <div key={i} className="flex h-full flex-1 flex-col justify-end">
              <span
                className={`block w-full rounded-t-md ${i === peak ? "bg-crust-deep" : "bg-muted/70"}`}
                style={{ height: `${Math.max(value, 3)}%` }}
              />
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="tabular mt-2 flex gap-1.5 text-[0.75rem] text-muted">
          {values.map((_, i) => (
            <span key={i} className="flex-1 text-center">
              {(from + i) % 3 === 0 ? `${from + i}` : ""}
            </span>
          ))}
        </div>
        {/* sr-only — на обёртке: сама <table> не сжимается уже содержимого и растянула бы страницу на телефоне. */}
        <div className="sr-only">
        <table>
          <caption>{v.busyCaption(v.days[day])}</caption>
          <tbody>
            {values.map((value, i) => (
              <tr key={i}>
                <th scope="row">{`${from + i}:00`}</th>
                <td>{v.busyValue(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <p className="mt-4 text-[0.92rem] text-muted">{v.busyNote(restaurant.typicalStay.from, restaurant.typicalStay.to)}</p>
      </div>
    </div>
  );
}
