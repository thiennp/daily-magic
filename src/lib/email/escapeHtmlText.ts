const HTML_TEXT_ESCAPE_MAP: Readonly<Record<string, string>> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export default function escapeHtmlText(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) => HTML_TEXT_ESCAPE_MAP[character],
  );
}
