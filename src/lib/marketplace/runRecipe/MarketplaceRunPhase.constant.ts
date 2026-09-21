export const MARKETPLACE_RUN_PHASES = {
  PLAN_ESTIMATE: "plan_estimate",
  WRITE: "write",
} as const;

export type MarketplaceRunPhase =
  (typeof MARKETPLACE_RUN_PHASES)[keyof typeof MARKETPLACE_RUN_PHASES];
