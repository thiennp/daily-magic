/** Reads projectId from onboarding searchParams; missing → null. */
export const requireOnboardingProjectId = (
  raw: string | string[] | undefined,
): string | null => {
  if (typeof raw === "string" && raw.trim().length > 0) {
    return raw.trim();
  }
  if (Array.isArray(raw) && typeof raw[0] === "string" && raw[0].trim()) {
    return raw[0].trim();
  }
  return null;
};
