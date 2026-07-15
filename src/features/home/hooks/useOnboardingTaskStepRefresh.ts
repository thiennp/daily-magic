import { useEffect } from "react";

import { AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT } from "@/features/reports/agentRunLocalCache";

const useOnboardingTaskStepRefresh = (input: {
  readonly demoPreview: unknown;
  readonly isTaskStepDone: boolean;
  readonly reloadSteps: () => Promise<void>;
}): void => {
  useEffect(() => {
    if (input.demoPreview || input.isTaskStepDone) {
      return;
    }

    const refreshTaskStep = (): void => {
      void input.reloadSteps();
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
  }, [input.demoPreview, input.isTaskStepDone, input.reloadSteps]);
};

export default useOnboardingTaskStepRefresh;
