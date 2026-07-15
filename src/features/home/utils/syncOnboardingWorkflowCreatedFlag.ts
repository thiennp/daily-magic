import {
  clearOnboardingWorkflowCreatedLocal,
  readOnboardingWorkflowCreated,
  writeOnboardingWorkflowCreatedLocal,
} from "@/features/home/utils/onboardingWorkflowCreatedStore";

const syncOnboardingWorkflowCreatedFlag = (
  dbWorkflowCreated: boolean,
): void => {
  if (dbWorkflowCreated) {
    writeOnboardingWorkflowCreatedLocal();
    return;
  }

  if (readOnboardingWorkflowCreated()) {
    clearOnboardingWorkflowCreatedLocal();
  }
};

export default syncOnboardingWorkflowCreatedFlag;
