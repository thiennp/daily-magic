/** Lowercase, punctuation-free, single-spaced: the dedupe key for a task title. */
export const normalizeTaskTitle = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
