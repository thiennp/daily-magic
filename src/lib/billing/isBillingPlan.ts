import { BILLING_PLANS } from "@/lib/billing/billingPlan.constant";
import type { BillingPlan } from "@/lib/billing/types/BillingPlan.type";

export const isBillingPlan = (value: string): value is BillingPlan =>
  (BILLING_PLANS as readonly string[]).includes(value);
