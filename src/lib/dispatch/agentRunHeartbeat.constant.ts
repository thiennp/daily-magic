/** Mac worker publishes run.heartbeat at this interval while a CLI child is alive. */
export const AGENT_RUN_HEARTBEAT_INTERVAL_MS = 15_000;

/** Mark RUNNING runs stale when no run heartbeat for this long (after at least one heartbeat). */
export const AGENT_RUN_STALE_HEARTBEAT_MS = 180_000;
