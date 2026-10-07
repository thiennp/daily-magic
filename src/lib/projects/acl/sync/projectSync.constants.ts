/**
 * Computer ↔ computer sync relay (HARD). 1 MiB per-file LOCKED.
 * Never sync secrets; History off = learning purge only.
 */

const readPositiveIntEnv = (name: string, fallback: number): number => {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

/** Per-file size limit (bytes). LOCKED 1 MiB. */
export const PROJECT_SYNC_MAX_FILE_BYTES_DEFAULT = 1_048_576;
export const PROJECT_SYNC_MAX_FILE_BYTES = readPositiveIntEnv(
  "AWC_PROJECT_SYNC_MAX_FILE_BYTES",
  PROJECT_SYNC_MAX_FILE_BYTES_DEFAULT,
);

/** Neon BYTEA chunk size for transit blobs. */
export const PROJECT_SYNC_CHUNK_BYTES = 256 * 1024;

/** Store root under the owner-picked project folder. */
export const PROJECT_SYNC_STORE_ROOT = ".agentwitch/data";

/** Allowlisted sync kinds (path prefixes under store root). */
export const PROJECT_SYNC_KINDS = [
  "chat",
  "skill",
  "safety_rule",
  "knowledge",
  "summary",
] as const;

export type ProjectSyncKind = (typeof PROJECT_SYNC_KINDS)[number];

/** Learning paths purged on History OFF — never history/ chats. */
export const PROJECT_SYNC_LEARNING_PURGE_PREFIXES = [
  "skillgen/",
  "skills/_drafts/",
  "tasks/",
  "outcomes/",
] as const;

export const PROJECT_SYNC_CHAT_PATH_PREFIX = "history/";
