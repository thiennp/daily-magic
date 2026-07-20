"use client";

import { useSyncExternalStore } from "react";

import {
  getPairedDevicesSnapshotOrEmpty,
  pairedDevicesResource,
} from "@/features/agent-witch/pairedDevicesResource";
import useLocalMacHostname from "@/features/home/hooks/useLocalMacHostname";

/**
 * Browser context for this Mac.
 * Hostname comes from the wake-server identity endpoint on macOS only.
 */
const useLocalMacBrowserContext = (): {
  readonly localHostname: string | null;
  readonly isCheckingLocalHostname: boolean;
  readonly isWakeServerReachable: boolean;
  readonly isCheckingLocalApp: boolean;
  readonly isLocalAppInstalled: boolean;
  readonly isBridgeConnected: boolean;
} => {
  const { localHostname, isCheckingLocalHostname } = useLocalMacHostname();
  const snapshot = useSyncExternalStore(
    pairedDevicesResource.subscribe,
    () => pairedDevicesResource.getSnapshot(),
    () => null,
  );
  const resolved = snapshot ?? getPairedDevicesSnapshotOrEmpty();
  const isBridgeConnected = resolved.devices.some(
    (device) => device.isConnected,
  );
  const hasClaimedDevice = resolved.devices.length > 0;

  return {
    localHostname,
    isCheckingLocalHostname,
    isWakeServerReachable: localHostname !== null,
    isCheckingLocalApp: snapshot === null || isCheckingLocalHostname,
    isLocalAppInstalled: hasClaimedDevice || isBridgeConnected,
    isBridgeConnected,
  };
};

export default useLocalMacBrowserContext;
