export const SHOWCASE_TOPIC_SCREEN = {
  SEND_TASK: "01-send-task",
  JOB_HISTORY: "02-job-history",
  MARKETPLACE: "03-marketplace",
  AUTOMATIONS: "04-automations",
  MOBILE: "05-mobile",
  LIBRARY: "06-library",
  REPORTS: "07-reports",
  APPROVALS: "08-approvals",
  COMPANY_ADMIN: "09-company-admin",
  LEADERSHIP: "10-leadership",
  CONCEPT: "11-concept",
  MAC_STATUS: "12-mac-status",
} as const;

export type ShowcaseTopicScreenId =
  (typeof SHOWCASE_TOPIC_SCREEN)[keyof typeof SHOWCASE_TOPIC_SCREEN];

const SHOWCASE_TOPIC_SCREEN_BASE_PATH = "/showcases/topics";

export const buildShowcaseTopicPngPath = (
  screenId: ShowcaseTopicScreenId,
): string => `${SHOWCASE_TOPIC_SCREEN_BASE_PATH}/${screenId}.png`;

export const buildShowcaseTopicSvgPath = (
  screenId: ShowcaseTopicScreenId,
): string => `${SHOWCASE_TOPIC_SCREEN_BASE_PATH}/${screenId}.svg`;

export const SHOWCASE_TOPIC_SCREEN_DIMENSIONS: Readonly<
  Record<
    ShowcaseTopicScreenId,
    { readonly width: number; readonly height: number }
  >
> = {
  [SHOWCASE_TOPIC_SCREEN.SEND_TASK]: { width: 468, height: 399 },
  [SHOWCASE_TOPIC_SCREEN.JOB_HISTORY]: { width: 349, height: 371 },
  [SHOWCASE_TOPIC_SCREEN.MARKETPLACE]: { width: 738, height: 367 },
  [SHOWCASE_TOPIC_SCREEN.AUTOMATIONS]: { width: 350, height: 417 },
  [SHOWCASE_TOPIC_SCREEN.MOBILE]: { width: 412, height: 563 },
  [SHOWCASE_TOPIC_SCREEN.LIBRARY]: { width: 719, height: 325 },
  [SHOWCASE_TOPIC_SCREEN.REPORTS]: { width: 336, height: 458 },
  [SHOWCASE_TOPIC_SCREEN.APPROVALS]: { width: 906, height: 362 },
  [SHOWCASE_TOPIC_SCREEN.COMPANY_ADMIN]: { width: 551, height: 367 },
  [SHOWCASE_TOPIC_SCREEN.LEADERSHIP]: { width: 732, height: 334 },
  [SHOWCASE_TOPIC_SCREEN.CONCEPT]: { width: 881, height: 446 },
  [SHOWCASE_TOPIC_SCREEN.MAC_STATUS]: { width: 694, height: 343 },
};

export const resolveShowcaseTopicScreenDimensions = (
  screenId: ShowcaseTopicScreenId,
): { readonly width: number; readonly height: number } =>
  SHOWCASE_TOPIC_SCREEN_DIMENSIONS[screenId];
