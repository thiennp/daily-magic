/** Client preview only — matches Claude HTML slug helper. */
export const slugifyOnboardingProjectName = (raw: string): string =>
  raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
