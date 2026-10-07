import { BILLING_API_PATHS } from "@/features/billing/billingApiPaths.constant";
import type { BillingEntitlements } from "@/features/billing/billingPlan.types";

export default async function fetchBillingEntitlements(): Promise<BillingEntitlements> {
  const response = await fetch(BILLING_API_PATHS.entitlements);
  const payload = (await response.json()) as BillingEntitlements & {
    error?: string;
  };
  if (!response.ok) {
    throw new Error(payload.error ?? "Could not load entitlements.");
  }
  return payload;
}
