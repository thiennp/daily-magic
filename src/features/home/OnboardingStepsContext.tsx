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
import useOnboardingSetupAcknowledgedState from "@/features/home/hooks/useOnboardingSetupAcknowledgedState";
import useOnboardingStepRefreshHooks from "@/features/home/hooks/useOnboardingStepRefreshHooks";
import {
  loadOnboardingSteps,
  type OnboardingStep,
} from "@/features/home/loadOnboardingSteps";
import isWorkflowOnboardingStep from "@/features/home/utils/isWorkflowOnboardingStep";
import { markOnboardingWorkflowCreated } from "@/features/home/utils/onboardingWorkflowCreatedStore";

interface OnboardingStepsContextValue {
  readonly steps: readonly OnboardingStep[];
  readonly isLoading: boolean;
  readonly isSetupAcknowledged: boolean;
  readonly isLoadingSetupAcknowledged: boolean;
  readonly reloadSteps: () => Promise<void>;
  readonly markWorkflowStepDone: () => void;
  readonly acknowledgeSetup: () => void;
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
  const { isSetupAcknowledged, isLoadingSetupAcknowledged, acknowledgeSetup } =
    useOnboardingSetupAcknowledgedState();

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
    markOnboardingWorkflowCreated();
    setSteps((current) =>
      current.map((step) =>
        isWorkflowOnboardingStep(step.id) ? { ...step, done: true } : step,
      ),
    );
  }, []);

  useOnboardingStepRefreshHooks({ steps, reloadSteps, setSteps });

  const value = useMemo(
    () => ({
      steps,
      isLoading,
      isSetupAcknowledged,
      isLoadingSetupAcknowledged,
      reloadSteps,
      markWorkflowStepDone,
      acknowledgeSetup,
    }),
    [
      steps,
      isLoading,
      isSetupAcknowledged,
      isLoadingSetupAcknowledged,
      reloadSteps,
      markWorkflowStepDone,
      acknowledgeSetup,
    ],
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
