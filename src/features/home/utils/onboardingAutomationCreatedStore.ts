import { persistOnboardingAutomationCreated } from "@/features/home/utils/onboardingAutomationCreatedApi";
import { notifyOnboardingAutomationCreatedUpdated } from "@/features/home/utils/onboardingAutomationCreatedEvents";

const STORAGE_KEY = "daily-magic.onboarding.automation-created.v1";

export const readOnboardingAutomationCreated = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(STORAGE_KEY) === "true";
};

export const writeOnboardingAutomationCreatedLocal = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, "true");
  notifyOnboardingAutomationCreatedUpdated();
};

export const markOnboardingAutomationCreated = (): void => {
  writeOnboardingAutomationCreatedLocal();
  void persistOnboardingAutomationCreated();
};
