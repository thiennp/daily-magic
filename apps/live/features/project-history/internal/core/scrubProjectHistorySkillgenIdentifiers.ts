/**
 * One-off identifiers that make a skill unusable elsewhere: ticket keys, PR
 * numbers, commit hashes, URLs, absolute paths, ids and the names of the
 * people in the chat. Replaced with placeholders before any LLM call and
 * detected again when validating the draft.
 */
const KNOWN_NON_TICKET_PREFIXES = new Set([
  "AES",
  "ES",
  "HTTP",
  "IPV",
  "ISO",
  "MD",
  "PHP",
  "PSR",
  "RFC",
  "SHA",
  "SQL",
  "SSL",
  "TLS",
  "UTF",
  "UUID",
  "X",
]);

const URL_PATTERN = /\bhttps?:\/\/[^\s)>\]"']+/g;
const PATH_PATTERN =
  /(?:^|(?<=[\s("'`]))(?:~|\/(?:Users|home|var|tmp|opt|etc))\/[^\s)>\]"'`]+/g;
const UUID_PATTERN =
  /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi;
const PR_PATTERN = /\b(?:PR|MR|pull request|pull-request)\s*#?\d+\b/gi;
const TICKET_PATTERN = /\b([A-Z][A-Z0-9]{1,9})-\d+\b/g;
const HASH_PATTERN = /\b(?=[0-9a-f]*\d)(?=[0-9a-f]*[a-f])[0-9a-f]{7,40}\b/g;

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Longest names first so "Ann Lee" is replaced before "Ann". */
const normalizeNames = (names: readonly string[]): readonly string[] =>
  [
    ...new Set(names.map((name) => name.trim()).filter((n) => n.length >= 3)),
  ].toSorted((left, right) => right.length - left.length);

const buildNamePattern = (names: readonly string[]): RegExp | null =>
  names.length === 0
    ? null
    : new RegExp(
        `(?<![\\p{L}\\p{N}])(?:${names.map(escapeRegExp).join("|")})(?![\\p{L}\\p{N}])`,
        "giu",
      );

export const scrubProjectHistorySkillgenIdentifiers = (
  text: string,
  knownNames: readonly string[] = [],
): string => {
  const namePattern = buildNamePattern(normalizeNames(knownNames));
  const withoutNames =
    namePattern === null ? text : text.replace(namePattern, "<person>");
  return withoutNames
    .replace(URL_PATTERN, "<url>")
    .replace(UUID_PATTERN, "<id>")
    .replace(PATH_PATTERN, "<path>")
    .replace(PR_PATTERN, "<pr>")
    .replace(TICKET_PATTERN, (match, prefix: string) =>
      KNOWN_NON_TICKET_PREFIXES.has(prefix) ? match : "<ticket>",
    )
    .replace(HASH_PATTERN, "<commit>");
};

/** Identifier kinds still present in `text` (empty = reusable). */
export const findProjectHistorySkillgenIdentifiers = (
  text: string,
  knownNames: readonly string[] = [],
): readonly string[] => {
  const scrubbed = scrubProjectHistorySkillgenIdentifiers(text, knownNames);
  if (scrubbed === text) {
    return [];
  }
  const kinds = ["person", "url", "id", "path", "pr", "ticket", "commit"];
  return kinds.filter((kind) => {
    const marker = `<${kind}>`;
    return scrubbed.split(marker).length > text.split(marker).length;
  });
};
