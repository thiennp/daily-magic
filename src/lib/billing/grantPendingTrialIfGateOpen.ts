import { assertTrialGateOpen } from "@/lib/billing/assertTrialGateOpen";
import { isTrialEntitlementGranted } from "@/lib/billing/isTrialEntitlementGranted";
import { loadBillingPlanForUser } from "@/lib/billing/loadBillingPlanForUser";
import type { BillingPlanRow } from "@/lib/billing/types/BillingPlanRow.type";
import { getSql } from "@/lib/db";

/**
 * Accounts minted while the gate was closed keep a `trial` plan with null
 * dates. When the gate is open again, start their trial on the next sign-in.
 */
export const grantPendingTrialIfGateOpen = async (
  userId: string,
): Promise<BillingPlanRow> => {
  const row = await loadBillingPlanForUser(userId);
  if (isTrialEntitlementGranted(row)) return row;
  const gate = await assertTrialGateOpen();
  if (!gate.ok) return row;
  await getSql()`
    UPDATE users
    SET trial_started_at = NOW(), trial_ends_at = NOW() + INTERVAL '1 month'
    WHERE id = ${userId} AND plan = 'trial' AND trial_started_at IS NULL
  `;
  return loadBillingPlanForUser(userId);
};
