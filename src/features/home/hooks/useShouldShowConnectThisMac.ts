"use client";

import { useSyncExternalStore } from "react";

import useHomeConnectedMacs from "@/features/home/hooks/useHomeConnectedMacs";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import {
  detectBrowserOperatingSystem,
  resolveShouldShowConnectThisMac,
} from "@/features/home/utils/public-api/presentation";
import useIsMobileClient from "@/hooks/useIsMobileClient";

const subscribeToOperatingSystem = () => () => undefined;

const getServerOperatingSystemSnapshot = () => "other" as const;

const useShouldShowConnectThisMac = (): boolean => {
  const { devices } = useHomeConnectedMacs();
  const { localTokenHash, isCheckingLocalHostname } =
    useLocalMacBrowserContext();
  const operatingSystem = useSyncExternalStore(
    subscribeToOperatingSystem,
    detectBrowserOperatingSystem,
    getServerOperatingSystemSnapshot,
  );
  const mobileBrowser = useIsMobileClient();

  return resolveShouldShowConnectThisMac({
    operatingSystem,
    localTokenHash,
    isCheckingLocalHostname,
    isMobileBrowser: mobileBrowser,
    devices,
  });
};

export default useShouldShowConnectThisMac;
