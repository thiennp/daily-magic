import { CHECK_CONTEXT_TIP_MAX_LINES } from "@agent-witch/shared/token-saver";

import type { Pitfall } from "../../public-api/types";

const normalizeHaystack = (text: string): string => text.toLowerCase();

/** Count how many keywords appear as substrings in the haystack. */
export const scorePitfallKeywords = (
  haystack: string,
  keywords: readonly string[],
): number => {
  const normalized = normalizeHaystack(haystack);
  return keywords.reduce((score, keyword) => {
    const needle = keyword.trim().toLowerCase();
    if (needle.length === 0) {
      return score;
    }
    return normalized.includes(needle) ? score + 1 : score;
  }, 0);
};

/**
 * Pure keyword match (no Ollama). Miss → []. Hit → top
 * `CHECK_CONTEXT_TIP_MAX_LINES` rows; the token budget lives in the shared tip.
 */
export const matchPitfallsByKeywords = (input: {
  readonly pitfalls: readonly Pitfall[];
  readonly text: string;
}): readonly Pitfall[] => {
  const scored = input.pitfalls
    .map((pitfall) => ({
      pitfall,
      score: scorePitfallKeywords(input.text, pitfall.keywords),
    }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.pitfall.id.localeCompare(b.pitfall.id));

  if (scored.length === 0) {
    return [];
  }

  return scored
    .slice(0, CHECK_CONTEXT_TIP_MAX_LINES)
    .map((row) => row.pitfall);
};
