/** Mac worker publishes run.heartbeat at this interval while a CLI child is alive. */
export const AGENT_RUN_HEARTBEAT_INTERVAL_MS = 15_000;

/** Mark RUNNING runs stale when no run heartbeat for this long (after at least one heartbeat). */
export const AGENT_RUN_STALE_HEARTBEAT_MS = 180_000;

/**
 * Mark RUNNING runs that never sent a heartbeat after this long from
 * COALESCE(started_at, created_at). Covers spawn hang / Mac crash before first tick.
 */
export const AGENT_RUN_NEVER_HEARTBEAT_STALE_MS = 600_000;

/**
 * 6253aa7e: a RUNNING run waiting on an answer is exempt from the sweeps above,
 * but not forever. After this much silence (no run heartbeat since it started)
 * it is failed as lost, and Home stops showing it as In progress.
 */
export const AGENT_RUN_SILENT_STALL_MS = 2 * 60 * 60 * 1000;
