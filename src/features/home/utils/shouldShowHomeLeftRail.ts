import type { OnboardingStep } from "@/features/home/loadOnboardingSteps";
import shouldShowOnboardingAutomateNudge from "@/features/home/utils/shouldShowOnboardingAutomateNudge";
import shouldShowOnboardingChecklist from "@/features/home/utils/shouldShowOnboardingChecklist";

const shouldShowHomeLeftRail = (
  steps: readonly OnboardingStep[],
  setupAcknowledged: boolean,
): boolean =>
  shouldShowOnboardingChecklist(steps, setupAcknowledged) ||
  shouldShowOnboardingAutomateNudge(steps, setupAcknowledged);

export default shouldShowHomeLeftRail;
