import { ensureBillingSchema } from "@/lib/billing/ensureBillingSchema";
import { asRowArray, getSql } from "@/lib/db";

export const setAdminFreeForUser = async (input: {
  readonly userId: string;
  readonly adminFree: boolean;
}): Promise<boolean> => {
  await ensureBillingSchema();
  const sql = getSql();
  if (input.adminFree) {
    const rows = asRowArray(
      await sql`
        UPDATE users
        SET admin_free = TRUE,
            plan = 'admin_free',
            stripe_subscription_id = NULL
        WHERE id = ${input.userId}
        RETURNING id
      `,
    );
    return rows.length > 0;
  }
  const rows = asRowArray(
    await sql`
      UPDATE users
      SET admin_free = FALSE,
          plan = CASE
            WHEN plan = 'admin_free' THEN 'trial'
            ELSE plan
          END,
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
};
