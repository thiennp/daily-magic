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
import useOnboardingStepRefreshHooks from "@/features/home/hooks/useOnboardingStepRefreshHooks";
import {
  loadOnboardingSteps,
  type OnboardingStep,
} from "@/features/home/loadOnboardingSteps";
import hasUserAcknowledgedOnboardingSetup from "@/features/home/utils/hasUserAcknowledgedOnboardingSetup";
import { markOnboardingSetupAcknowledged } from "@/features/home/utils/onboardingSetupAcknowledgedStore";
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
  const [dbSetupAcknowledged, setDbSetupAcknowledged] = useState(false);
  const [isLoadingSetupAcknowledged, setIsLoadingSetupAcknowledged] =
    useState(true);

  const applyLoadedState = useCallback(
    (loaded: Awaited<ReturnType<typeof loadOnboardingSteps>>): void => {
      setSteps(loaded.steps);
      setDbSetupAcknowledged(loaded.setupAcknowledged);
      setIsLoadingSetupAcknowledged(false);
      setIsLoading(false);
    },
    [],
  );

  useEffect(() => {
    void loadOnboardingSteps().then(applyLoadedState);
  }, [applyLoadedState]);

  useEffect(() => {
    if (!hasPairedDevice) {
      return;
    }

    void loadOnboardingSteps().then((loaded) => {
      setSteps(loaded.steps);
      setDbSetupAcknowledged(loaded.setupAcknowledged);
    });
  }, [hasPairedDevice]);

  const reloadSteps = useCallback(async (): Promise<void> => {
    applyLoadedState(await loadOnboardingSteps());
  }, [applyLoadedState]);

  const markWorkflowStepDone = useCallback((): void => {
    markOnboardingWorkflowCreated();
    setSteps((current) =>
      current.map((step) =>
        isWorkflowOnboardingStep(step.id) ? { ...step, done: true } : step,
      ),
    );
  }, []);

  const acknowledgeSetup = useCallback((): void => {
    markOnboardingSetupAcknowledged();
    setDbSetupAcknowledged(true);
  }, []);

  useOnboardingStepRefreshHooks({ steps, reloadSteps, setSteps });

  const value = useMemo(
    () => ({
      steps,
      isLoading,
      isSetupAcknowledged:
        hasUserAcknowledgedOnboardingSetup(dbSetupAcknowledged),
      isLoadingSetupAcknowledged,
      reloadSteps,
      markWorkflowStepDone,
      acknowledgeSetup,
    }),
    [
      steps,
      isLoading,
      dbSetupAcknowledged,
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
