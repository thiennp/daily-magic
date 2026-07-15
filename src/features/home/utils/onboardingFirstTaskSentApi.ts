const ONBOARDING_FIRST_TASK_SENT_API_PATH = "/api/onboarding/first-task-sent";

export const fetchOnboardingFirstTaskSent = async (): Promise<boolean> => {
  try {
    const response = await fetch(ONBOARDING_FIRST_TASK_SENT_API_PATH);
    if (!response.ok) {
      return false;
    }

    const data: unknown = await response.json();
    return (
      typeof data === "object" &&
      data !== null &&
      "firstTaskSent" in data &&
      (data as { firstTaskSent: unknown }).firstTaskSent === true
    );
  } catch {
    return false;
  }
};

export const persistOnboardingFirstTaskSent = async (): Promise<void> => {
  try {
    await fetch(ONBOARDING_FIRST_TASK_SENT_API_PATH, { method: "POST" });
  } catch {
    return;
  }
};
