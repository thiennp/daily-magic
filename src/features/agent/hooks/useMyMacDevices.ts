"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useConnectionLab } from "@/features/agent-witch/connection-lab/ConnectionLabContext";
import { buildMacDeviceDisplayNameById } from "@/features/agent-witch/utils/resolveMacDeviceDisplayName";
import { resolveMyMacDevicesAfterFetch } from "@/features/agent-witch/utils/resolveMyMacDevicesAfterFetch";
import { loadMyMacDevicesSnapshot } from "@/features/agent/hooks/fetchMyMacDevicesFromApi";

export interface MyMacDevice {
  readonly id: string;
  readonly deviceLabel: string | null;
  readonly displayName: string | null;
  readonly claimedAt: string;
  readonly lastSeenAt: string | null;
  readonly isOnline: boolean;
  readonly lastHeartbeatAt: string | null;
}

const MY_MAC_DEVICES_POLL_INTERVAL_MS = 5_000;

const useMyMacDevices = (): {
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly isLoading: boolean;
  readonly refresh: () => Promise<void>;
  readonly renameDevice: (deviceId: string, displayName: string) => void;
} => {
  const connectionLab = useConnectionLab();
  const [devices, setDevices] = useState<readonly MyMacDevice[]>([]);
  const [isLoading, setIsLoading] = useState(connectionLab === null);
  const resolvedDevices = connectionLab?.mockDevices ?? devices;
  const resolvedIsLoading = connectionLab !== null ? false : isLoading;

  const loadDevices = useCallback(async (): Promise<void> => {
    if (connectionLab !== null) {
      return;
    }

    try {
      const snapshot = await loadMyMacDevicesSnapshot();
      setDevices((current) =>
        resolveMyMacDevicesAfterFetch(
          current,
          snapshot.devices,
          snapshot.hadError,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  }, [connectionLab]);

  useEffect(() => {
    if (connectionLab !== null) {
      return;
    }

    const abortController = new AbortController();

    const pollDevices = async (): Promise<void> => {
      if (abortController.signal.aborted) {
        return;
      }

      await loadDevices();
    };

    void pollDevices();
    const timer = window.setInterval(() => {
      void pollDevices();
    }, MY_MAC_DEVICES_POLL_INTERVAL_MS);

    return () => {
      abortController.abort();
      window.clearInterval(timer);
    };
  }, [connectionLab, loadDevices]);

  const displayNameById = useMemo(
    () => buildMacDeviceDisplayNameById(resolvedDevices),
    [resolvedDevices],
  );

  const renameDevice = useCallback((deviceId: string, displayName: string) => {
    setDevices((current) =>
      current.map((device) =>
        device.id === deviceId ? { ...device, displayName } : device,
      ),
    );
  }, []);

  return {
    devices: resolvedDevices,
    displayNameById,
    isLoading: resolvedIsLoading,
    refresh: loadDevices,
    renameDevice,
  };
};

export default useMyMacDevices;
