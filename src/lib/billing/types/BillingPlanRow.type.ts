import type { BillingPlan } from "@/lib/billing/types/BillingPlan.type";

export type BillingPlanRow = {
  readonly plan: BillingPlan;
  readonly trialStartedAt: string | null;
  readonly trialEndsAt: string | null;
  readonly adminFree: boolean;
  readonly seatCount: number;
  readonly stripeCustomerId: string | null;
  readonly stripeSubscriptionId: string | null;
};
