import areRequiredOnboardingStepsComplete from "@/features/home/utils/areRequiredOnboardingStepsComplete";
import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";

const shouldShowOnboardingSetupCompletePanel = (
  steps: readonly OnboardingStep[],
  setupAcknowledged: boolean,
): boolean => areRequiredOnboardingStepsComplete(steps) && !setupAcknowledged;

export default shouldShowOnboardingSetupCompletePanel;
