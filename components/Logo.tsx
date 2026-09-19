import type { CSSProperties } from "react";
import { withBase } from "@/lib/basePath";

/**
 * Вордмарк «pan / pan» — их настоящий знак, вырезанный маской из снимка вывески в зале
 * (буквы светлые на шоколадной стене → альфа по яркости, `_photos/logo-white.png`).
 * Верхнее «pan» тоньше нижнего — как на вывеске. Цвет — currentColor (DESIGN.md §4).
 * Подпись для скринридеров — в `label`: сам знак декоративный.
 */
export function Wordmark({
  height,
  className = "",
  markClassName = "",
  label,
}: {
  /** Высота в px; без неё высоту задаёт `markClassName` (адаптивно). */
  height?: number;
  className?: string;
  markClassName?: string;
  label?: string;
}) {
  const style = { height, "--wordmark": `url("${withBase("/brand/logo-960.webp")}")` } as CSSProperties;
  return (
    <span className={`inline-flex ${className}`}>
      <span aria-hidden="true" className={`wordmark-mask ${markClassName}`} style={style} />
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}

/**
 * Зигзаг-«колос» под вордмарком: параллельные зигзаги, обрезанные квадратом, — сверху
 * остаются отдельные «V», снизу «^», как на фасаде и на стене зала. Идентичность
 * PanPan, по их графике 2010 года, построена на колосе пшеницы (DESIGN.md §4).
 * Геометрия подобрана наложением на снимок вывески (`_data/scripts/espiga.mjs`).
 */
const zigzagRows = (rows: number, amp: number, step: number, offset: number) =>
  Array.from({ length: rows }, (_, k) => {
    const peak = offset + k * step;
    return Array.from({ length: 7 }, (_, j) => `${((j * 100) / 6).toFixed(2)},${j % 2 ? peak + amp : peak}`).join(" ");
  });

/** Полный знак: 9 рядов, как на вывеске. Мелкий (< 32 px): 4 ряда толще — иначе рисунок сливается в пятно. */
const FULL = zigzagRows(9, 12, 12.5, -5);
const COMPACT = zigzagRows(4, 22, 30, -6);

export function Espiga({ size = 64, className = "", strokeWidth }: { size?: number; className?: string; strokeWidth?: number }) {
  const compact = size < 32;
  const rows = compact ? COMPACT : FULL;
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" width={size} height={size} className={`shrink-0 overflow-hidden ${className}`} focusable="false">
      {/* Обрезку квадратом делает сам <svg> (overflow: hidden у встроенного svg) — без clipPath и его id. */}
      <g fill="none" stroke="currentColor" strokeWidth={strokeWidth ?? (compact ? 11 : 3.8)} strokeLinejoin="miter" strokeMiterlimit={10}>
        {rows.map((points) => (
          <polyline key={points} points={points} />
        ))}
      </g>
    </svg>
  );
}

/**
 * Полоса-разделитель: один ряд зигзага во всю ширину — «строчка» колоса между
 * блоками. Растягивается по ширине (preserveAspectRatio none), толщина линии не
 * искажается благодаря vector-effect.
 */
export function EspigaRule({ className = "" }: { className?: string }) {
  const teeth = 24;
  const pts = Array.from({ length: teeth * 2 + 1 }, (_, j) => `${(j * 100) / (teeth * 2)},${j % 2 ? 9 : 1}`).join(" ");
  return (
    <svg aria-hidden="true" viewBox="0 0 100 10" preserveAspectRatio="none" className={`block h-2.5 w-full ${className}`} focusable="false">
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
