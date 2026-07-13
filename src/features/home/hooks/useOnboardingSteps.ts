"use client";

import { useEffect, useState } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import { useOptionalPairedDeviceContext } from "@/features/home/PairedDeviceContext";
import {
  loadOnboardingSteps,
  type OnboardingStep,
} from "@/features/home/loadOnboardingSteps";
import isConnectMacOnboardingStepDone from "@/features/home/utils/isConnectMacOnboardingStepDone";

const ONBOARDING_STEPS_POLL_INTERVAL_MS = 5_000;

const useOnboardingSteps = (): {
  readonly steps: readonly OnboardingStep[];
  readonly isLoading: boolean;
} => {
  const demoPreview = useDemoPreview();
  const pairedDeviceContext = useOptionalPairedDeviceContext();
  const hasPairedDevice = pairedDeviceContext?.hasPairedDevice ?? false;
  const [steps, setSteps] = useState<readonly OnboardingStep[]>(
    demoPreview?.onboardingSteps ?? [],
  );
  const [isLoading, setIsLoading] = useState(() => !demoPreview);

  useEffect(() => {
    if (demoPreview) {
      return;
    }

    void loadOnboardingSteps().then((loadedSteps) => {
      setSteps(loadedSteps);
      setIsLoading(false);
    });
  }, [demoPreview]);

  useEffect(() => {
    if (demoPreview || !hasPairedDevice) {
      return;
    }

    void loadOnboardingSteps().then(setSteps);
  }, [demoPreview, hasPairedDevice]);

  const isConnectStepDone = isConnectMacOnboardingStepDone(steps);

  useEffect(() => {
    if (demoPreview || isConnectStepDone) {
      return;
    }

    const timer = setInterval(() => {
      void loadOnboardingSteps().then(setSteps);
    }, ONBOARDING_STEPS_POLL_INTERVAL_MS);

    return () => {
      clearInterval(timer);
    };
  }, [demoPreview, isConnectStepDone]);

  return { steps, isLoading };
};

export default useOnboardingSteps;
