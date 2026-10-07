import { loadBillingPlanForUser } from "@/lib/billing/loadBillingPlanForUser";
import { loadCostControlSnapshot } from "@/lib/billing/loadCostControlSnapshot";
import { resolveBillingEntitlements } from "@/lib/billing/resolveBillingEntitlements";
import type { BillingEntitlements } from "@/lib/billing/types/BillingEntitlements.type";

export const loadEntitlementsForUser = async (
  userId: string,
): Promise<BillingEntitlements> => {
  const [row, cost] = await Promise.all([
    loadBillingPlanForUser(userId),
    loadCostControlSnapshot(),
  ]);
  return resolveBillingEntitlements({
    row,
    trialGate: cost.trialGate,
    trialGateReason:
      cost.trialGate === "closed"
        ? "Trial capacity is full. Choose Pro or Team to continue."
        : null,
  });
};
