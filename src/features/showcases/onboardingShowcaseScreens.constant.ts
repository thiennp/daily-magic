export const ONBOARDING_SHOWCASE_SCREEN = {
  HOME_CHECKLIST: "01-home-checklist",
  MAC_CONNECTED: "02-mac-connected",
  SAMPLE_WORKFLOW: "03-sample-workflow",
  JOB_HISTORY: "04-job-history",
  COMPANY_RULES: "05-company-rules",
} as const;

export type OnboardingShowcaseScreenId =
  (typeof ONBOARDING_SHOWCASE_SCREEN)[keyof typeof ONBOARDING_SHOWCASE_SCREEN];

const ONBOARDING_SHOWCASE_SCREEN_BASE_PATH = "/showcases/onboarding";

export const buildShowcaseOnboardingPngPath = (
  screenId: OnboardingShowcaseScreenId,
): string => `${ONBOARDING_SHOWCASE_SCREEN_BASE_PATH}/${screenId}.png`;

export const buildShowcaseOnboardingSvgPath = (
  screenId: OnboardingShowcaseScreenId,
): string => `${ONBOARDING_SHOWCASE_SCREEN_BASE_PATH}/${screenId}.svg`;

export const buildShowcaseOnboardingImagePaths = (
  screenId: OnboardingShowcaseScreenId,
): { readonly png: string; readonly svg: string } => ({
  png: buildShowcaseOnboardingPngPath(screenId),
  svg: buildShowcaseOnboardingSvgPath(screenId),
});
