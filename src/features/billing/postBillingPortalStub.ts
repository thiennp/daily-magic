import { BILLING_API_PATHS } from "@/features/billing/billingApiPaths.constant";

/** Stub hook for paid billing portal — API returns 501 until Stripe is live. */
export default async function postBillingPortalStub(): Promise<{
  readonly stub: true;
  readonly message?: string;
}> {
  const response = await fetch(BILLING_API_PATHS.portal, { method: "POST" });
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
      "The billing portal is not connected yet.",
  };
}
