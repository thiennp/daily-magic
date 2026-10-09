import type { BillingGateResult } from "@/lib/billing/types/BillingGateDenial.type";

/** The trial gate is disabled: every human signup gets a trial. */
export const assertTrialGateOpen = async (): Promise<BillingGateResult> => ({
  ok: true,
});
