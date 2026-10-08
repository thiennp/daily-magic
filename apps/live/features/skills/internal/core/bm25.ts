const STOPWORDS: ReadonlySet<string> = new Set([
  "the",
  "and",
  "for",
  "with",
  "this",
  "that",
  "from",
  "into",
  "are",
  "was",
  "you",
  "your",
  "use",
  "when",
  "how",
  "can",
  "all",
  "any",
  "not",
  "but",
  "have",
  "has",
  "its",
  "our",
  "out",
  "off",
  "per",
  "via",
  "then",
  "than",
]);

const stem = (token: string): string =>
  token.length > 5 && token.endsWith("ing")
    ? token.slice(0, -3)
    : token.length > 4 && token.endsWith("ed")
      ? token.slice(0, -2)
      : token.length > 3 && token.endsWith("s")
        ? token.slice(0, -1)
        : token;

export const tokenizeForSearch = (text: string): string[] =>
  text
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t))
    .map(stem);

const K1 = 1.2;
const B = 0.75;

export type Bm25Index = {
  readonly score: (queryTokens: readonly string[]) => Float64Array;
};

/** In-memory BM25 over pre-tokenized documents (inverted index). */
export const buildBm25Index = (docs: readonly string[][]): Bm25Index => {
  const postings = new Map<string, Map<number, number>>();
  const lengths = docs.map((d) => d.length);
  docs.forEach((tokens, docIndex) => {
    for (const token of tokens) {
      const posting = postings.get(token) ?? new Map<number, number>();
      posting.set(docIndex, (posting.get(docIndex) ?? 0) + 1);
      postings.set(token, posting);
    }
  });
  const avgLength = lengths.reduce((a, b) => a + b, 0) / (docs.length || 1);
  return {
    score: (queryTokens) => {
      const scores = new Float64Array(docs.length);
      for (const term of new Set(queryTokens)) {
        const posting = postings.get(term);
        if (posting === undefined) {
          continue;
        }
        const idf = Math.log(
          1 + (docs.length - posting.size + 0.5) / (posting.size + 0.5),
        );
        for (const [docIndex, tf] of posting) {
          const norm = 1 - B + (B * lengths[docIndex]!) / (avgLength || 1);
          scores[docIndex]! += (idf * tf * (K1 + 1)) / (tf + K1 * norm);
        }
      }
      return scores;
    },
  };
};
