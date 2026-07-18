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
    width: 1440,
    height: 900,
  },
  [AUTOMATION_SHOWCASE_SCREEN.NEW_AUTOMATION]: { width: 1440, height: 900 },
  [AUTOMATION_SHOWCASE_SCREEN.AUTOMATIONS_LIST]: { width: 1440, height: 900 },
};

export const resolveShowcaseAutomationScreenDimensions = (
  screenId: AutomationShowcaseScreenId,
): { readonly width: number; readonly height: number } =>
  AUTOMATION_SHOWCASE_SCREEN_DIMENSIONS[screenId];
