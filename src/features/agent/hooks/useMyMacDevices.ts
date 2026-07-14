"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { buildMacDeviceDisplayNameById } from "@/features/agent-witch/utils/resolveMacDeviceDisplayName";

export interface MyMacDevice {
  readonly id: string;
  readonly deviceLabel: string | null;
  readonly displayName: string | null;
  readonly claimedAt: string;
  readonly lastSeenAt: string | null;
  readonly isOnline: boolean;
  readonly lastHeartbeatAt: string | null;
}

interface ApiMacDevice extends MyMacDevice {
  readonly isActive?: boolean;
}

const MY_MAC_DEVICES_POLL_INTERVAL_MS = 5_000;

const parseMyMacDevices = (payload: unknown): readonly MyMacDevice[] => {
  if (
    typeof payload !== "object" ||
    payload === null ||
    !Array.isArray((payload as { devices?: unknown }).devices)
  ) {
    return [];
  }

  return (payload as { devices: ApiMacDevice[] }).devices
    .filter((device) => device.isActive !== false)
    .map((device) => ({
      id: device.id,
      deviceLabel: device.deviceLabel,
      displayName:
        typeof device.displayName === "string" ? device.displayName : null,
      claimedAt: device.claimedAt,
      lastSeenAt: device.lastSeenAt,
      isOnline: device.isOnline === true,
      lastHeartbeatAt: device.lastHeartbeatAt ?? null,
    }));
};

const useMyMacDevices = (): {
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly isLoading: boolean;
  readonly refresh: () => Promise<void>;
  readonly renameDevice: (deviceId: string, displayName: string) => void;
} => {
  const [devices, setDevices] = useState<readonly MyMacDevice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadDevices = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch("/api/agent-witch/devices");
      const payload: unknown = await response.json();

      if (!response.ok) {
        return;
      }

      setDevices(parseMyMacDevices(payload));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
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
  }, [loadDevices]);

  const displayNameById = useMemo(
    () => buildMacDeviceDisplayNameById(devices),
    [devices],
  );

  const renameDevice = useCallback((deviceId: string, displayName: string) => {
    setDevices((current) =>
      current.map((device) =>
        device.id === deviceId ? { ...device, displayName } : device,
      ),
    );
  }, []);

  return {
    devices,
    displayNameById,
    isLoading,
    refresh: loadDevices,
    renameDevice,
  };
};

export default useMyMacDevices;
