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
  [SHOWCASE_TOPIC_SCREEN.SEND_TASK]: { width: 1440, height: 1201 },
  [SHOWCASE_TOPIC_SCREEN.JOB_HISTORY]: { width: 1440, height: 900 },
  [SHOWCASE_TOPIC_SCREEN.MARKETPLACE]: { width: 1440, height: 900 },
  [SHOWCASE_TOPIC_SCREEN.AUTOMATIONS]: { width: 1440, height: 900 },
  [SHOWCASE_TOPIC_SCREEN.MOBILE]: { width: 1440, height: 1201 },
  [SHOWCASE_TOPIC_SCREEN.LIBRARY]: { width: 1440, height: 900 },
  [SHOWCASE_TOPIC_SCREEN.REPORTS]: { width: 1440, height: 900 },
  [SHOWCASE_TOPIC_SCREEN.APPROVALS]: { width: 1440, height: 900 },
  [SHOWCASE_TOPIC_SCREEN.COMPANY_ADMIN]: { width: 1440, height: 900 },
  [SHOWCASE_TOPIC_SCREEN.LEADERSHIP]: { width: 1440, height: 900 },
  [SHOWCASE_TOPIC_SCREEN.CONCEPT]: { width: 1440, height: 1201 },
  [SHOWCASE_TOPIC_SCREEN.MAC_STATUS]: { width: 1440, height: 1201 },
};

export const resolveShowcaseTopicScreenDimensions = (
  screenId: ShowcaseTopicScreenId,
): { readonly width: number; readonly height: number } =>
  SHOWCASE_TOPIC_SCREEN_DIMENSIONS[screenId];
