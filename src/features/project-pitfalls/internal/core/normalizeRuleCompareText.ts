/** Lowercase, strip non-alphanumeric to spaces, collapse whitespace. Pure. */
export const normalizeRuleCompareText = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
