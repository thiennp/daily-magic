const ONBOARDING_MAC_PAIRED_API_PATH = "/api/onboarding/mac-paired";

export const fetchOnboardingMacPaired = async (): Promise<boolean> => {
  try {
    const response = await fetch(ONBOARDING_MAC_PAIRED_API_PATH);

    if (!response.ok) {
      return false;
    }

    const data: unknown = await response.json();

    return (
      typeof data === "object" &&
      data !== null &&
      "macPaired" in data &&
      (data as { macPaired: unknown }).macPaired === true
    );
  } catch {
    return false;
  }
};
