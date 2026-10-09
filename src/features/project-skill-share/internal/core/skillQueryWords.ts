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

/**
 * Prefix match either way, so "components" finds "component". Words shorter
 * than 3 characters (ui, aw) only match as a whole word, so "aw" never finds "awl".
 */
const MIN_STEM_CHARS = 4;
const MIN_PREFIX_CHARS = 3;
const matchesWord = (word: string, token: string): boolean =>
  token.length < MIN_PREFIX_CHARS
    ? word === token
    : word.startsWith(token) ||
      (word.length >= MIN_STEM_CHARS && token.startsWith(word));

export const startsWithAny = (
  haystack: readonly string[],
  token: string,
): boolean => haystack.some((word) => matchesWord(word, token));
