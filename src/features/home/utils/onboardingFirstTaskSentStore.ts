import { persistOnboardingFirstTaskSent } from "@/features/home/utils/onboardingFirstTaskSentApi";

const STORAGE_KEY = "daily-magic.onboarding.first-task-sent.v1";

export const readOnboardingFirstTaskSent = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(STORAGE_KEY) === "true";
};

export const writeOnboardingFirstTaskSentLocal = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, "true");
};

export const markOnboardingFirstTaskSent = (): void => {
  writeOnboardingFirstTaskSentLocal();
  void persistOnboardingFirstTaskSent();
};
