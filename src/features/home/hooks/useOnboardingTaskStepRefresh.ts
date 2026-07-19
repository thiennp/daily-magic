import { useEffect, useRef } from "react";

import { debounceCallback } from "@/features/home/utils/debounceCallback";
import { AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT } from "@/features/reports/agentRunLocalCache";

const ONBOARDING_TASK_STEP_CACHE_DEBOUNCE_MS = 400;

const useOnboardingTaskStepRefresh = (input: {
  readonly isTaskStepDone: boolean;
  readonly reloadSteps: () => Promise<void>;
}): void => {
  const { isTaskStepDone, reloadSteps } = input;
  const reloadStepsRef = useRef(reloadSteps);

  useEffect(() => {
    reloadStepsRef.current = reloadSteps;
  }, [reloadSteps]);

  useEffect(() => {
    if (isTaskStepDone) {
      return;
    }

    const refreshTaskStep = (): void => {
      void reloadStepsRef.current();
    };
    const debouncedRefreshFromCache = debounceCallback(
      refreshTaskStep,
      ONBOARDING_TASK_STEP_CACHE_DEBOUNCE_MS,
    );

    const handleVisibilityChange = (): void => {
      if (document.visibilityState === "visible") {
        refreshTaskStep();
      }
    };

    window.addEventListener("focus", refreshTaskStep);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener(
      AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT,
      debouncedRefreshFromCache,
    );

    return () => {
      window.removeEventListener("focus", refreshTaskStep);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener(
        AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT,
        debouncedRefreshFromCache,
      );
    };
  }, [isTaskStepDone]);
};

export default useOnboardingTaskStepRefresh;
