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
 * Does a query word match a library word? Words under 3 characters (ui, aw)
 * match whole words only. Words of 3 or 4 characters match the same word or
 * its plural, never a longer word ("page" is not "pager"). Longer words match
 * as a prefix either way, so "components" finds "component".
 */
const MIN_STEM_CHARS = 4;
const MIN_PREFIX_CHARS = 3;
const SHORT_STEM_CHARS = 5;
const matchesWord = (word: string, token: string): boolean =>
  token.length < MIN_PREFIX_CHARS
    ? word === token
    : token.length < SHORT_STEM_CHARS
      ? word === token || word === `${token}s` || word === `${token}es`
      : word.startsWith(token) ||
        (word.length >= MIN_STEM_CHARS && token.startsWith(word));

export const startsWithAny = (
  haystack: readonly string[],
  token: string,
): boolean => haystack.some((word) => matchesWord(word, token));
