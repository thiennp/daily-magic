import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";

export const listRequiredOnboardingSteps = (
  steps: readonly OnboardingStep[],
): readonly OnboardingStep[] => steps.filter((step) => !step.optional);
