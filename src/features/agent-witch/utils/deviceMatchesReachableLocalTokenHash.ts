import { deviceMatchesLocalTokenHash } from "@/features/agent-witch/online-wake/public-api/presentation";
import type { MacDevicePresence } from "@/features/agent-witch/online-wake/public-api/types";

import { macDeviceIsReachableForLocalMacIdentity } from "./macDeviceIsReachableForLocalMacIdentity";

export const deviceMatchesReachableLocalTokenHash = (
  device: MacDevicePresence & { readonly tokenHash: string | null },
  localTokenHash: string,
): boolean =>
  deviceMatchesLocalTokenHash(device.tokenHash, localTokenHash) &&
  macDeviceIsReachableForLocalMacIdentity(device);
