import { ensureBillingSchema } from "@/lib/billing/ensureBillingSchema";
import { asRowArray, getSql } from "@/lib/db";

/** One-off: leave every existing user out of the cost-control estimate. */
const main = async (): Promise<void> => {
  await ensureBillingSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE users
      SET cost_control_excluded = TRUE
      WHERE cost_control_excluded = FALSE
      RETURNING id
    `,
  );
  console.log(JSON.stringify({ ok: true, updated: rows.length }));
};

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(JSON.stringify({ ok: false, errorMessage: message }));
  process.exitCode = 1;
});
