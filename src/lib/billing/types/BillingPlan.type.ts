import type { BILLING_PLANS } from "@/lib/billing/billingPlan.constant";

export type BillingPlan = (typeof BILLING_PLANS)[number];

export type TrialGate = "open" | "closed";

export type CostControlBudgetStatus =
  | "under_budget"
  | "near_limit"
  | "over_budget";
