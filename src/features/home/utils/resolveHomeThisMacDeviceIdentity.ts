import { deviceMatchesLocalTokenHash } from "@/features/agent-witch/online-wake/deviceMatchesLocalTokenHash";
import type { MacDevicePresence } from "@/features/agent-witch/online-wake/macDevicePresence";
import { deviceMatchesReachableLocalTokenHash } from "@/features/agent-witch/utils/deviceMatchesReachableLocalTokenHash";

export interface HomeThisMacDeviceIdentity {
  /** The single device row that represents the Mac running this browser. */
  readonly thisMacDeviceId: string | null;
  /** True when that row is live/recent (HOME-061). */
  readonly isReachable: boolean;
}

/**
 * One "This Mac" row (dedupe): a live/recent token match wins; otherwise the
 * first offline row whose token matches this Mac's wake identity is badged and
 * carries the Connect CTA instead of a separate "This computer" row.
 */
export const resolveHomeThisMacDeviceIdentity = (input: {
  readonly localTokenHash: string | null;
  readonly devices: readonly (MacDevicePresence & {
    readonly id: string;
    readonly tokenHash: string | null;
  })[];
}): HomeThisMacDeviceIdentity => {
  const localTokenHash = input.localTokenHash;
  if (localTokenHash === null || localTokenHash.trim().length === 0) {
    return { thisMacDeviceId: null, isReachable: false };
  }

  const reachable = input.devices.find((device) =>
    deviceMatchesReachableLocalTokenHash(device, localTokenHash),
  );
  if (reachable !== undefined) {
    return { thisMacDeviceId: reachable.id, isReachable: true };
  }

  const offline = input.devices.find((device) =>
    deviceMatchesLocalTokenHash(device.tokenHash, localTokenHash),
  );
  return offline !== undefined
    ? { thisMacDeviceId: offline.id, isReachable: false }
    : { thisMacDeviceId: null, isReachable: false };
};
