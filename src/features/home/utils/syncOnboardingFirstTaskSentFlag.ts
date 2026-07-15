import { persistOnboardingFirstTaskSent } from "@/features/home/utils/onboardingFirstTaskSentApi";
import {
  readOnboardingFirstTaskSent,
  writeOnboardingFirstTaskSentLocal,
} from "@/features/home/utils/onboardingFirstTaskSentStore";

const syncOnboardingFirstTaskSentFlag = (dbFirstTaskSent: boolean): void => {
  if (dbFirstTaskSent) {
    writeOnboardingFirstTaskSentLocal();
    return;
  }

  if (readOnboardingFirstTaskSent()) {
    void persistOnboardingFirstTaskSent();
  }
};

export default syncOnboardingFirstTaskSentFlag;
