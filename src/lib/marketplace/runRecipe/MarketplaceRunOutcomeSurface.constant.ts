export const MARKETPLACE_RUN_OUTCOME_SURFACES = {
  REPORTS: "reports",
} as const;

export type MarketplaceRunOutcomeSurface =
  (typeof MARKETPLACE_RUN_OUTCOME_SURFACES)[keyof typeof MARKETPLACE_RUN_OUTCOME_SURFACES];
