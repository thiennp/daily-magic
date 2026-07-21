"use client";

import { useMemo } from "react";

import { deviceMatchesLocalTokenHash } from "@/features/agent-witch/online-wake";
import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import useLocalMacHostname from "@/features/home/hooks/useLocalMacHostname";

export const useIsAgentLiveSessionThisMac = (
  sessionDeviceId: string | null | undefined,
): boolean => {
  const { devices } = useMyMacDevices();
  const { localTokenHash } = useLocalMacHostname();

  return useMemo(() => {
    if (
      localTokenHash === null ||
      sessionDeviceId === null ||
      sessionDeviceId === undefined ||
      sessionDeviceId.length === 0
    ) {
      return false;
    }

    const device = devices.find((entry) => entry.id === sessionDeviceId);
    if (device === undefined) {
      return false;
    }

    return deviceMatchesLocalTokenHash(device.tokenHash, localTokenHash);
  }, [devices, localTokenHash, sessionDeviceId]);
};
