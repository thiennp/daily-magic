"use client";

import { useCallback, useSyncExternalStore } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import {
  getPairedDevicesSnapshotOrEmpty,
  pairedDevicesResource,
  refreshPairedDevices,
} from "@/features/agent-witch/pairedDevicesResource";
import useSubscribeMacDeviceRevoked from "@/features/agent-witch/macDevices/hooks/useSubscribeMacDeviceRevoked";
import isConnectMacOnboardingStepDone from "@/features/home/utils/isConnectMacOnboardingStepDone";

interface UseHasPairedDeviceResult {
  readonly hasPairedDevice: boolean;
  readonly isLoading: boolean;
  readonly refresh: () => Promise<void>;
  readonly markPaired: () => void;
}

const isDemoComputerConnected = (
  onboardingSteps: ReadonlyArray<{
    readonly id: string;
    readonly done: boolean;
  }>,
): boolean => isConnectMacOnboardingStepDone(onboardingSteps);

export function useHasPairedDevice(): UseHasPairedDeviceResult {
  const demoPreview = useDemoPreview();
  const isDemoMode = demoPreview !== null;
  const demoHasPairedDevice =
    isDemoMode && isDemoComputerConnected(demoPreview.onboardingSteps);
  const snapshot = useSyncExternalStore(
    pairedDevicesResource.subscribe,
    () => pairedDevicesResource.getSnapshot(),
    () => null,
  );
  const resolvedSnapshot = snapshot ?? getPairedDevicesSnapshotOrEmpty();
  const hasPairedDevice = isDemoMode
    ? demoHasPairedDevice
    : resolvedSnapshot.devices.length > 0;
  const isLoading = isDemoMode ? false : snapshot === null;

  const refresh = useCallback(async (): Promise<void> => {
    if (isDemoMode) {
      return;
    }

    await refreshPairedDevices();
  }, [isDemoMode]);

  const markPaired = useCallback((): void => {
    if (isDemoMode) {
      return;
    }

    void refresh();
  }, [isDemoMode, refresh]);

  useSubscribeMacDeviceRevoked(
    useCallback(() => {
      void refresh();
    }, [refresh]),
  );

  if (isDemoMode) {
    return {
      hasPairedDevice: demoHasPairedDevice,
      isLoading: false,
      refresh: async () => undefined,
      markPaired: () => undefined,
    };
  }

  return { hasPairedDevice, isLoading, refresh, markPaired };
}
