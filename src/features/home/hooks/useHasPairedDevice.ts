"use client";

import { useCallback, useEffect, useState } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import { fetchActivePairedDevices } from "@/features/harness/utils/pairedDevicesApi";

interface UseHasPairedDeviceResult {
  readonly hasPairedDevice: boolean;
  readonly isLoading: boolean;
  readonly refresh: () => Promise<void>;
}

const isDemoComputerConnected = (
  onboardingSteps: ReadonlyArray<{
    readonly id: string;
    readonly done: boolean;
  }>,
): boolean =>
  onboardingSteps.some(
    (step) =>
      (step.id === "pair" || step.id === "connect-mac") && step.done === true,
  );

const PAIRED_DEVICE_POLL_INTERVAL_MS = 30_000;

export function useHasPairedDevice(): UseHasPairedDeviceResult {
  const demoPreview = useDemoPreview();
  const isDemoMode = demoPreview !== null;
  const demoHasPairedDevice =
    isDemoMode && isDemoComputerConnected(demoPreview.onboardingSteps);
  const [hasPairedDevice, setHasPairedDevice] = useState(demoHasPairedDevice);
  const [isLoading, setIsLoading] = useState(!isDemoMode);

  const refresh = useCallback(async (): Promise<void> => {
    if (isDemoMode) {
      return;
    }

    const result = await fetchActivePairedDevices();
    setHasPairedDevice(result.devices.length > 0);
    setIsLoading(false);
  }, [isDemoMode]);

  useEffect(() => {
    if (isDemoMode) {
      return;
    }

    void fetchActivePairedDevices().then((result) => {
      setHasPairedDevice(result.devices.length > 0);
      setIsLoading(false);
    });
  }, [isDemoMode]);

  useEffect(() => {
    if (isDemoMode || hasPairedDevice) {
      return;
    }

    const timer = setInterval(() => {
      void refresh();
    }, PAIRED_DEVICE_POLL_INTERVAL_MS);

    return () => {
      clearInterval(timer);
    };
  }, [isDemoMode, hasPairedDevice, refresh]);

  if (isDemoMode) {
    return {
      hasPairedDevice: demoHasPairedDevice,
      isLoading: false,
      refresh: async () => undefined,
    };
  }

  return { hasPairedDevice, isLoading, refresh };
}
