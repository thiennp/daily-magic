"use client";

import { deviceMatchesLocalTokenHash } from "@/features/agent-witch/online-wake";
import useHomeConnectedMacs from "@/features/home/hooks/useHomeConnectedMacs";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";

const useThisMacHasConnectedLocalBridge = (): boolean => {
  const { devices } = useHomeConnectedMacs();
  const { localTokenHash } = useLocalMacBrowserContext();

  if (localTokenHash === null) {
    return false;
  }

  return devices.some(
    (device) =>
      device.isConnected === true &&
      deviceMatchesLocalTokenHash(device.tokenHash, localTokenHash),
  );
};

export default useThisMacHasConnectedLocalBridge;
