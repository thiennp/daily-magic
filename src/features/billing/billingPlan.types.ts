/** UI types aligned to NRG AgentWitch billing contract responses. */

export type BillingPlanId = "trial" | "pro" | "team" | "admin_free";

export type TrialGateState = "open" | "closed";

export type CostControlStatus = "under_budget" | "near_limit" | "over_budget";

/** GET /api/billing/entitlements — customer-safe; no infra euros. */
export interface BillingEntitlements {
  readonly plan: BillingPlanId;
  readonly trialEndsAt: string | null;
  readonly adminFree: boolean;
  readonly seats: number;
  readonly maxComputers: number;
  readonly maxAssistantConnects: number;
  readonly cloudMessageStorage: boolean;
  readonly trialGate: TrialGateState;
  readonly trialGateReason: string | null;
}

/** GET /api/billing/plan — Account → Billing; no infra euros. */
export interface BillingPlanSummaryPayload extends BillingEntitlements {
  readonly trialStartedAt: string | null;
  readonly cancelAnytime: boolean;
  readonly hasStripeCustomer: boolean;
}

export interface AdminCostControlSignals {
  readonly railwaySpendEur: number;
  readonly neonSpendEur: number;
  readonly relatedInfraSpendEur: number;
  readonly estimatedUserSpendEur: number;
  readonly countedUsers: number;
}

/** GET /api/billing/admin/cost-control — admin only. */
export interface AdminCostControl {
  readonly month: string;
  readonly trialPlusAdminFreeSpendEur: number;
  readonly budgetEur: number;
  readonly status: CostControlStatus;
  readonly trialGate: TrialGateState;
  readonly signals: AdminCostControlSignals;
}
