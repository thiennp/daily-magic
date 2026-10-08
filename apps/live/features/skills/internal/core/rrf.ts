export const RRF_K = 60;

/**
 * Reciprocal rank fusion: each ranking lists ids best-first; an id's score is
 * the sum of 1 / (k + rank). Returns ids with scores, best first.
 */
export const fuseRankings = (
  rankings: readonly (readonly string[])[],
  k: number = RRF_K,
): { readonly id: string; readonly score: number }[] => {
  const scores = new Map<string, number>();
  for (const ranking of rankings) {
    ranking.forEach((id, index) => {
      scores.set(id, (scores.get(id) ?? 0) + 1 / (k + index + 1));
    });
  }
  return [...scores.entries()]
    .map(([id, score]) => ({ id, score }))
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
};
