import type { LocalAgentWitchIdentitySnapshot } from "@/features/agent-witch/localAgentWitchIdentitySnapshot.type";
import { resolveLocalTokenHashMatchesReachableDevice } from "@/features/agent-witch/utils/resolveLocalTokenHashMatchesReachableDevice";
import type { MacDevicePresence } from "@/features/agent-witch/online-wake/macDevicePresence";
import { resolveLocalMacTokenHashFromWakeIdentity } from "@/features/home/utils/resolveLocalMacTokenHashFromWakeIdentity";

export const applyWakeIdentityToLocalMacTokenHash = (input: {
  readonly identity: NonNullable<LocalAgentWitchIdentitySnapshot["identity"]>;
  readonly currentTokenHash: string | null;
  readonly devices: readonly (MacDevicePresence & {
    readonly tokenHash: string | null;
  })[];
}): string | null => {
  const activeTokenHash = input.identity.tokenHash;

  return resolveLocalMacTokenHashFromWakeIdentity({
    currentTokenHash: input.currentTokenHash,
    activeTokenHash,
    localTokenHashes: input.identity.tokenHashes,
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
