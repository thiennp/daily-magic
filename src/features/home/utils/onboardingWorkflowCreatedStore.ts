import { notifyOnboardingWorkflowCreatedUpdated } from "@/features/home/utils/onboardingWorkflowCreatedEvents";

const STORAGE_KEY = "daily-magic.onboarding.workflow-created.v1";

export const readOnboardingWorkflowCreated = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(STORAGE_KEY) === "true";
};

export const writeOnboardingWorkflowCreatedLocal = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, "true");
  notifyOnboardingWorkflowCreatedUpdated();
};

export const clearOnboardingWorkflowCreatedLocal = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
};

export const markOnboardingWorkflowCreated = (): void => {
  writeOnboardingWorkflowCreatedLocal();
};
