const ONBOARDING_SETUP_ACKNOWLEDGED_API_PATH =
  "/api/onboarding/setup-acknowledged";

export const fetchOnboardingSetupAcknowledged = async (): Promise<boolean> => {
  try {
    const response = await fetch(ONBOARDING_SETUP_ACKNOWLEDGED_API_PATH);

    if (!response.ok) {
      return false;
    }

    const data: unknown = await response.json();

    return (
      typeof data === "object" &&
      data !== null &&
      "setupAcknowledged" in data &&
      (data as { setupAcknowledged: unknown }).setupAcknowledged === true
    );
  } catch {
    return false;
  }
};

export const persistOnboardingSetupAcknowledged = async (): Promise<void> => {
  try {
    await fetch(ONBOARDING_SETUP_ACKNOWLEDGED_API_PATH, { method: "POST" });
  } catch {
    return;
  }
};
