import { loadCostControlSnapshot } from "@/lib/billing/loadCostControlSnapshot";
import type { BillingGateResult } from "@/lib/billing/types/BillingGateDenial.type";

/** HARD gate: refuse new human trial signups when infra trialGate is closed. */
export const assertTrialGateOpen = async (): Promise<BillingGateResult> => {
  const cost = await loadCostControlSnapshot();
  if (cost.trialGate === "closed") {
    return {
      ok: false,
      code: "trial_closed",
      errorMessage:
        "Trial capacity is full. Choose Pro or Team to continue.",
    };
  }
  return { ok: true };
};
