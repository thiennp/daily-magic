export const AUTOMATION_SHOWCASE_SCREEN = {
  HOME_POPULAR_PRESETS: "01-home-popular-presets",
  NEW_AUTOMATION: "02-new-automation",
  AUTOMATIONS_LIST: "03-automations-list",
} as const;

export type AutomationShowcaseScreenId =
  (typeof AUTOMATION_SHOWCASE_SCREEN)[keyof typeof AUTOMATION_SHOWCASE_SCREEN];

const AUTOMATION_SHOWCASE_SCREEN_BASE_PATH = "/showcases/automations";

export const buildShowcaseAutomationPngPath = (
  screenId: AutomationShowcaseScreenId,
): string => `${AUTOMATION_SHOWCASE_SCREEN_BASE_PATH}/${screenId}.png`;

export const buildShowcaseAutomationSvgPath = (
  screenId: AutomationShowcaseScreenId,
): string => `${AUTOMATION_SHOWCASE_SCREEN_BASE_PATH}/${screenId}.svg`;

export const buildShowcaseAutomationImagePaths = (
  screenId: AutomationShowcaseScreenId,
): { readonly png: string; readonly svg: string } => ({
  png: buildShowcaseAutomationPngPath(screenId),
  svg: buildShowcaseAutomationSvgPath(screenId),
});

export const AUTOMATION_SHOWCASE_SCREEN_DIMENSIONS: Readonly<
  Record<
    AutomationShowcaseScreenId,
    { readonly width: number; readonly height: number }
  >
> = {
  [AUTOMATION_SHOWCASE_SCREEN.HOME_POPULAR_PRESETS]: {
    width: 888,
    height: 534,
  },
  [AUTOMATION_SHOWCASE_SCREEN.NEW_AUTOMATION]: { width: 702, height: 597 },
  [AUTOMATION_SHOWCASE_SCREEN.AUTOMATIONS_LIST]: { width: 964, height: 579 },
};

export const resolveShowcaseAutomationScreenDimensions = (
  screenId: AutomationShowcaseScreenId,
): { readonly width: number; readonly height: number } =>
  AUTOMATION_SHOWCASE_SCREEN_DIMENSIONS[screenId];
