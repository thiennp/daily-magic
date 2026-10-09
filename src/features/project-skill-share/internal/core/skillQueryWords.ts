const WORD = /[a-z0-9]+/g;
const STOPWORDS: ReadonlySet<string> = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "to",
  "of",
  "in",
  "on",
  "for",
  "with",
  "is",
  "it",
  "how",
  "new",
]);

export const words = (text: string): readonly string[] =>
  text.toLowerCase().match(WORD) ?? [];

/** Distinct, lowercase query words without stopwords. */
export const tokenizeSkillQuery = (query: string): readonly string[] => [
  ...new Set(words(query).filter((word) => !STOPWORDS.has(word))),
];

/** Prefix match either way, so "components" finds "component"; short words (ui) only match as a prefix. */
const MIN_STEM_CHARS = 4;
const matchesWord = (word: string, token: string): boolean =>
  word.startsWith(token) ||
  (word.length >= MIN_STEM_CHARS && token.startsWith(word));

export const startsWithAny = (
  haystack: readonly string[],
  token: string,
): boolean => haystack.some((word) => matchesWord(word, token));
