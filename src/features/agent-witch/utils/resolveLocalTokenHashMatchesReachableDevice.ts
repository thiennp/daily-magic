import { deviceMatchesLocalTokenHash } from "@/features/agent-witch/online-wake/deviceMatchesLocalTokenHash";
import {
  resolveMacPresenceTier,
  type MacDevicePresence,
} from "@/features/agent-witch/online-wake/macDevicePresence";

export const resolveLocalTokenHashMatchesReachableDevice = (input: {
  readonly localTokenHash: string | null;
  readonly devices: readonly (MacDevicePresence & {
    readonly tokenHash: string | null;
  })[];
}): boolean => {
  const localTokenHash = input.localTokenHash;
  if (localTokenHash === null) {
    return false;
  }

  return input.devices.some((device) => {
    if (
      device.tokenHash === null ||
      !deviceMatchesLocalTokenHash(device.tokenHash, localTokenHash)
    ) {
      return false;
    }

    const tier = resolveMacPresenceTier(device);
    return (
      tier === "live" || tier === "live_other_instance" || tier === "recent"
    );
  });
};
