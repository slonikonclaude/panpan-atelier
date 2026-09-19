/**
 * Текст словаря с вкраплениями другого языка: `[[es:Horario verano]]` → <span lang="es">…</span>.
 * Нужен на английской странице, где цитируются испанские надписи заведения (WCAG 3.1.2):
 * скринридер читает их испанским произношением. Без маркеров возвращает строку как есть.
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\[\[([a-z]{2}):([^\]]+)\]\]/);
  if (parts.length === 1) return <>{text}</>;
  const out = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) out.push(parts[i]);
    if (i + 2 < parts.length)
      out.push(
        <span key={i} lang={parts[i + 1]}>
          {parts[i + 2]}
        </span>,
      );
  }
  return <>{out}</>;
}
