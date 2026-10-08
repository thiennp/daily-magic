import {
  tokenizeKnowledgeText,
  type KnowledgeQuery,
} from "./buildKnowledgeQuery";
import type { EpisodeCardWithVector, EpisodeKind } from "./episode.types";
import type { KnowledgeMode } from "./knowledgePlan";

export type ScoredEpisodeCard = {
  readonly card: EpisodeCardWithVector;
  readonly score: number;
  readonly lexical: number;
  readonly cosine: number | null;
};

const HYBRID_COSINE_WEIGHT = 0.6;
const HYBRID_LEXICAL_WEIGHT = 0.4;
const FILE_MATCH_BONUS = 0.3;
const INEFFECTIVE_PENALTY_PER_COUNT = 0.15;
const INEFFECTIVE_PENALTY_CAP = 0.5;
const MISTAKE_BOOST = 1.1;
const NEAR_DUPLICATE_JACCARD = 0.8;

export const cosineSimilarity = (a: Float32Array, b: Float32Array): number => {
  const length = Math.min(a.length, b.length);
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let index = 0; index < length; index += 1) {
    const av = a[index] ?? 0;
    const bv = b[index] ?? 0;
    dot += av * bv;
    normA += av * av;
    normB += bv * bv;
  }
  return normA === 0 || normB === 0 ? 0 : dot / Math.sqrt(normA * normB);
};

const basename = (filePath: string): string =>
  filePath.split("/").filter(Boolean).pop() ?? filePath;

const TERM_CACHE_LIMIT = 5_000;
const termCache = new Map<string, Set<string>>();

/** Tokenized card text, memoized by id + updatedAt (cards are re-read per query). */
const cardTerms = (card: EpisodeCardWithVector): Set<string> => {
  const key = `${card.id}:${card.updatedAt}`;
  const cached = termCache.get(key);
  if (cached !== undefined) {
    return cached;
  }
  const terms = new Set(
    tokenizeKnowledgeText(
      `${card.request} ${card.takeaway} ${card.files.map(basename).join(" ")}`,
    ),
  );
  if (termCache.size >= TERM_CACHE_LIMIT) {
    termCache.clear();
  }
  termCache.set(key, terms);
  return terms;
};

const inverseDocumentFrequency = (
  terms: readonly string[],
  cardTermSets: readonly Set<string>[],
): Map<string, number> =>
  new Map(
    terms.map((term) => {
      const documentFrequency = cardTermSets.filter((set) =>
        set.has(term),
      ).length;
      return [
        term,
        Math.log(1 + cardTermSets.length / (1 + documentFrequency)),
      ] as const;
    }),
  );

const hasFileMatch = (
  queryFiles: readonly string[],
  cardFiles: readonly string[],
): boolean => {
  const queryNames = new Set(queryFiles.map(basename));
  return cardFiles.some((file) => queryNames.has(basename(file)));
};

const applyAdjustments = (
  base: number,
  card: EpisodeCardWithVector,
): number => {
  const penalty = Math.min(
    INEFFECTIVE_PENALTY_CAP,
    card.ineffectiveCount * INEFFECTIVE_PENALTY_PER_COUNT,
  );
  const boost = card.kind === "mistake" ? MISTAKE_BOOST : 1;
  return Math.min(1, base * (1 - penalty) * boost);
};

/** Lexical (idf-weighted term overlap + file bonus) and optional cosine. */
export const scoreKnowledgeCards = (input: {
  readonly cards: readonly EpisodeCardWithVector[];
  readonly query: KnowledgeQuery;
  readonly queryVector: Float32Array | null;
  readonly mode: KnowledgeMode;
  readonly kinds: readonly EpisodeKind[];
}): ScoredEpisodeCard[] => {
  const eligible = input.cards.filter(
    (card) => card.outcome !== "superseded" && input.kinds.includes(card.kind),
  );
  const termSets = eligible.map(cardTerms);
  const idf = inverseDocumentFrequency(input.query.terms, termSets);
  const totalWeight = Array.from(idf.values()).reduce(
    (sum, weight) => sum + weight,
    0,
  );

  return eligible.map((card, index) => {
    const terms = termSets[index] ?? new Set<string>();
    const matchedWeight = input.query.terms.reduce(
      (sum, term) => sum + (terms.has(term) ? (idf.get(term) ?? 0) : 0),
      0,
    );
    const termScore = totalWeight === 0 ? 0 : matchedWeight / totalWeight;
    const lexical = Math.min(
      1,
      termScore +
        (hasFileMatch(input.query.files, card.files) ? FILE_MATCH_BONUS : 0),
    );
    const cosine =
      input.mode === "hybrid" &&
      input.queryVector !== null &&
      card.vector !== null
        ? Math.max(0, cosineSimilarity(input.queryVector, card.vector))
        : null;
    const base =
      cosine === null
        ? lexical
        : HYBRID_COSINE_WEIGHT * cosine + HYBRID_LEXICAL_WEIGHT * lexical;

    return { card, score: applyAdjustments(base, card), lexical, cosine };
  });
};

const jaccard = (left: Set<string>, right: Set<string>): number => {
  const union = new Set([...left, ...right]).size;
  if (union === 0) {
    return 0;
  }
  const intersection = [...left].filter((term) => right.has(term)).length;
  return intersection / union;
};

/** Greedy diversity pass: drop near-duplicate takeaways, keep best first. */
export const selectDiverseKnowledgeCards = (
  scored: readonly ScoredEpisodeCard[],
  minScore: number,
): ScoredEpisodeCard[] => {
  const selected: ScoredEpisodeCard[] = [];
  const selectedTerms: Set<string>[] = [];
  const ranked = scored
    .filter((entry) => entry.score >= minScore)
    .sort((left, right) => right.score - left.score);

  for (const entry of ranked) {
    const terms = new Set(tokenizeKnowledgeText(entry.card.takeaway));
    const isDuplicate = selectedTerms.some(
      (existing) => jaccard(existing, terms) > NEAR_DUPLICATE_JACCARD,
    );
    if (!isDuplicate) {
      selected.push(entry);
      selectedTerms.push(terms);
    }
  }
  return selected;
};
