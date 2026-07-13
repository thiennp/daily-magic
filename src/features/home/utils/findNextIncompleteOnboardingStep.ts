import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";

const findNextIncompleteOnboardingStep = (
  steps: ReadonlyArray<OnboardingStep>,
): OnboardingStep | null => steps.find((step) => !step.done) ?? null;

export default findNextIncompleteOnboardingStep;
