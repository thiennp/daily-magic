import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";
import isTaskOnboardingStep from "@/features/home/utils/isTaskOnboardingStep";

const isTaskOnboardingStepDone = (steps: readonly OnboardingStep[]): boolean =>
  steps.some((step) => isTaskOnboardingStep(step.id) && step.done);

export default isTaskOnboardingStepDone;
