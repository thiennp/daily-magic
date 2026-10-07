import { loadBillingPlanForUser } from "@/lib/billing/loadBillingPlanForUser";
import { resolveBillingEntitlements } from "@/lib/billing/resolveBillingEntitlements";
import type { BillingGateResult } from "@/lib/billing/types/BillingGateDenial.type";

/** HARD gate: Neon/server long-tail message storage only after paid billing.
 * Not for local project-computer History (owner_enable / default ON).
 */
export const assertCloudMessageStorage = async (input: {
  readonly userId: string;
}): Promise<BillingGateResult> => {
  const row = await loadBillingPlanForUser(input.userId);
  const ents = resolveBillingEntitlements({ row });
  if (!ents.cloudMessageStorage) {
    return {
      ok: false,
      code: "cloud_message_storage_off",
      errorMessage:
        "Cloud message storage starts after paid billing. Keep history on your computer for now.",
    };
  }
  return { ok: true };
};
