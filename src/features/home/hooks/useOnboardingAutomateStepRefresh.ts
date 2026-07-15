import { useEffect } from "react";

import { ONBOARDING_AUTOMATION_CREATED_UPDATED_EVENT } from "@/features/home/utils/onboardingAutomationCreatedEvents";

const useOnboardingAutomateStepRefresh = (input: {
  readonly isAutomateStepDone: boolean;
  readonly reloadSteps: () => Promise<void>;
}): void => {
  useEffect(() => {
    if (input.isAutomateStepDone) {
      return;
    }

    const refreshAutomateStep = (): void => {
      void input.reloadSteps();
    };

    const handleVisibilityChange = (): void => {
      if (document.visibilityState === "visible") {
        refreshAutomateStep();
      }
    };

    window.addEventListener("focus", refreshAutomateStep);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener(
      ONBOARDING_AUTOMATION_CREATED_UPDATED_EVENT,
      refreshAutomateStep,
    );

    return () => {
      window.removeEventListener("focus", refreshAutomateStep);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener(
        ONBOARDING_AUTOMATION_CREATED_UPDATED_EVENT,
        refreshAutomateStep,
      );
    };
  }, [input.isAutomateStepDone, input.reloadSteps]);
};

export default useOnboardingAutomateStepRefresh;
