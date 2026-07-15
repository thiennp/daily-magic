import { useEffect } from "react";

import { ONBOARDING_WORKFLOW_CREATED_UPDATED_EVENT } from "@/features/home/utils/onboardingWorkflowCreatedEvents";

const useOnboardingWorkflowStepRefresh = (input: {
  readonly isWorkflowStepDone: boolean;
  readonly reloadSteps: () => Promise<void>;
}): void => {
  useEffect(() => {
    if (input.isWorkflowStepDone) {
      return;
    }

    const refreshWorkflowStep = (): void => {
      void input.reloadSteps();
    };

    const handleVisibilityChange = (): void => {
      if (document.visibilityState === "visible") {
        refreshWorkflowStep();
      }
    };

    window.addEventListener("focus", refreshWorkflowStep);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener(
      ONBOARDING_WORKFLOW_CREATED_UPDATED_EVENT,
      refreshWorkflowStep,
    );

    return () => {
      window.removeEventListener("focus", refreshWorkflowStep);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener(
        ONBOARDING_WORKFLOW_CREATED_UPDATED_EVENT,
        refreshWorkflowStep,
      );
    };
  }, [input.isWorkflowStepDone, input.reloadSteps]);
};

export default useOnboardingWorkflowStepRefresh;
