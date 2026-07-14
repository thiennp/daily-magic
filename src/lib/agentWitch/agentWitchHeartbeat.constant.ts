export const AGENT_WITCH_HEARTBEAT_INTERVAL_MS = 30_000;

/** Device is online if last_seen_at is newer than this (3× heartbeat interval). */
export const AGENT_WITCH_ONLINE_THRESHOLD_MS = 90_000;

export const isAgentWitchDeviceRecentlySeen = (
  lastSeenAt: string | null,
  nowMs: number = Date.now(),
): boolean => {
  if (lastSeenAt === null) {
    return false;
  }

  const lastSeenMs = new Date(lastSeenAt).getTime();
  if (Number.isNaN(lastSeenMs)) {
    return false;
  }

  return nowMs - lastSeenMs <= AGENT_WITCH_ONLINE_THRESHOLD_MS;
};
