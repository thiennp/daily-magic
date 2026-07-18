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

export const ONBOARDING_SHOWCASE_SCREEN_DIMENSIONS: Readonly<
  Record<
    OnboardingShowcaseScreenId,
    { readonly width: number; readonly height: number }
  >
> = {
  [ONBOARDING_SHOWCASE_SCREEN.HOME_CHECKLIST]: { width: 1440, height: 1201 },
  [ONBOARDING_SHOWCASE_SCREEN.MAC_CONNECTED]: { width: 1440, height: 1201 },
  [ONBOARDING_SHOWCASE_SCREEN.SAMPLE_WORKFLOW]: { width: 1440, height: 1999 },
  [ONBOARDING_SHOWCASE_SCREEN.JOB_HISTORY]: { width: 1440, height: 900 },
  [ONBOARDING_SHOWCASE_SCREEN.COMPANY_RULES]: { width: 1440, height: 900 },
};

export const resolveShowcaseOnboardingScreenDimensions = (
  screenId: OnboardingShowcaseScreenId,
): { readonly width: number; readonly height: number } =>
  ONBOARDING_SHOWCASE_SCREEN_DIMENSIONS[screenId];
