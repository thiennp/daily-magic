/**
 * Thin protocol metadata for project bot↔bot messages (cloud).
 * No media, blobs, base64, or content bodies — use P2P / localPath for bulky payloads.
 *
 * Retention: delete row on ack (CASCADE deliveries); hard-delete unacked after TTL.
 * Dispatch rate limits: per sender_membership_id.
 */
export const PROJECT_MESSAGE_SUMMARY_MAX_CHARS = 200;
/** Total JSON byte size of the refs object. */
export const PROJECT_MESSAGE_REFS_MAX_BYTES = 768;
/** Per allowlisted ref string value. */
export const PROJECT_MESSAGE_REF_VALUE_MAX_CHARS = 256;
/** Unacked messages older than this are hard-deleted (CASCADE deliveries). */
export const PROJECT_MESSAGE_UNACKED_TTL_DAYS = 3;
/** Max dispatches from one membership in a rolling 24h window. */
export const PROJECT_MESSAGE_DISPATCH_DAILY_LIMIT = 60;
/** System membership events — not user dispatches; excluded from daily cap. */
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
