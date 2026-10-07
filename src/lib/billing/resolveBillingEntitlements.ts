import {
  MAX_ASSISTANT_CONNECTS,
  MAX_COMPUTERS_ALL_PLANS,
} from "@/lib/billing/billingPlan.constant";
import { isTrialEntitlementGranted } from "@/lib/billing/isTrialEntitlementGranted";
import type { BillingEntitlements } from "@/lib/billing/types/BillingEntitlements.type";
import type { BillingPlanRow } from "@/lib/billing/types/BillingPlanRow.type";
import type { TrialGate } from "@/lib/billing/types/BillingPlan.type";

export const resolveBillingEntitlements = (input: {
  readonly row: BillingPlanRow;
  readonly trialGate?: TrialGate;
  readonly trialGateReason?: string | null;
}): BillingEntitlements => {
  const { row } = input;
  const plan = row.plan;
  const paid = plan === "pro" || plan === "team";
  /** Closed-gate mint: no computers / assistants / cloud until checkout. */
  const trialGranted = isTrialEntitlementGranted(row);
  return {
    plan,
    trialEndsAt: row.trialEndsAt,
    adminFree: row.adminFree,
    seats: row.seatCount,
    maxComputers: trialGranted ? MAX_COMPUTERS_ALL_PLANS : 0,
    maxAssistantConnects: trialGranted ? MAX_ASSISTANT_CONNECTS[plan] : 0,
    cloudMessageStorage: paid,
    trialGate: input.trialGate ?? "open",
    trialGateReason: input.trialGateReason ?? null,
  };
};
