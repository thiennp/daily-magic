/**
 * Lightweight TF-IDF over folder skills (AWL-local).
 * Intentionally duplicated from feature-knowledge helpers so apps/live
 * does not import src/lib/featureKnowledge or write .feature-knowledge.
 */

const tokenize = (text: string): readonly string[] => {
  const matches = text.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g);
  return matches ?? [];
};

const buildTermFrequency = (
  tokens: readonly string[],
): Readonly<Record<string, number>> => {
  const counts: Record<string, number> = {};
  for (const token of tokens) {
    counts[token] = (counts[token] ?? 0) + 1;
  }
  const maxCount = Math.max(...Object.values(counts), 1);
  const normalized: Record<string, number> = {};
  for (const [term, count] of Object.entries(counts)) {
    normalized[term] = count / maxCount;
  }
  return normalized;
};

const computeIdf = (
  documents: readonly string[],
): Readonly<Record<string, number>> => {
  const documentFrequency: Record<string, number> = {};
  for (const document of documents) {
    for (const term of new Set(tokenize(document))) {
      documentFrequency[term] = (documentFrequency[term] ?? 0) + 1;
    }
  }
  const totalDocuments = Math.max(documents.length, 1);
  const idf: Record<string, number> = {};
  for (const [term, frequency] of Object.entries(documentFrequency)) {
    idf[term] = Math.log((totalDocuments + 1) / (frequency + 1)) + 1;
  }
  return idf;
};

const buildTfIdfVector = (
  text: string,
  idf: Readonly<Record<string, number>>,
): Readonly<Record<string, number>> => {
  const tf = buildTermFrequency(tokenize(text));
  const vector: Record<string, number> = {};
  for (const [term, weight] of Object.entries(tf)) {
    vector[term] = weight * (idf[term] ?? 1);
  }
  return vector;
};

const cosineSimilarity = (
  left: Readonly<Record<string, number>>,
  right: Readonly<Record<string, number>>,
): number => {
  const leftEntries = Object.entries(left);
  const dot = leftEntries.reduce(
    (sum, [term, weight]) => sum + weight * (right[term] ?? 0),
    0,
  );
  const leftNorm = Math.sqrt(
    leftEntries.reduce((sum, [, weight]) => sum + weight * weight, 0),
  );
  const rightNorm = Math.sqrt(
    Object.values(right).reduce((sum, weight) => sum + weight * weight, 0),
  );
  if (leftNorm === 0 || rightNorm === 0) {
    return 0;
  }
  return dot / (leftNorm * rightNorm);
};

export interface PromptSdlcFolderSkillSearchDocument {
  readonly id: string;
  readonly text: string;
}

export const rankPromptSdlcFolderSkillDocuments = (
  documents: readonly PromptSdlcFolderSkillSearchDocument[],
  query: string,
  limit: number,
): readonly { readonly id: string; readonly score: number }[] => {
  const trimmedQuery = query.trim();
  if (trimmedQuery.length === 0 || documents.length === 0 || limit <= 0) {
    return [];
  }
  const idf = computeIdf(documents.map((document) => document.text));
  const queryVector = buildTfIdfVector(trimmedQuery, idf);
  return documents
    .map((document) => ({
      id: document.id,
      score: cosineSimilarity(
        queryVector,
        buildTfIdfVector(document.text, idf),
      ),
    }))
    .filter((hit) => hit.score > 0)
    .toSorted((left, right) => right.score - left.score)
    .slice(0, limit);
};
