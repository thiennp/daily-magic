import type { Pitfall } from "../../public-api/types";
import { capPitfallsForBot } from "./formatPitfallsForBot";

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
 * Pure keyword match (no Ollama). Miss → []. Hit → capped bot list.
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

  return capPitfallsForBot(scored.map((row) => row.pitfall));
};
