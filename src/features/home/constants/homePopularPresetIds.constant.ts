export const HOME_POPULAR_PRESET_IDS = [
  "vibe-coding-app-feature",
  "job-application-pack",
  "freelancer-client-proposal",
  "shop-order-support",
  "tiktok-series-episode",
  "daily-standup",
  "research-brief",
  "teacher-lesson-plan",
] as const;

export type HomePopularPresetId = (typeof HOME_POPULAR_PRESET_IDS)[number];
