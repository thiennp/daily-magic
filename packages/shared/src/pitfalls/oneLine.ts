/** Collapse whitespace/newlines to a single trimmed line. */
export const oneLine = (text: string): string =>
  text.replace(/\s+/g, " ").trim();
