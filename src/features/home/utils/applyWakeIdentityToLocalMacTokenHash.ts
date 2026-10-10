import type { LocalAgentWitchIdentitySnapshot } from "@/features/agent-witch/localAgentWitchIdentitySnapshot.type";
import { resolveLocalTokenHashMatchesReachableDevice } from "@/features/agent-witch/utils/public-api/presentation";
import { resolveSoleReachableLocalTokenHash } from "@/features/agent-witch/utils/public-api/presentation";
import type { MacDevicePresence } from "@/features/agent-witch/online-wake/public-api/types";
import { resolveLocalMacTokenHashFromWakeIdentity } from "@/features/home/utils/resolveLocalMacTokenHashFromWakeIdentity";

export const applyWakeIdentityToLocalMacTokenHash = (input: {
  readonly identity: NonNullable<LocalAgentWitchIdentitySnapshot["identity"]>;
  readonly currentTokenHash: string | null;
  readonly devices: readonly (MacDevicePresence & {
    readonly tokenHash: string | null;
  })[];
}): string | null => {
  const activeTokenHash = input.identity.tokenHash;
  const soleReachableLocalTokenHash = resolveSoleReachableLocalTokenHash({
    devices: input.devices,
    localTokenHashes: input.identity.tokenHashes,
  });

  return resolveLocalMacTokenHashFromWakeIdentity({
    currentTokenHash: input.currentTokenHash,
    activeTokenHash,
    localTokenHashes: input.identity.tokenHashes,
    soleReachableLocalTokenHash,
    currentTokenHashMatchesReachableDevice:
      resolveLocalTokenHashMatchesReachableDevice({
        localTokenHash: input.currentTokenHash,
        devices: input.devices,
      }),
    activeTokenHashMatchesReachableDevice:
      activeTokenHash !== null
        ? resolveLocalTokenHashMatchesReachableDevice({
            localTokenHash: activeTokenHash,
            devices: input.devices,
          })
        : false,
  });
};
