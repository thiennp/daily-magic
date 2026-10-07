import { isBillingPlan } from "@/lib/billing/isBillingPlan";
import type { BillingPlanRow } from "@/lib/billing/types/BillingPlanRow.type";

const isoOrNull = (value: unknown): string | null => {
  if (value == null) return null;
  if (value instanceof Date) return value.toISOString();
  return String(value);
};

export const mapBillingPlanRow = (
  row: Record<string, unknown>,
): BillingPlanRow => {
  const planRaw = String(row.plan ?? "trial");
  return {
    plan: isBillingPlan(planRaw) ? planRaw : "trial",
    trialStartedAt: isoOrNull(row.trial_started_at),
    trialEndsAt: isoOrNull(row.trial_ends_at),
    adminFree: Boolean(row.admin_free),
    seatCount: Number(row.seat_count ?? 1) || 1,
    stripeCustomerId:
      row.stripe_customer_id == null ? null : String(row.stripe_customer_id),
    stripeSubscriptionId:
      row.stripe_subscription_id == null
        ? null
        : String(row.stripe_subscription_id),
  };
};
