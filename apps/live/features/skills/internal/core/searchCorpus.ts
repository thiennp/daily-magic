import { buildBm25Index, tokenizeForSearch, type Bm25Index } from "./bm25";
import { fuseRankings } from "./rrf";
import type { IndexedSkill, SkillHit } from "./skillIndex.types";

/** Candidates each retriever contributes before fusion. */
const RETRIEVER_DEPTH = 20;
/** Cosine below this is noise, not a match. */
const MIN_COSINE = 0.35;

export type SkillCorpus = {
  readonly skills: readonly IndexedSkill[];
  readonly bm25: Bm25Index;
  /** Unit-length vectors (null: keyword-only skill). */
  readonly unit: readonly (Float32Array | null)[];
};

const toUnit = (v: Float32Array | null): Float32Array | null => {
  if (v === null) {
    return null;
  }
  let sum = 0;
  for (const x of v) {
    sum += x * x;
  }
  const norm = Math.sqrt(sum);
  return norm === 0 ? null : v.map((x) => x / norm);
};

/** Weighted document text: name counts most, then keywords. */
const docTokens = (s: IndexedSkill): string[] => [
  ...tokenizeForSearch(s.name),
  ...tokenizeForSearch(s.name),
  ...tokenizeForSearch(s.keywords),
  ...tokenizeForSearch(s.keywords),
  ...tokenizeForSearch(s.description),
  ...tokenizeForSearch(s.whenToUse),
];

export const buildSkillCorpus = (
  skills: readonly IndexedSkill[],
): SkillCorpus => ({
  skills,
  bm25: buildBm25Index(skills.map(docTokens)),
  unit: skills.map((s) => toUnit(s.vector)),
});

const topIndexes = (
  scores: ArrayLike<number>,
  min: number,
  depth: number,
): number[] =>
  Array.from({ length: scores.length }, (_, i) => i)
    .filter((i) => scores[i]! > min)
    .sort((a, b) => scores[b]! - scores[a]!)
    .slice(0, depth);

const cosineScores = (
  corpus: SkillCorpus,
  query: Float32Array,
): Float64Array => {
  const q = toUnit(query);
  const out = new Float64Array(corpus.skills.length);
  if (q === null) {
    return out;
  }
  corpus.unit.forEach((v, i) => {
    if (v === null || v.length !== q.length) {
      return;
    }
    let dot = 0;
    for (let d = 0; d < v.length; d += 1) {
      dot += v[d]! * q[d]!;
    }
    out[i] = dot;
  });
  return out;
};

/** BM25 (+ cosine when a query vector exists) fused with RRF; best first. */
export const searchSkillCorpus = (
  corpus: SkillCorpus,
  input: { query: string; queryVector: Float32Array | null; k: number },
): SkillHit[] => {
  const bm25 = corpus.bm25.score(tokenizeForSearch(input.query));
  const rankings = [topIndexes(bm25, 0, RETRIEVER_DEPTH)];
  if (input.queryVector !== null) {
    rankings.push(
      topIndexes(
        cosineScores(corpus, input.queryVector),
        MIN_COSINE,
        RETRIEVER_DEPTH,
      ),
    );
  }
  return fuseRankings(rankings.map((r) => r.map(String)))
    .slice(0, input.k)
    .map(({ id, score }) => {
      const skill = corpus.skills[Number(id)]!;
      return {
        skillId: skill.skillId,
        name: skill.name,
        description: skill.description,
        score: Math.round(score * 10_000) / 10_000,
      };
    });
};
