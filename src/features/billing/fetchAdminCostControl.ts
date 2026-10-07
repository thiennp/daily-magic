import { BILLING_API_PATHS } from "@/features/billing/billingApiPaths.constant";
import type { AdminCostControl } from "@/features/billing/billingPlan.types";

export default async function fetchAdminCostControl(): Promise<AdminCostControl> {
  const response = await fetch(BILLING_API_PATHS.adminCostControl);
  const payload = (await response.json()) as AdminCostControl & {
    error?: string;
  };
  if (!response.ok) {
    throw new Error(payload.error ?? "Could not load cost control.");
  }
  return payload;
}
