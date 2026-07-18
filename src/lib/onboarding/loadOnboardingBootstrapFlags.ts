import { getUserOnboardingAutomationCreated } from "@/lib/onboarding/onboardingAutomationCreatedQueries";
import { getUserOnboardingFirstTaskSent } from "@/lib/onboarding/onboardingFirstTaskSentQueries";
import { userHasPairedMacInDatabase } from "@/lib/onboarding/onboardingMacPairedQueries";
import { getUserOnboardingSetupAcknowledged } from "@/lib/onboarding/onboardingSetupAcknowledgedQueries";
import { userHasCreatedWorkflowInDatabase } from "@/lib/onboarding/onboardingWorkflowCreatedQueries";

export interface OnboardingBootstrapFlags {
  readonly firstTaskSent: boolean;
  readonly automationCreated: boolean;
  readonly macPaired: boolean;
  readonly workflowCreated: boolean;
  readonly setupAcknowledged: boolean;
}

export const loadOnboardingBootstrapFlags = async (
  userId: string,
): Promise<OnboardingBootstrapFlags> => {
  const [
    firstTaskSent,
    automationCreated,
    macPaired,
    workflowCreated,
    setupAcknowledged,
  ] = await Promise.all([
    getUserOnboardingFirstTaskSent(userId),
    getUserOnboardingAutomationCreated(userId),
    userHasPairedMacInDatabase(userId),
    userHasCreatedWorkflowInDatabase(userId),
    getUserOnboardingSetupAcknowledged(userId),
  ]);

  return {
    firstTaskSent,
    automationCreated,
    macPaired,
    workflowCreated,
    setupAcknowledged,
  };
};
