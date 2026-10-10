import type { MacDevicePresence } from "@/features/agent-witch/online-wake/public-api/types";
import { resolveMacPresenceTier } from "@/features/agent-witch/online-wake/public-api/presentation";

/** Live / recent presence used for this-Mac identity (HOME-061). */
export const macDeviceIsReachableForLocalMacIdentity = (
  device: MacDevicePresence,
): boolean => {
  const tier = resolveMacPresenceTier(device);
  return tier === "live" || tier === "live_other_instance" || tier === "recent";
};
