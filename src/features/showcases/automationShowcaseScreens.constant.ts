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
