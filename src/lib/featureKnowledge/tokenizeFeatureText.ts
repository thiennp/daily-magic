export const tokenizeFeatureText = (text: string): readonly string[] => {
  const matches = text.toLowerCase().match(/[a-z0-9][a-z0-9_-]*/g);
  return matches ?? [];
};

export const buildTermFrequency = (
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

export const cosineSimilarity = (
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
