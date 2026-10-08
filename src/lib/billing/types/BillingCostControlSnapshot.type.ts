import type {
  CostControlBudgetStatus,
  TrialGate,
} from "@/lib/billing/types/BillingPlan.type";

/** Admin-only. Never expose on Pricing / customer entitlements. */
export type BillingCostControlSnapshot = {
  readonly month: string;
  readonly trialPlusAdminFreeSpendEur: number;
  readonly budgetEur: number;
  readonly status: CostControlBudgetStatus;
  readonly trialGate: TrialGate;
  readonly signals: {
    readonly railwaySpendEur: number;
    readonly neonSpendEur: number;
    readonly relatedInfraSpendEur: number;
    readonly estimatedUserSpendEur: number;
    readonly countedUsers: number;
    readonly eligibleUsers: number;
    readonly estimatedAllUsersSpendEur: number;
  };
};
