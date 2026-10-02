import { deviceMatchesLocalTokenHash } from "@/features/agent-witch/online-wake/deviceMatchesLocalTokenHash";
import type { MacDevicePresence } from "@/features/agent-witch/online-wake/macDevicePresence";

import { macDeviceIsReachableForLocalMacIdentity } from "./macDeviceIsReachableForLocalMacIdentity";

export const deviceMatchesReachableLocalTokenHash = (
  device: MacDevicePresence & { readonly tokenHash: string | null },
  localTokenHash: string,
): boolean =>
  deviceMatchesLocalTokenHash(device.tokenHash, localTokenHash) &&
  macDeviceIsReachableForLocalMacIdentity(device);
