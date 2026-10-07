import { ensureBillingSchema } from "@/lib/billing/ensureBillingSchema";
import { mapBillingPlanRow } from "@/lib/billing/mapBillingPlanRow";
import type { BillingPlanRow } from "@/lib/billing/types/BillingPlanRow.type";
import { asRowArray, getSql } from "@/lib/db";

const DEFAULT_TRIAL: BillingPlanRow = {
  plan: "trial",
  trialStartedAt: null,
  trialEndsAt: null,
  adminFree: false,
  seatCount: 1,
  stripeCustomerId: null,
  stripeSubscriptionId: null,
};

export const loadBillingPlanForUser = async (
  userId: string,
): Promise<BillingPlanRow> => {
  await ensureBillingSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT plan, trial_started_at, trial_ends_at, admin_free, seat_count,
             stripe_customer_id, stripe_subscription_id
      FROM users
      WHERE id = ${userId}
      LIMIT 1
    `,
  );
  if (!rows[0]) return DEFAULT_TRIAL;
  return mapBillingPlanRow(rows[0]);
};
