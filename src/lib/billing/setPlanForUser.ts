import { ensureBillingSchema } from "@/lib/billing/ensureBillingSchema";
import type { BillingPlan } from "@/lib/billing/types/BillingPlan.type";
import { asRowArray, getSql } from "@/lib/db";

const DEFAULT_TEAM_SEAT_COUNT = 5;

/** Resolve seat_count: team → seatCount ?? 5; others → 1. */
export const resolveSeatCountForPlan = (
  plan: BillingPlan,
  seatCount?: number,
): number => {
  if (plan === "team") {
    return seatCount !== undefined && Number.isInteger(seatCount) && seatCount >= 1
      ? seatCount
      : DEFAULT_TEAM_SEAT_COUNT;
  }
  return 1;
};

/**
 * Admin force-set of users.plan without Stripe.
 * Syncs admin_free + seat_count; clears stripe_subscription_id (no subscribe flow).
 */
export const setPlanForUser = async (input: {
  readonly userId: string;
  readonly plan: BillingPlan;
  readonly seatCount?: number;
}): Promise<boolean> => {
  await ensureBillingSchema();
  const sql = getSql();
  const seatCount = resolveSeatCountForPlan(input.plan, input.seatCount);

  if (input.plan === "admin_free") {
    const rows = asRowArray(
      await sql`
        UPDATE users
        SET plan = 'admin_free',
            admin_free = TRUE,
            seat_count = ${seatCount},
            stripe_subscription_id = NULL
        WHERE id = ${input.userId}
        RETURNING id
      `,
    );
    return rows.length > 0;
  }

  if (input.plan === "trial") {
    const rows = asRowArray(
      await sql`
        UPDATE users
        SET plan = 'trial',
            admin_free = FALSE,
            seat_count = ${seatCount},
            stripe_subscription_id = NULL,
            trial_started_at = COALESCE(trial_started_at, NOW()),
            trial_ends_at = COALESCE(
              trial_ends_at,
              NOW() + INTERVAL '1 month'
            )
        WHERE id = ${input.userId}
        RETURNING id
      `,
    );
    return rows.length > 0;
  }

  // pro | team — entitlements only; do not create Stripe subscription
  const rows = asRowArray(
    await sql`
      UPDATE users
      SET plan = ${input.plan},
          admin_free = FALSE,
          seat_count = ${seatCount},
          stripe_subscription_id = NULL
      WHERE id = ${input.userId}
      RETURNING id
    `,
  );
  return rows.length > 0;
};

/** Permanent Free toggle — wraps setPlanForUser for back-compat. */
export const setAdminFreeForUser = async (input: {
  readonly userId: string;
  readonly adminFree: boolean;
}): Promise<boolean> =>
  setPlanForUser({
    userId: input.userId,
    plan: input.adminFree ? "admin_free" : "trial",
  });
