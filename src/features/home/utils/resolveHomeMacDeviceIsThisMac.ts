import { deviceMatchesReachableLocalTokenHash } from "@/features/agent-witch/utils/deviceMatchesReachableLocalTokenHash";
import type { MacDevicePresence } from "@/features/agent-witch/online-wake/macDevicePresence";

/**
 * this Mac badge in Your Devices — token match on a live/recent row only (HOME-061 / HOME-062).
 */
export const resolveHomeMacDeviceIsThisMac = (input: {
  readonly localTokenHash: string | null;
  readonly device: MacDevicePresence & { readonly tokenHash: string | null };
}): boolean => {
  const localTokenHash = input.localTokenHash;
  if (localTokenHash === null) {
    return false;
  }

  return deviceMatchesReachableLocalTokenHash(input.device, localTokenHash);
};
