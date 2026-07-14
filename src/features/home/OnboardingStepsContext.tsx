"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { pairedDevicesResource } from "@/features/agent-witch/pairedDevicesResource";
import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import { useOptionalPairedDeviceContext } from "@/features/home/PairedDeviceContext";
import {
  loadOnboardingSteps,
  type OnboardingStep,
} from "@/features/home/loadOnboardingSteps";
import isConnectMacOnboardingStepDone from "@/features/home/utils/isConnectMacOnboardingStepDone";
import isWorkflowOnboardingStep from "@/features/home/utils/isWorkflowOnboardingStep";

interface OnboardingStepsContextValue {
  readonly steps: readonly OnboardingStep[];
  readonly isLoading: boolean;
  readonly reloadSteps: () => Promise<void>;
  readonly markWorkflowStepDone: () => void;
}

const OnboardingStepsContext =
  createContext<OnboardingStepsContextValue | null>(null);

export function OnboardingStepsProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
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

    return pairedDevicesResource.subscribe(() => {
      const snapshot = pairedDevicesResource.getSnapshot();
      if (snapshot === null) {
        return;
      }

      const paired = snapshot.devices.length > 0;
      setSteps((current) =>
        current.map((step) =>
          step.id === "pair" ? { ...step, done: paired } : step,
        ),
      );
    });
  }, [demoPreview, isConnectStepDone]);

  const reloadSteps = useCallback(async (): Promise<void> => {
    if (demoPreview) {
      return;
    }

    const loadedSteps = await loadOnboardingSteps();
    setSteps(loadedSteps);
    setIsLoading(false);
  }, [demoPreview]);

  const markWorkflowStepDone = useCallback((): void => {
    setSteps((current) =>
      current.map((step) =>
        isWorkflowOnboardingStep(step.id) ? { ...step, done: true } : step,
      ),
    );
  }, []);

  const value = useMemo(
    () => ({
      steps,
      isLoading,
      reloadSteps,
      markWorkflowStepDone,
    }),
    [steps, isLoading, reloadSteps, markWorkflowStepDone],
  );

  return (
    <OnboardingStepsContext.Provider value={value}>
      {children}
    </OnboardingStepsContext.Provider>
  );
}

const useOnboardingSteps = (): OnboardingStepsContextValue => {
  const context = useContext(OnboardingStepsContext);
  if (context === null) {
    throw new Error(
      "useOnboardingSteps must be used within OnboardingStepsProvider",
    );
  }

  return context;
};

export default useOnboardingSteps;
