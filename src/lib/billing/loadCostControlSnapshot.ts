import { AGENT_ACCESS_EMAIL_DOMAIN } from "@/lib/agentAccess/agentAccess.constant";
import {
  ESTIMATED_USER_INFRA_COST_EUR,
  FREE_TRIAL_INFRA_BUDGET_EUR,
} from "@/lib/billing/billingPlan.constant";
import { currentBillingMonthKey } from "@/lib/billing/currentBillingMonthKey";
import { ensureBillingSchema } from "@/lib/billing/ensureBillingSchema";
import { resolveCostControlStatus } from "@/lib/billing/resolveCostControlStatus";
import type { BillingCostControlSnapshot } from "@/lib/billing/types/BillingCostControlSnapshot.type";
import { asRowArray, getSql } from "@/lib/db";

const num = (value: unknown): number => Number(value ?? 0) || 0;

/** Admin-only. Stubs read DB meter; ingest hooks can fill later. */
export const loadCostControlSnapshot = async (input?: {
  readonly nowMs?: number;
}): Promise<BillingCostControlSnapshot> => {
  await ensureBillingSchema();
  const month = currentBillingMonthKey(input?.nowMs);
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT railway_spend_eur, neon_spend_eur, related_infra_spend_eur
      FROM billing_infra_spend_months
      WHERE month_key = ${month}
      LIMIT 1
    `,
  );
  const countedRows = asRowArray(
    await sql`
      SELECT
        COUNT(*) FILTER (WHERE cost_control_excluded = FALSE)::int AS counted,
        COUNT(*)::int AS eligible
      FROM users
      WHERE (plan = 'trial' OR plan = 'admin_free' OR admin_free = TRUE)
        AND email NOT LIKE ${`%@${AGENT_ACCESS_EMAIL_DOMAIN}`}
        AND email !~* '^test[^@]*@agentwitch\\.com$'
    `,
  );
  const countedUsers = num(countedRows[0]?.counted);
  const eligibleUsers = num(countedRows[0]?.eligible);
  const estimatedUserSpend = countedUsers * ESTIMATED_USER_INFRA_COST_EUR;
  const row = rows[0];
  const railway = num(row?.railway_spend_eur);
  const neon = num(row?.neon_spend_eur);
  const related = num(row?.related_infra_spend_eur);
  const spend = railway + neon + related + estimatedUserSpend;
  const resolved = resolveCostControlStatus({ spendEur: spend });
  return {
    month,
    trialPlusAdminFreeSpendEur: spend,
    budgetEur: FREE_TRIAL_INFRA_BUDGET_EUR,
    status: resolved.status,
    trialGate: resolved.trialGate,
    signals: {
      railwaySpendEur: railway,
      neonSpendEur: neon,
      relatedInfraSpendEur: related,
      estimatedUserSpendEur: estimatedUserSpend,
      countedUsers,
      eligibleUsers,
      estimatedAllUsersSpendEur: eligibleUsers * ESTIMATED_USER_INFRA_COST_EUR,
    },
  };
};
