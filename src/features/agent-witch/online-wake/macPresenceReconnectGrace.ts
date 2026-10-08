import type { MacPresenceTier } from "@/features/agent-witch/online-wake/macDevicePresence";
import { AGENT_WITCH_HEARTBEAT_INTERVAL_MS } from "@/lib/agentWitch/agentWitchHeartbeat.constant";

/**
 * S8: "Reconnecting" (live on another server) only while the device is still
 * heartbeating. Two missed 30 s heartbeats → Offline. A shorter grace would
 * flag healthy devices, whose last_seen_at is up to one interval old.
 */
export const MAC_PRESENCE_RECONNECTING_GRACE_MS =
  AGENT_WITCH_HEARTBEAT_INTERVAL_MS * 2;

export const expireStaleReconnectingTier = (
  tier: MacPresenceTier,
  lastSeenAt: string | null | undefined,
  nowMs: number = Date.now(),
): MacPresenceTier => {
  if (tier !== "live_other_instance" || !lastSeenAt) {
    return tier;
  }
  const lastSeenMs = new Date(lastSeenAt).getTime();
  return !Number.isNaN(lastSeenMs) &&
    nowMs - lastSeenMs > MAC_PRESENCE_RECONNECTING_GRACE_MS
    ? "offline"
    : tier;
};
