import { ensureBillingSchema } from "@/lib/billing/ensureBillingSchema";
import { asRowArray, getSql } from "@/lib/db";

/** Admin-only: leave a user out of (or back in) the cost-control estimate. */
export const setCostControlExcludedForUser = async (input: {
  readonly userId: string;
  readonly excluded: boolean;
}): Promise<boolean> => {
  await ensureBillingSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE users
      SET cost_control_excluded = ${input.excluded}
      WHERE id = ${input.userId}
      RETURNING id
    `,
  );
  return rows.length > 0;
};
