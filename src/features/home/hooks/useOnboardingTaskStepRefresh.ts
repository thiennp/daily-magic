import { useEffect } from "react";

import { AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT } from "@/features/reports/agentRunLocalCache";

const useOnboardingTaskStepRefresh = (input: {
  readonly isTaskStepDone: boolean;
  readonly reloadSteps: () => Promise<void>;
}): void => {
  const { isTaskStepDone, reloadSteps } = input;

  useEffect(() => {
    if (isTaskStepDone) {
      return;
    }

    const refreshTaskStep = (): void => {
      void reloadSteps();
    };

    const handleVisibilityChange = (): void => {
      if (document.visibilityState === "visible") {
        refreshTaskStep();
      }
    };

    window.addEventListener("focus", refreshTaskStep);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener(
      AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT,
      refreshTaskStep,
    );

    return () => {
      window.removeEventListener("focus", refreshTaskStep);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener(
        AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT,
        refreshTaskStep,
      );
    };
  }, [isTaskStepDone, reloadSteps]);
};

export default useOnboardingTaskStepRefresh;
