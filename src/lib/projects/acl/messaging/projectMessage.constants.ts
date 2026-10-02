/**
 * Thin protocol metadata for project bot↔bot messages (cloud).
 * No media, blobs, base64, or content bodies — use P2P / localPath for bulky payloads.
 *
 * Retention: delete row on ack (CASCADE deliveries); hard-delete unacked after TTL.
 * Dispatch caps: per-sender rolling hourly + project-wide unread (row count).
 */

const readPositiveIntEnv = (name: string, fallback: number): number => {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const PROJECT_MESSAGE_SUMMARY_MAX_CHARS = 200;
/** Total JSON byte size of the refs object. */
export const PROJECT_MESSAGE_REFS_MAX_BYTES = 768;
/** Per allowlisted ref string value. */
export const PROJECT_MESSAGE_REF_VALUE_MAX_CHARS = 256;
/** Unacked messages older than this are hard-deleted (CASCADE deliveries). */
export const PROJECT_MESSAGE_UNACKED_TTL_DAYS = 3;

/** Default max user/owner dispatches per sender in a rolling 1h window. */
export const PROJECT_MESSAGE_HOURLY_CAP_DEFAULT = 300;
/**
 * Max user/owner dispatches from one membership (or owner user) in a rolling 1h
 * window. Override with AWC_PROJECT_MESSAGE_HOURLY_CAP.
 */
export const PROJECT_MESSAGE_HOURLY_CAP = readPositiveIntEnv(
  "AWC_PROJECT_MESSAGE_HOURLY_CAP",
  PROJECT_MESSAGE_HOURLY_CAP_DEFAULT,
);

/** Default max unacked project_messages rows per project. */
export const PROJECT_MESSAGE_UNREAD_CAP_DEFAULT = 300;
/**
 * Max existing project_messages rows for a project (delete-on-ack ⇒ unread).
 * Override with AWC_PROJECT_MESSAGE_UNREAD_CAP. Clear-all / ack / TTL purge free slots.
 */
export const PROJECT_MESSAGE_UNREAD_CAP = readPositiveIntEnv(
  "AWC_PROJECT_MESSAGE_UNREAD_CAP",
  PROJECT_MESSAGE_UNREAD_CAP_DEFAULT,
);

/** System membership events — not user dispatches; excluded from hourly cap. */
export const PROJECT_MESSAGE_LIFECYCLE_KINDS = [
  "peer.joined",
  "peer.left",
] as const;
/** Throttle for opportunistic purge (ensure / dispatch / list_inbox). */
export const PROJECT_MESSAGE_PURGE_MIN_INTERVAL_MS = 3_600_000;

export const PROJECT_MESSAGE_ALLOWED_REF_KEYS = [
  "prUrl",
  "commitSha",
  "localPath",
  "allowClaimId",
] as const;

export type ProjectMessageRefKey = (typeof PROJECT_MESSAGE_ALLOWED_REF_KEYS)[number];
