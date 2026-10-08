import { countActiveComputersForUser } from "@/lib/billing/countActiveComputersForUser";
import { buildComputerLimitErrorMessage } from "@/lib/billing/buildComputerLimitErrorMessage";
import { listActiveComputersForLimit } from "@/lib/billing/listActiveComputersForLimit";
import { loadBillingPlanForUser } from "@/lib/billing/loadBillingPlanForUser";
import { loadCostControlSnapshot } from "@/lib/billing/loadCostControlSnapshot";
import { isTrialEntitlementGranted } from "@/lib/billing/isTrialEntitlementGranted";
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
  if (
    row.plan === "trial" &&
    (ents.trialGate === "closed" || !isTrialEntitlementGranted(row))
  ) {
    return {
      ok: false,
      code: "trial_closed",
      errorMessage: "Trial capacity is full. Choose Pro or Team to continue.",
    };
  }
  if (current >= ents.maxComputers) {
    return {
      ok: false,
      code: "computer_limit",
      errorMessage: buildComputerLimitErrorMessage({
        maxComputers: ents.maxComputers,
        computers: await listActiveComputersForLimit(input.userId),
      }),
    };
  }
  return { ok: true };
};
