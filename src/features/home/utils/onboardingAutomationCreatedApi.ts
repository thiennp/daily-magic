const ONBOARDING_AUTOMATION_CREATED_API_PATH =
  "/api/onboarding/automation-created";

export const fetchOnboardingAutomationCreated = async (): Promise<boolean> => {
  try {
    const response = await fetch(ONBOARDING_AUTOMATION_CREATED_API_PATH);
    if (!response.ok) {
      return false;
    }

    const data: unknown = await response.json();
    return (
      typeof data === "object" &&
      data !== null &&
      "automationCreated" in data &&
      (data as { automationCreated: unknown }).automationCreated === true
    );
  } catch {
    return false;
  }
};

export const persistOnboardingAutomationCreated = async (): Promise<void> => {
  try {
    await fetch(ONBOARDING_AUTOMATION_CREATED_API_PATH, { method: "POST" });
  } catch {
    return;
  }
};
