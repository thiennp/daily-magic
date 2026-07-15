import { persistOnboardingSetupAcknowledged } from "@/features/home/utils/onboardingSetupAcknowledgedApi";

const STORAGE_KEY = "daily-magic.onboarding.setup-acknowledged.v1";

export const readOnboardingSetupAcknowledged = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(STORAGE_KEY) === "true";
};

export const writeOnboardingSetupAcknowledgedLocal = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, "true");
};

export const markOnboardingSetupAcknowledged = (): void => {
  writeOnboardingSetupAcknowledgedLocal();
  void persistOnboardingSetupAcknowledged();
};
