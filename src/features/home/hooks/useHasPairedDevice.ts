"use client";

import { useEffect, useState } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import { fetchActivePairedDevices } from "@/features/harness/utils/pairedDevicesApi";

interface UseHasPairedDeviceResult {
  readonly hasPairedDevice: boolean;
  readonly isLoading: boolean;
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

export function useHasPairedDevice(): UseHasPairedDeviceResult {
  const demoPreview = useDemoPreview();
  const isDemoMode = demoPreview !== null;
  const demoHasPairedDevice =
    isDemoMode && isDemoComputerConnected(demoPreview.onboardingSteps);
  const [hasPairedDevice, setHasPairedDevice] = useState(demoHasPairedDevice);
  const [isLoading, setIsLoading] = useState(!isDemoMode);

  useEffect(() => {
    if (isDemoMode) {
      return;
    }

    void fetchActivePairedDevices().then((result) => {
      setHasPairedDevice(result.devices.length > 0);
      setIsLoading(false);
    });
  }, [isDemoMode]);

  if (isDemoMode) {
    return {
      hasPairedDevice: demoHasPairedDevice,
      isLoading: false,
    };
  }

  return { hasPairedDevice, isLoading };
}
