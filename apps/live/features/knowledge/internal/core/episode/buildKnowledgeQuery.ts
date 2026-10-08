export const KNOWLEDGE_QUERY_MAX_CHARS = 400;

export type KnowledgeQuery = {
  readonly text: string;
  readonly files: readonly string[];
  readonly terms: readonly string[];
};

const FILE_PATTERN =
  /[\w./-]+\.(?:tsx?|jsx?|mjs|cjs|json|md|mdx|sql|css|scss|html|go|py|rs|swift|sh|ya?ml|toml)\b/gi;

const ERROR_CODE_PATTERN =
  /\b(?:TS\d{3,5}|E[A-Z]{3,}|HTTP\s?\d{3}|\d{3}\s?error)\b/g;

const MAX_TERMS = 24;

const STOPWORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "that",
  "this",
  "from",
  "into",
  "have",
  "has",
  "you",
  "are",
  "was",
  "were",
  "can",
  "could",
  "should",
  "would",
  "please",
  "của",
  "và",
  "cho",
  "các",
  "một",
  "những",
  "được",
  "khi",
  "này",
  "đó",
  "không",
  "có",
  "là",
  "để",
  "trong",
  "với",
  "tôi",
  "bạn",
]);

export const tokenizeKnowledgeText = (text: string): string[] =>
  text
    .toLowerCase()
    .split(/[^\p{L}\p{N}_]+/u)
    .filter((term) => term.length >= 3 && !STOPWORDS.has(term));

const basename = (filePath: string): string =>
  filePath.split("/").filter(Boolean).pop() ?? filePath;

export const extractKnowledgeFiles = (text: string): string[] =>
  Array.from(new Set(text.match(FILE_PATTERN) ?? []));

/** Query from the user's own message (never the continuation seed). */
export const buildKnowledgeQuery = (userPrompt: string): KnowledgeQuery => {
  const text = userPrompt.trim().slice(0, KNOWLEDGE_QUERY_MAX_CHARS);
  const files = extractKnowledgeFiles(text);
  const errorCodes = (text.match(ERROR_CODE_PATTERN) ?? []).map((code) =>
    code.toLowerCase(),
  );
  const terms = Array.from(
    new Set([
      ...files.flatMap((file) => tokenizeKnowledgeText(basename(file))),
      ...errorCodes,
      ...tokenizeKnowledgeText(text),
    ]),
  ).slice(0, MAX_TERMS);

  return { text, files, terms };
};
