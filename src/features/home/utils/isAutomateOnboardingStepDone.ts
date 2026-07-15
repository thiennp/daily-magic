import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";
import isOnboardingAutomateStep from "@/features/home/utils/isOnboardingAutomateStep";

const isAutomateOnboardingStepDone = (
  steps: readonly OnboardingStep[],
): boolean =>
  steps.some((step) => isOnboardingAutomateStep(step.id) && step.done);

export default isAutomateOnboardingStepDone;
