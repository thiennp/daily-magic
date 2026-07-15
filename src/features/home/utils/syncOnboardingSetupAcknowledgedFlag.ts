import { persistOnboardingSetupAcknowledged } from "@/features/home/utils/onboardingSetupAcknowledgedApi";
import {
  readOnboardingSetupAcknowledged,
  writeOnboardingSetupAcknowledgedLocal,
} from "@/features/home/utils/onboardingSetupAcknowledgedStore";

const syncOnboardingSetupAcknowledgedFlag = (
  dbSetupAcknowledged: boolean,
): void => {
  if (dbSetupAcknowledged) {
    writeOnboardingSetupAcknowledgedLocal();
    return;
  }

  if (readOnboardingSetupAcknowledged()) {
    void persistOnboardingSetupAcknowledged();
  }
};

export default syncOnboardingSetupAcknowledgedFlag;
