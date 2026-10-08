/** Tunable thresholds for module-level auto skills. */

/** Fewer meaningful tokens (besides placeholders) than this => trivial. */
export const MODULE_MIN_MEANINGFUL_TOKENS = 2;
export const MODULE_MAX_PER_RUN = 12;
export const MODULE_CANONICAL_CAP = 300;
export const MODULE_PREVIEW_CAP = 200;
/** Embedding neighbours that reach the judge. */
export const MODULE_CANDIDATES_TOP_K = 5;
export const MODULE_MIN_COSINE = 0.75;
export const MODULE_MIN_JACCARD = 0.3;
/** A cluster raises a question from this many distinct runs. */
export const MODULE_ASK_MIN_OCCURRENCES = 2;
export const MODULE_MAX_QUESTIONS_PER_RUN = 2;
/** Newest modules compared per project (keeps matching cheap). */
export const MODULE_COMPARE_WINDOW = 500;

export const GENERIC_MODULE_VERBS: ReadonlySet<string> = new Set([
  "read",
  "list",
  "open",
  "show",
  "print",
  "view",
  "cat",
  "ls",
  "check-file",
]);

export const MODULE_STOPWORDS: ReadonlySet<string> = new Set([
  "the",
  "and",
  "for",
  "with",
  "then",
  "from",
  "into",
  "that",
  "this",
  "file",
  "files",
  "all",
]);
