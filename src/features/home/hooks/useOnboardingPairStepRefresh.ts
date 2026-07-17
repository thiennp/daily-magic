import { useEffect } from "react";

const useOnboardingPairStepRefresh = (input: {
  readonly isConnectStepDone: boolean;
  readonly reloadSteps: () => Promise<void>;
}): void => {
  const { isConnectStepDone, reloadSteps } = input;

  useEffect(() => {
    if (isConnectStepDone) {
      return;
    }

    const refreshPairStep = (): void => {
      void reloadSteps();
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
  }, [isConnectStepDone, reloadSteps]);
};

export default useOnboardingPairStepRefresh;
