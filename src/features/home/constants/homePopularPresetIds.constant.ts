export const HOME_POPULAR_PRESET_IDS = [
  "job-application-pack",
  "email-inbox-reply",
  "freelancer-client-proposal",
  "shop-order-support",
  "tiktok-series-episode",
  "finance-sheet-qa",
  "facebook-page-post",
  "teacher-lesson-plan",
] as const;

export type HomePopularPresetId = (typeof HOME_POPULAR_PRESET_IDS)[number];
