import type { Dispatch, SetStateAction } from "react";

import useOnboardingAutomateStepRefresh from "@/features/home/hooks/useOnboardingAutomateStepRefresh";
import useOnboardingPairStepRefresh from "@/features/home/hooks/useOnboardingPairStepRefresh";
import useOnboardingPairStepSync from "@/features/home/hooks/useOnboardingPairStepSync";
import useOnboardingTaskStepRefresh from "@/features/home/hooks/useOnboardingTaskStepRefresh";
import useOnboardingWorkflowStepRefresh from "@/features/home/hooks/useOnboardingWorkflowStepRefresh";
import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";
import isAutomateOnboardingStepDone from "@/features/home/utils/isAutomateOnboardingStepDone";
import isConnectMacOnboardingStepDone from "@/features/home/utils/isConnectMacOnboardingStepDone";
import isTaskOnboardingStepDone from "@/features/home/utils/isTaskOnboardingStepDone";
import isWorkflowOnboardingStepDone from "@/features/home/utils/isWorkflowOnboardingStepDone";

const useOnboardingStepRefreshHooks = (input: {
  readonly steps: readonly OnboardingStep[];
  readonly reloadSteps: () => Promise<void>;
  readonly setSteps: Dispatch<SetStateAction<readonly OnboardingStep[]>>;
}): void => {
  useOnboardingPairStepSync({
    isConnectStepDone: isConnectMacOnboardingStepDone(input.steps),
    setSteps: input.setSteps,
  });
  useOnboardingPairStepRefresh({
    isConnectStepDone: isConnectMacOnboardingStepDone(input.steps),
    reloadSteps: input.reloadSteps,
  });
  useOnboardingTaskStepRefresh({
    isTaskStepDone: isTaskOnboardingStepDone(input.steps),
    reloadSteps: input.reloadSteps,
  });
  useOnboardingWorkflowStepRefresh({
    isWorkflowStepDone: isWorkflowOnboardingStepDone(input.steps),
    reloadSteps: input.reloadSteps,
  });
  useOnboardingAutomateStepRefresh({
    isAutomateStepDone: isAutomateOnboardingStepDone(input.steps),
    reloadSteps: input.reloadSteps,
  });
};

export default useOnboardingStepRefreshHooks;
