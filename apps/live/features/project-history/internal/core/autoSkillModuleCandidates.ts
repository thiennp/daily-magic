import {
  MODULE_CANDIDATES_TOP_K,
  MODULE_MIN_COSINE,
  MODULE_MIN_JACCARD,
} from "./autoSkillModule.constants";
import type { StoredModule } from "./autoSkillModuleDb";

export const cosineSimilarity = (a: Float32Array, b: Float32Array): number => {
  if (a.length !== b.length || a.length === 0) {
    return 0;
  }
  const sums = a.reduce(
    (acc, x, i) => ({
      dot: acc.dot + x * (b[i] ?? 0),
      na: acc.na + x * x,
      nb: acc.nb + (b[i] ?? 0) ** 2,
    }),
    { dot: 0, na: 0, nb: 0 },
  );
  return sums.na === 0 || sums.nb === 0
    ? 0
    : sums.dot / Math.sqrt(sums.na * sums.nb);
};

const tokenSet = (text: string): ReadonlySet<string> =>
  new Set(text.split(" ").filter((t) => t.length > 2 && t !== "<param>"));

export const jaccardSimilarity = (left: string, right: string): number => {
  const a = tokenSet(left);
  const b = tokenSet(right);
  const shared = [...a].filter((t) => b.has(t)).length;
  return a.size + b.size === 0 ? 0 : shared / (a.size + b.size - shared);
};

/**
 * Top neighbours (one per cluster): embedding cosine when both vectors
 * exist, otherwise Jaccard on canonical tokens. Only they reach the judge.
 */
export const pickModuleCandidates = (
  canonical: string,
  vector: Float32Array | null,
  stored: readonly StoredModule[],
): StoredModule[] => {
  const scored = stored
    .map((m) => {
      const useVec = vector !== null && m.vector !== null;
      const score = useVec
        ? cosineSimilarity(vector, m.vector as Float32Array)
        : jaccardSimilarity(canonical, m.text);
      return { m, score, min: useVec ? MODULE_MIN_COSINE : MODULE_MIN_JACCARD };
    })
    .filter((row) => row.score >= row.min)
    .sort((x, y) => y.score - x.score);
  const seen = new Set<string>();
  return scored
    .filter(({ m }) => !seen.has(m.clusterId) && !!seen.add(m.clusterId))
    .slice(0, MODULE_CANDIDATES_TOP_K)
    .map(({ m }) => m);
};
