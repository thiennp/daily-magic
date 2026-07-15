import { persistOnboardingAutomationCreated } from "@/features/home/utils/onboardingAutomationCreatedApi";
import {
  readOnboardingAutomationCreated,
  writeOnboardingAutomationCreatedLocal,
} from "@/features/home/utils/onboardingAutomationCreatedStore";

const syncOnboardingAutomationCreatedFlag = (
  dbAutomationCreated: boolean,
): void => {
  if (dbAutomationCreated) {
    writeOnboardingAutomationCreatedLocal();
    return;
  }

  if (readOnboardingAutomationCreated()) {
    void persistOnboardingAutomationCreated();
  }
};

export default syncOnboardingAutomationCreatedFlag;
