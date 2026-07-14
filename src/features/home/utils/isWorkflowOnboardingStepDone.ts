import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";
import isWorkflowOnboardingStep from "@/features/home/utils/isWorkflowOnboardingStep";

const isWorkflowOnboardingStepDone = (
  steps: readonly OnboardingStep[],
): boolean =>
  steps.some((step) => isWorkflowOnboardingStep(step.id) && step.done);

export default isWorkflowOnboardingStepDone;
