import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";
import { listRequiredOnboardingSteps } from "@/features/home/utils/listRequiredOnboardingSteps";

const areRequiredOnboardingStepsComplete = (
  steps: readonly OnboardingStep[],
): boolean => {
  const requiredSteps = listRequiredOnboardingSteps(steps);

  return (
    requiredSteps.length > 0 &&
    requiredSteps.every((step) => step.done === true)
  );
};

export default areRequiredOnboardingStepsComplete;
