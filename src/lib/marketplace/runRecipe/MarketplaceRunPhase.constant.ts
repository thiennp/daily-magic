export const MARKETPLACE_RUN_PHASES = {
  PLAN_ESTIMATE: "plan_estimate",
  WRITE: "write",
  REPORT: "report",
} as const;

export type MarketplaceRunPhase =
  (typeof MARKETPLACE_RUN_PHASES)[keyof typeof MARKETPLACE_RUN_PHASES];
