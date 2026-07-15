"use client";

import { useCallback, useSyncExternalStore } from "react";

import {
  getPairedDevicesSnapshotOrEmpty,
  pairedDevicesResource,
  refreshPairedDevices,
} from "@/features/agent-witch/pairedDevicesResource";
import useSubscribeMacDeviceRevoked from "@/features/agent-witch/macDevices/hooks/useSubscribeMacDeviceRevoked";

interface UseHasPairedDeviceResult {
  readonly hasPairedDevice: boolean;
  readonly isLoading: boolean;
  readonly refresh: () => Promise<void>;
  readonly markPaired: () => void;
}

export function useHasPairedDevice(): UseHasPairedDeviceResult {
  const snapshot = useSyncExternalStore(
    pairedDevicesResource.subscribe,
    () => pairedDevicesResource.getSnapshot(),
    () => null,
  );
  const resolvedSnapshot = snapshot ?? getPairedDevicesSnapshotOrEmpty();
  const hasPairedDevice = resolvedSnapshot.devices.length > 0;
  const isLoading = snapshot === null;

  const refresh = useCallback(async (): Promise<void> => {
    await refreshPairedDevices();
  }, []);

  const markPaired = useCallback((): void => {
    void refresh();
  }, [refresh]);

  useSubscribeMacDeviceRevoked(
    useCallback(() => {
      void refresh();
    }, [refresh]),
  );

  return { hasPairedDevice, isLoading, refresh, markPaired };
}
