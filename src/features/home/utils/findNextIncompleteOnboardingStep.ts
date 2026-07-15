import type { OnboardingStep } from "@/features/home/utils/buildOnboardingSteps";

const findNextIncompleteOnboardingStep = (
  steps: ReadonlyArray<OnboardingStep>,
): OnboardingStep | null =>
  steps.find((step) => !step.done && !step.optional) ?? null;

export default findNextIncompleteOnboardingStep;
