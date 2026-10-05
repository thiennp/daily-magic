/**
 * Thin protocol metadata for project bot↔bot messages (cloud).
 * No media, blobs, base64, or content bodies — use P2P / localPath for bulky payloads.
 *
 * Retention: stamp read_at on inbox fetch; hard-delete on ack or when read and
 * delivery is terminal/unwatched (CASCADE deliveries). Outcome rows keep a thin
 * wake/final-state record with no FK to project_messages. Unacked TTL purge remains.
 * Dispatch caps: per-sender rolling hourly + project-wide unread (row count).
 */

/** Delivery states that allow delete-on-read once read_at is set. */
export const PROJECT_B2B_DELETE_ON_READ_TERMINAL_STATES = [
  "done",
  "blocked",
  "blocked_silent_10m",
] as const;

export type ProjectB2bDeleteOnReadTerminalState =
  (typeof PROJECT_B2B_DELETE_ON_READ_TERMINAL_STATES)[number];

/**
 * History feature 551bf17d (computerAck). Cloud delete composition:
 * - off → delete-on-read / ack unchanged (always allow).
 * - ready | degraded → require a project_message_computer_acks row AND
 *   recipient rules (read+terminal/unwatched, or explicit ack).
 * - un-acked older than 7 days may delete with a thin history-gap marker
 *   (no body); History owns writing that marker.
 */
export const PROJECT_MESSAGE_HISTORY_COMPUTER_ACK_MODE = "off" as const;

export type ProjectMessageHistoryComputerAckMode =
  | typeof PROJECT_MESSAGE_HISTORY_COMPUTER_ACK_MODE
  | "ready"
  | "degraded";


const readPositiveIntEnv = (name: string, fallback: number): number => {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const PROJECT_MESSAGE_SUMMARY_MAX_CHARS = 200;

/** Receipt stored when a peer wake is accepted (HTTP 200). */
export const PROJECT_MESSAGE_KIND_TASK_PROCESSING = "task.processing";
/** Peer reply kinds. Each one counts as activity on the sender's open request. */
export const PROJECT_MESSAGE_KIND_TASK_RECEIVED = "task.received";
export const PROJECT_MESSAGE_KIND_TASK_STATUS = "task.status";
export const PROJECT_MESSAGE_KIND_TASK_DONE = "task.done";
export const PROJECT_MESSAGE_KIND_TASK_BLOCKED = "task.blocked";

/** System notice to the sender: the peer is silent for 5 min. */
export const PROJECT_MESSAGE_KIND_PEER_SILENT = "peer.silent";
/** System notice to the sender: still silent at 10 min, delivery blocked. */
export const PROJECT_MESSAGE_KIND_PEER_SILENT_BLOCKED = "peer.silent_blocked";

/** Notices from the server, stored with no sender membership. */
export const PROJECT_MESSAGE_SYSTEM_NOTICE_KINDS = [
  PROJECT_MESSAGE_KIND_PEER_SILENT,
  PROJECT_MESSAGE_KIND_PEER_SILENT_BLOCKED,
] as const;
/** Inbox / log sender name for system notices (not "Owner", not the peer). */
export const PROJECT_MESSAGE_SYSTEM_SENDER_DISPLAY_NAME = "System";
/** Inbox / log / wake sender name when the sender membership is null (owner). */
export const PROJECT_MESSAGE_OWNER_SENDER_DISPLAY_NAME = "Owner";

/** No activity from the peer this long after the wake or its last activity: tell the sender. */
export const PROJECT_B2B_SILENCE_NOTIFY_MS = 5 * 60_000;
/** No activity this long after the wake or its last activity: mark the delivery blocked. */
export const PROJECT_B2B_SILENCE_BLOCK_MS = 10 * 60_000;
/** In-process silence check interval on the long-running Node server. */
export const PROJECT_B2B_SILENCE_TICK_MS = 60_000;

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

/** Rolling window for the hourly dispatch cap. */
export const PROJECT_MESSAGE_HOURLY_WINDOW_MS = 3_600_000;

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

/** System events — not user dispatches; excluded from hourly cap. */
export const PROJECT_MESSAGE_LIFECYCLE_KINDS = [
  "peer.joined",
  "peer.left",
  ...PROJECT_MESSAGE_SYSTEM_NOTICE_KINDS,
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
