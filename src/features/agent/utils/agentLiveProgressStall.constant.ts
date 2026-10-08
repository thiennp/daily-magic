import { AGENT_WITCH_HEARTBEAT_INTERVAL_MS } from "@/lib/agentWitch/agentWitchHeartbeat.constant";

export const AGENT_LIVE_PROGRESS_STALL_WARNING_MS = 30_000;

/**
 * "Lost connection to your computer" needs silence past the 60 s presence
 * grace (two missed 30 s heartbeats, 9890735) plus one 15 s run heartbeat.
 * At 45 s the banner showed while the floater said "last seen alive 7–21s ago"
 * (Testi long-run run 2, a76d46ac).
 */
export const AGENT_LIVE_PROGRESS_STALL_STUCK_MS =
  AGENT_WITCH_HEARTBEAT_INTERVAL_MS * 2 + 15_000;

/** Re-read the run record after this long without output (S2/S7, 9890735). */
export const AGENT_LIVE_RUN_RECORD_RESYNC_MS = 45_000;

/** 662eae04: while stopping, re-read the run until the server says it ended. */
export const AGENT_LIVE_STOPPING_RUN_RECORD_RESYNC_MS = 4_000;
