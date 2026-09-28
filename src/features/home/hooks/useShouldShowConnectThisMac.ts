"use client";

import { useSyncExternalStore } from "react";

import useHomeConnectedMacs from "@/features/home/hooks/useHomeConnectedMacs";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";
import isMobileBrowser from "@/features/home/utils/isMobileBrowser";
import { resolveShouldShowConnectThisMac } from "@/features/home/utils/resolveShouldShowConnectThisMac";

const subscribeToOperatingSystem = () => () => undefined;

const getServerOperatingSystemSnapshot = () => "other" as const;

const getServerMobileBrowserSnapshot = () => false;

const useShouldShowConnectThisMac = (): boolean => {
  const { devices } = useHomeConnectedMacs();
  const { localTokenHash, isCheckingLocalHostname } =
    useLocalMacBrowserContext();
  const operatingSystem = useSyncExternalStore(
    subscribeToOperatingSystem,
    detectBrowserOperatingSystem,
    getServerOperatingSystemSnapshot,
  );
  const mobileBrowser = useSyncExternalStore(
    subscribeToOperatingSystem,
    isMobileBrowser,
    getServerMobileBrowserSnapshot,
  );

  return resolveShouldShowConnectThisMac({
    operatingSystem,
    localTokenHash,
    isCheckingLocalHostname,
    isMobileBrowser: mobileBrowser,
    devices,
  });
};

export default useShouldShowConnectThisMac;
