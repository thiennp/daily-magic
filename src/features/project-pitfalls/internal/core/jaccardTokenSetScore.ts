/** Jaccard similarity |A∩B|/|A∪B|; empty∩empty → 0. Pure. */
export const jaccardTokenSetScore = (
  a: ReadonlySet<string>,
  b: ReadonlySet<string>,
): number => {
  if (a.size === 0 && b.size === 0) {
    return 0;
  }
  const intersection = [...a].filter((token) => b.has(token)).length;
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
};
