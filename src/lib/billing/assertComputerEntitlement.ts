import { countActiveComputersForUser } from "@/lib/billing/countActiveComputersForUser";
import { loadBillingPlanForUser } from "@/lib/billing/loadBillingPlanForUser";
import { loadCostControlSnapshot } from "@/lib/billing/loadCostControlSnapshot";
import { resolveBillingEntitlements } from "@/lib/billing/resolveBillingEntitlements";
import type { BillingGateResult } from "@/lib/billing/types/BillingGateDenial.type";

/** HARD gate before inserting a new computer. */
export const assertComputerEntitlement = async (input: {
  readonly userId: string;
}): Promise<BillingGateResult> => {
  const [row, cost, current] = await Promise.all([
    loadBillingPlanForUser(input.userId),
    loadCostControlSnapshot(),
    countActiveComputersForUser(input.userId),
  ]);
  const ents = resolveBillingEntitlements({
    row,
    trialGate: cost.trialGate,
  });
  if (row.plan === "trial" && ents.trialGate === "closed") {
    return {
      ok: false,
      code: "trial_closed",
      errorMessage:
        "Trial capacity is full. Choose Pro or Team to continue.",
    };
  }
  if (current >= ents.maxComputers) {
    return {
      ok: false,
      code: "computer_limit",
      errorMessage: `This plan allows up to ${ents.maxComputers} computers.`,
    };
  }
  return { ok: true };
};
