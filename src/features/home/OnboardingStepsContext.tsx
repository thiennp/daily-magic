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

import { useOptionalPairedDeviceContext } from "@/features/home/PairedDeviceContext";
import useOnboardingAutomateStepRefresh from "@/features/home/hooks/useOnboardingAutomateStepRefresh";
import useOnboardingPairStepSync from "@/features/home/hooks/useOnboardingPairStepSync";
import useOnboardingTaskStepRefresh from "@/features/home/hooks/useOnboardingTaskStepRefresh";
import {
  loadOnboardingSteps,
  type OnboardingStep,
} from "@/features/home/loadOnboardingSteps";
import isAutomateOnboardingStepDone from "@/features/home/utils/isAutomateOnboardingStepDone";
import isConnectMacOnboardingStepDone from "@/features/home/utils/isConnectMacOnboardingStepDone";
import isTaskOnboardingStepDone from "@/features/home/utils/isTaskOnboardingStepDone";
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
  const pairedDeviceContext = useOptionalPairedDeviceContext();
  const hasPairedDevice = pairedDeviceContext?.hasPairedDevice ?? false;
  const [steps, setSteps] = useState<readonly OnboardingStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void loadOnboardingSteps().then((loadedSteps) => {
      setSteps(loadedSteps);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!hasPairedDevice) {
      return;
    }

    void loadOnboardingSteps().then(setSteps);
  }, [hasPairedDevice]);

  const reloadSteps = useCallback(async (): Promise<void> => {
    const loadedSteps = await loadOnboardingSteps();
    setSteps(loadedSteps);
    setIsLoading(false);
  }, []);

  const markWorkflowStepDone = useCallback((): void => {
    setSteps((current) =>
      current.map((step) =>
        isWorkflowOnboardingStep(step.id) ? { ...step, done: true } : step,
      ),
    );
  }, []);

  useOnboardingPairStepSync({
    isConnectStepDone: isConnectMacOnboardingStepDone(steps),
    setSteps,
  });
  useOnboardingTaskStepRefresh({
    isTaskStepDone: isTaskOnboardingStepDone(steps),
    reloadSteps,
  });
  useOnboardingAutomateStepRefresh({
    isAutomateStepDone: isAutomateOnboardingStepDone(steps),
    reloadSteps,
  });

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
