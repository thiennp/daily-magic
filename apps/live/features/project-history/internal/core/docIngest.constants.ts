/** Limits and sources for turning folder documents into skill drafts (no AI). */

/** Candidates considered per pass, and owner questions actually posted. */
export const DOC_INGEST_MAX_PER_PASS = 8;
export const DOC_INGEST_MAX_QUESTIONS_PER_PASS = 3;
/**
 * A whole-library read costs about 140 tokens per skill: 30 skills is about
 * 4,200 tokens. Backfilled skills stay under their own cap until a pilot
 * shows they are fetched.
 */
export const DOC_INGEST_MAX_LIBRARY = 30;
export const DOC_INGEST_MAX_BACKFILLED = 10;

export const DOC_INGEST_MIN_STEPS = 3;
/** A doc whose non-blank lines are this share links is a pointer page. */
export const DOC_INGEST_LINK_ONLY_SHARE = 0.4;
export const DOC_INGEST_MAX_DOC_BYTES = 48 * 1024;
export const DOC_INGEST_DESCRIPTION_MAX_CHARS = 200;
export const DOC_INGEST_MAX_KEYWORDS = 12;

export const DOC_SKILL_ORIGIN = "folder-doc";

/** Folder-relative sources, in priority order. */
export const DOC_INGEST_SOURCES = [
  { dir: ".cursor/skills", kind: "skill" },
  { dir: ".cursor/commands", kind: "command" },
  { dir: "docs/qa", kind: "qa" },
] as const;

export type DocSourceKind = (typeof DOC_INGEST_SOURCES)[number]["kind"];
