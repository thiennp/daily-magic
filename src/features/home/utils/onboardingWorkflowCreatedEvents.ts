export const ONBOARDING_WORKFLOW_CREATED_UPDATED_EVENT =
  "daily-magic:onboarding-workflow-created-updated";

export const notifyOnboardingWorkflowCreatedUpdated = (): void => {
  if (typeof window === "undefined" || typeof CustomEvent === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(ONBOARDING_WORKFLOW_CREATED_UPDATED_EVENT),
  );
};
