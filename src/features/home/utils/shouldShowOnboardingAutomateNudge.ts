import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";
import isOnboardingAutomateStep from "@/features/home/utils/isOnboardingAutomateStep";
import { listRequiredOnboardingSteps } from "@/features/home/utils/listRequiredOnboardingSteps";

const shouldShowOnboardingAutomateNudge = (
  steps: readonly OnboardingStep[],
  setupAcknowledged: boolean,
): boolean => {
  if (setupAcknowledged) {
    return false;
  }

  const requiredSteps = listRequiredOnboardingSteps(steps);
  const automateStep = steps.find((step) => isOnboardingAutomateStep(step.id));

  if (
    requiredSteps.length === 0 ||
    automateStep === undefined ||
    automateStep.done
  ) {
    return false;
  }

  return requiredSteps.every((step) => step.done);
};

export default shouldShowOnboardingAutomateNudge;
