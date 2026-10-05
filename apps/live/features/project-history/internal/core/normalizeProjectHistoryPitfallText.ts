/**
 * Normalize pitfall text for dedupe: trim, lowercase, collapse whitespace,
 * strip trailing punctuation.
 */
export const normalizeProjectHistoryPitfallText = (text: string): string =>
  text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.,;:!?]+$/g, "");
