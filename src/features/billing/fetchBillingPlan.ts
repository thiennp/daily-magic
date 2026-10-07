import { BILLING_API_PATHS } from "@/features/billing/billingApiPaths.constant";
import type { BillingPlanSummaryPayload } from "@/features/billing/billingPlan.types";

export default async function fetchBillingPlan(): Promise<BillingPlanSummaryPayload> {
  const response = await fetch(BILLING_API_PATHS.plan);
  const payload = (await response.json()) as BillingPlanSummaryPayload & {
    error?: string;
  };
  if (!response.ok) {
    throw new Error(payload.error ?? "Could not load plan.");
  }
  return payload;
}
