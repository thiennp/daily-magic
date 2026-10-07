/**
 * Neon keep-newest-N per chat (HARD chat retention). Config overrides via env.
 * Older rows stay on computers / AWL / History / browser IDB — Neon never
 * deletes chats outright; only rows past rank N after a synced computer ack.
 */

const readPositiveIntEnv = (name: string, fallback: number): number => {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

/** Newest messages Neon keeps per (project_id, chat_key). */
export const PROJECT_MESSAGE_KEEP_PER_CHAT_DEFAULT = 300;
export const PROJECT_MESSAGE_KEEP_PER_CHAT = readPositiveIntEnv(
  "AWC_PROJECT_MESSAGE_KEEP_PER_CHAT",
  PROJECT_MESSAGE_KEEP_PER_CHAT_DEFAULT,
);

/** Computer with no ack this long is stale (config; days). */
export const PROJECT_MESSAGE_ACK_STALE_DAYS_DEFAULT = 30;
export const PROJECT_MESSAGE_ACK_STALE_DAYS = readPositiveIntEnv(
  "AWC_PROJECT_MESSAGE_ACK_STALE_DAYS",
  PROJECT_MESSAGE_ACK_STALE_DAYS_DEFAULT,
);

/** Owner banner when unacked in one chat reaches this (no hard delete). */
export const PROJECT_MESSAGE_UNSYNCED_BANNER_DEFAULT = 2000;
export const PROJECT_MESSAGE_UNSYNCED_BANNER_AT = readPositiveIntEnv(
  "AWC_PROJECT_MESSAGE_UNSYNCED_BANNER_AT",
  PROJECT_MESSAGE_UNSYNCED_BANNER_DEFAULT,
);

/** Re-show banner after this many more unacked (config). */
export const PROJECT_MESSAGE_UNSYNCED_BANNER_REGROWTH_DEFAULT = 500;
export const PROJECT_MESSAGE_UNSYNCED_BANNER_REGROWTH =
  readPositiveIntEnv(
    "AWC_PROJECT_MESSAGE_UNSYNCED_BANNER_REGROWTH",
    PROJECT_MESSAGE_UNSYNCED_BANNER_REGROWTH_DEFAULT,
  );

/** Chats swept per ticker pass. */
export const PROJECT_MESSAGE_PRUNE_SWEEP_CHAT_LIMIT = 20;

export const PROJECT_MESSAGE_PRUNE_OUTCOME_REASON = "prune_keep_300" as const;
