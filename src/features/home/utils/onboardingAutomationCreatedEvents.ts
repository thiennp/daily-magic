export const ONBOARDING_AUTOMATION_CREATED_UPDATED_EVENT =
  "daily-magic:onboarding-automation-created-updated";

export const notifyOnboardingAutomationCreatedUpdated = (): void => {
  if (typeof window === "undefined" || typeof CustomEvent === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(ONBOARDING_AUTOMATION_CREATED_UPDATED_EVENT),
  );
};
