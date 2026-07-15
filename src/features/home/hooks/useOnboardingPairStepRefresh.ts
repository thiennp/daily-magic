import { useEffect } from "react";

const useOnboardingPairStepRefresh = (input: {
  readonly isConnectStepDone: boolean;
  readonly reloadSteps: () => Promise<void>;
}): void => {
  useEffect(() => {
    if (input.isConnectStepDone) {
      return;
    }

    const refreshPairStep = (): void => {
      void input.reloadSteps();
    };

    const handleVisibilityChange = (): void => {
      if (document.visibilityState === "visible") {
        refreshPairStep();
      }
    };

    window.addEventListener("focus", refreshPairStep);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", refreshPairStep);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [input.isConnectStepDone, input.reloadSteps]);
};

export default useOnboardingPairStepRefresh;
