import type {
  MacDevicePresence,
  MacPresenceTier,
} from "@/features/agent-witch/online-wake/macDevicePresence";
import { expireStaleReconnectingTier } from "@/features/agent-witch/online-wake/macPresenceReconnectGrace";

const resolveTierFromLegacyFlags = (
  device: MacDevicePresence,
): MacPresenceTier => {
  if (device.isConnected) {
    return "live";
  }

  if (device.isOnline) {
    return "recent";
  }

  return "offline";
};

export const resolveMacPresenceTier = (
  device: MacDevicePresence,
): MacPresenceTier =>
  expireStaleReconnectingTier(
    device.presenceTier ?? resolveTierFromLegacyFlags(device),
    device.lastSeenAt,
  );
