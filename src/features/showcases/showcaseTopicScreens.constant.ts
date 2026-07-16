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

export const buildShowcaseTopicSvgPath = (
  screenId: ShowcaseTopicScreenId,
): string => `${SHOWCASE_TOPIC_SCREEN_BASE_PATH}/${screenId}.svg`;
