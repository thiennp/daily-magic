/**
 * Flushed rows older than this are reclaimed to pending (crash / notify failure).
 * Sole flush owner (cron) retries them on the next pass.
 */
export const PROJECT_UPDATED_NOTIFY_FLUSHED_RECLAIM_MS = 60_000;
