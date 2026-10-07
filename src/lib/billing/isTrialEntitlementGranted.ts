import type { BillingPlanRow } from "@/lib/billing/types/BillingPlanRow.type";

/**
 * Closed-gate OAuth/signup mint: plan stays `trial` but trial dates are null
 * until checkout (no usable trial entitlements). Active trials always have both
 * dates set by createUser when the infra trialGate is open.
 */
export const isTrialEntitlementGranted = (row: BillingPlanRow): boolean => {
  if (row.plan !== "trial") return true;
  return row.trialStartedAt != null && row.trialEndsAt != null;
};
