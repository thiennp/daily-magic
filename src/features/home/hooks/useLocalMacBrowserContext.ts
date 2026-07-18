"use client";

import { useEffect, useState } from "react";

import { loadMyMacDevicesSnapshot } from "@/features/agent/hooks/fetchMyMacDevicesFromApi";
import { readAgentWitchLocalHostCookie } from "@/features/agent-witch/utils/agentWitchLocalHostCookie";

/**
 * Browser context for this Mac.
 * Presence comes only from cloud devices / WS hub — never localhost.
 */
const useLocalMacBrowserContext = (): {
  readonly localHostname: string | null;
  readonly isWakeServerReachable: boolean;
  readonly isCheckingLocalApp: boolean;
  readonly isLocalAppInstalled: boolean;
  readonly isBridgeConnected: boolean;
} => {
  const [localHostname] = useState<string | null>(() =>
    readAgentWitchLocalHostCookie(),
  );
  const [isBridgeConnected, setIsBridgeConnected] = useState(false);
  const [hasClaimedDevice, setHasClaimedDevice] = useState(false);
  const [isCheckingLocalApp, setIsCheckingLocalApp] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    void (async () => {
      const devicesSnapshot = await loadMyMacDevicesSnapshot().catch(() => ({
        devices: [] as const,
        hadError: true,
      }));

      if (abortController.signal.aborted) {
        return;
      }

      setHasClaimedDevice(devicesSnapshot.devices.length > 0);
      setIsBridgeConnected(
        devicesSnapshot.devices.some((device) => device.isConnected),
      );
      setIsCheckingLocalApp(false);
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  return {
    localHostname,
    isWakeServerReachable: true,
    isCheckingLocalApp,
    isLocalAppInstalled: hasClaimedDevice || isBridgeConnected,
    isBridgeConnected,
  };
};

export default useLocalMacBrowserContext;
