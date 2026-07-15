import { readOnboardingSetupAcknowledged } from "@/features/home/utils/onboardingSetupAcknowledgedStore";

const hasUserAcknowledgedOnboardingSetup = (
  dbSetupAcknowledged = false,
): boolean => dbSetupAcknowledged || readOnboardingSetupAcknowledged();

export default hasUserAcknowledgedOnboardingSetup;
