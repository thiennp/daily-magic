import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";
import { listRequiredOnboardingSteps } from "@/features/home/utils/listRequiredOnboardingSteps";

const shouldShowOnboardingChecklist = (
  steps: readonly OnboardingStep[],
  setupAcknowledged: boolean,
): boolean => {
  if (setupAcknowledged || steps.length === 0) {
    return false;
  }

  const requiredSteps = listRequiredOnboardingSteps(steps);

  return !requiredSteps.every((step) => step.done);
};

export default shouldShowOnboardingChecklist;
