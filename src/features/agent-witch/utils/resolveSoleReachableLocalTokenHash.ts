import { deviceMatchesLocalTokenHash } from "@/features/agent-witch/online-wake/public-api/presentation";
import type { MacDevicePresence } from "@/features/agent-witch/online-wake/public-api/types";

import { macDeviceIsReachableForLocalMacIdentity } from "./macDeviceIsReachableForLocalMacIdentity";

const normalizeTokenHash = (value: string): string =>
  value.trim().toLowerCase();

/**
 * When exactly one cloud device is reachable on this computer's install tokens,
 * browsers can adopt that hash (orphan install-token cookies, active-profile drift).
 */
export const resolveSoleReachableLocalTokenHash = (input: {
  readonly devices: readonly (MacDevicePresence & {
    readonly tokenHash: string | null;
  })[];
  readonly localTokenHashes: readonly string[];
}): string | null => {
  const localHashes = input.localTokenHashes
    .map((hash) => normalizeTokenHash(hash))
    .filter((hash) => hash.length > 0);

  if (localHashes.length === 0) {
    return null;
  }

  const reachableMatchingHashes: string[] = [];

  for (const device of input.devices) {
    const deviceHash = device.tokenHash;
    if (deviceHash === null || deviceHash.trim().length === 0) {
      continue;
    }

    if (!macDeviceIsReachableForLocalMacIdentity(device)) {
      continue;
    }

    const normalizedDeviceHash = normalizeTokenHash(deviceHash);
    const matchesLocalInstall = localHashes.some((localHash) =>
      deviceMatchesLocalTokenHash(normalizedDeviceHash, localHash),
    );
    if (!matchesLocalInstall) {
      continue;
    }

    reachableMatchingHashes.push(normalizedDeviceHash);
  }

  const unique = [...new Set(reachableMatchingHashes)];
  return unique.length === 1 ? (unique[0] ?? null) : null;
};
