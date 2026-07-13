"use client";

import { useEffect, useState } from "react";

export interface MyMacDevice {
  readonly id: string;
  readonly deviceLabel: string | null;
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
      claimedAt: device.claimedAt,
      lastSeenAt: device.lastSeenAt,
      isOnline: device.isOnline === true,
      lastHeartbeatAt: device.lastHeartbeatAt ?? null,
    }));
};

const useMyMacDevices = (): {
  readonly devices: readonly MyMacDevice[];
  readonly isLoading: boolean;
} => {
  const [devices, setDevices] = useState<readonly MyMacDevice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    const loadDevices = async (): Promise<void> => {
      try {
        const response = await fetch("/api/agent-witch/devices", {
          signal: abortController.signal,
        });
        const payload: unknown = await response.json();

        if (!response.ok || abortController.signal.aborted) {
          return;
        }

        setDevices(parseMyMacDevices(payload));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadDevices();
    const timer = window.setInterval(() => {
      void loadDevices();
    }, MY_MAC_DEVICES_POLL_INTERVAL_MS);

    return () => {
      abortController.abort();
      window.clearInterval(timer);
    };
  }, []);

  return { devices, isLoading };
};

export default useMyMacDevices;
