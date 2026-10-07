import { BILLING_API_PATHS } from "@/features/billing/billingApiPaths.constant";
import type { BillingPlanId } from "@/features/billing/billingPlan.types";

/** Stub hook for Pricing upgrade CTAs — API returns 501 until Stripe is live. */
export default async function postBillingCheckoutStub(input: {
  readonly plan: Extract<BillingPlanId, "pro" | "team">;
}): Promise<{ readonly stub: true; readonly message?: string }> {
  const response = await fetch(BILLING_API_PATHS.checkout, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const payload = (await response.json().catch(() => ({}))) as {
    errorMessage?: string;
    message?: string;
    error?: string;
  };
  return {
    stub: true,
    message:
      payload.errorMessage ??
      payload.error ??
      payload.message ??
      "Checkout is not connected yet.",
  };
}
