"use client";

import { useSyncExternalStore } from "react";

import {
  getPairedDevicesSnapshotOrEmpty,
  pairedDevicesResource,
} from "@/features/agent-witch/pairedDevicesResource";
import { readAgentWitchLocalHostCookie } from "@/features/agent-witch/utils/agentWitchLocalHostCookie";

/**
 * Browser context for this Mac.
 * Presence comes only from the shared devices poll / WS hub — never localhost.
 */
const useLocalMacBrowserContext = (): {
  readonly localHostname: string | null;
  readonly isWakeServerReachable: boolean;
  readonly isCheckingLocalApp: boolean;
  readonly isLocalAppInstalled: boolean;
  readonly isBridgeConnected: boolean;
} => {
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
    localHostname: readAgentWitchLocalHostCookie(),
    isWakeServerReachable: true,
    isCheckingLocalApp: snapshot === null,
    isLocalAppInstalled: hasClaimedDevice || isBridgeConnected,
    isBridgeConnected,
  };
};

export default useLocalMacBrowserContext;
