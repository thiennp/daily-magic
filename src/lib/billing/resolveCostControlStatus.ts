import { FREE_TRIAL_INFRA_BUDGET_EUR } from "@/lib/billing/billingPlan.constant";
import type {
  CostControlBudgetStatus,
  TrialGate,
} from "@/lib/billing/types/BillingPlan.type";

export const resolveCostControlStatus = (input: {
  readonly spendEur: number;
  readonly budgetEur?: number;
}): {
  readonly status: CostControlBudgetStatus;
  readonly trialGate: TrialGate;
} => {
  const budget = input.budgetEur ?? FREE_TRIAL_INFRA_BUDGET_EUR;
  if (input.spendEur >= budget) {
    return {
      status: "over_budget",
      trialGate: "open",
    };
  }
  if (input.spendEur >= budget * 0.8) {
    return { status: "near_limit", trialGate: "open" };
  }
  return { status: "under_budget", trialGate: "open" };
};
