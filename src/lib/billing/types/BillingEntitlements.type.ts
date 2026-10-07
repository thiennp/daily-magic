import type { BillingPlan, TrialGate } from "@/lib/billing/types/BillingPlan.type";

/** Customer-safe entitlements — no infra euros / margin. */
export type BillingEntitlements = {
  readonly plan: BillingPlan;
  readonly trialEndsAt: string | null;
  readonly adminFree: boolean;
  readonly seats: number;
  readonly maxComputers: number;
  readonly maxAssistantConnects: number;
  readonly cloudMessageStorage: boolean;
  readonly trialGate: TrialGate;
  readonly trialGateReason: string | null;
};
