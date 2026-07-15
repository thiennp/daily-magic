export const AGENT_WITCH_HEARTBEAT_INTERVAL_MS = 30_000;

/** Device recently checked in via heartbeat without a live hub socket on this instance. */
export const AGENT_WITCH_ACTIVE_THRESHOLD_MS =
  AGENT_WITCH_HEARTBEAT_INTERVAL_MS;

/** Device is reachable if last_seen_at is newer than this (3× heartbeat interval). */
export const AGENT_WITCH_ONLINE_THRESHOLD_MS = 90_000;

export const isAgentWitchDeviceRecentlySeen = (
  lastSeenAt: string | null,
  nowMs: number = Date.now(),
  thresholdMs: number = AGENT_WITCH_ONLINE_THRESHOLD_MS,
): boolean => {
  if (lastSeenAt === null) {
    return false;
  }

  const lastSeenMs = new Date(lastSeenAt).getTime();
  if (Number.isNaN(lastSeenMs)) {
    return false;
  }

  return nowMs - lastSeenMs <= thresholdMs;
};
