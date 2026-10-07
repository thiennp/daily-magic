import { BILLING_API_PATHS } from "@/features/billing/billingApiPaths.constant";
import type { BillingPlanId } from "@/features/billing/billingPlan.types";

export default async function postAdminSetPlan(input: {
  readonly userId: string;
  readonly plan: BillingPlanId;
}): Promise<{ readonly plan: BillingPlanId; readonly adminFree: boolean }> {
  const response = await fetch(BILLING_API_PATHS.adminSetPlan, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const payload = (await response.json()) as {
    error?: string;
    plan?: BillingPlanId;
    adminFree?: boolean;
  };
  if (!response.ok) {
    throw new Error(payload.error ?? "Could not update plan.");
  }
  return {
    plan: payload.plan ?? input.plan,
    adminFree: payload.adminFree ?? input.plan === "admin_free",
  };
}
