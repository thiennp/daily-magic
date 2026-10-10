import { deviceMatchesReachableLocalTokenHash } from "@/features/agent-witch/utils/deviceMatchesReachableLocalTokenHash";
import type { MacDevicePresence } from "@/features/agent-witch/online-wake/public-api/types";

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

  return input.devices.some((device) =>
    deviceMatchesReachableLocalTokenHash(device, localTokenHash),
  );
};
