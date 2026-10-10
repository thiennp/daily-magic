"use client";

import { useMyMacDevices } from "@/features/agent/hooks/public-api/presentation";
import { useLocalMacHostname } from "@/features/home/hooks/public-api/presentation";
import { resolveHomeThisMacDeviceIdentity } from "@/features/home/utils/public-api/presentation";
import useIsMobileClient from "@/hooks/useIsMobileClient";

export type ThisComputerFolderTarget =
  | {
      readonly kind: "ready";
      readonly deviceId: string;
      readonly deviceName: string;
      readonly wakePort: number | null;
    }
  | { readonly kind: "mobile" }
  | { readonly kind: "unavailable" };

/** The only computer a folder can be added from: the open, online one running this browser. */
export const useThisComputerFolderTarget = (): ThisComputerFolderTarget => {
  const isMobile = useIsMobileClient();
  const { devices, displayNameById } = useMyMacDevices();
  const { localTokenHash } = useLocalMacHostname();
  if (isMobile) return { kind: "mobile" };
  const identity = resolveHomeThisMacDeviceIdentity({
    localTokenHash,
    devices,
  });
  const device = devices.find((item) => item.id === identity.thisMacDeviceId);
  if (!device || !identity.isReachable || !device.isOnline) {
    return { kind: "unavailable" };
  }
  return {
    kind: "ready",
    deviceId: device.id,
    deviceName: displayNameById.get(device.id) ?? device.deviceLabel ?? "",
    wakePort: device.wakePort,
  };
};
