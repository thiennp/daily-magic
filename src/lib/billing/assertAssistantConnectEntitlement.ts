import { countOwnedAssistantsForUser } from "@/lib/billing/countOwnedAssistantsForUser";
import { loadBillingPlanForUser } from "@/lib/billing/loadBillingPlanForUser";
import { resolveBillingEntitlements } from "@/lib/billing/resolveBillingEntitlements";
import type { BillingGateResult } from "@/lib/billing/types/BillingGateDenial.type";

/** HARD gate before claiming/connecting another assistant. */
export const assertAssistantConnectEntitlement = async (input: {
  readonly userId: string;
}): Promise<BillingGateResult> => {
  const [row, current] = await Promise.all([
    loadBillingPlanForUser(input.userId),
    countOwnedAssistantsForUser(input.userId),
  ]);
  const ents = resolveBillingEntitlements({ row });
  if (current >= ents.maxAssistantConnects) {
    return {
      ok: false,
      code: "assistant_connect_limit",
      errorMessage: `This plan allows up to ${ents.maxAssistantConnects} assistants.`,
    };
  }
  return { ok: true };
};
