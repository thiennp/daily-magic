import { getSql } from "@/lib/db";

const state: { ensured: boolean } = { ensured: false };

export const resetBillingSchemaForTests = (): void => {
  state.ensured = false;
};

/** Idempotent soft ensure for Soft tip billing columns + infra meter table. */
export const ensureBillingSchema = async (): Promise<void> => {
  if (state.ensured) return;
  const sql = getSql();
  await sql`
    ALTER TABLE users
      ADD COLUMN IF NOT EXISTS plan TEXT NOT NULL DEFAULT 'trial',
      ADD COLUMN IF NOT EXISTS trial_started_at TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS admin_free BOOLEAN NOT NULL DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS cost_control_excluded BOOLEAN NOT NULL DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS seat_count INTEGER NOT NULL DEFAULT 1,
      ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
      ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS billing_infra_spend_months (
      month_key TEXT PRIMARY KEY,
      railway_spend_eur NUMERIC(12, 2) NOT NULL DEFAULT 0,
      neon_spend_eur NUMERIC(12, 2) NOT NULL DEFAULT 0,
      related_infra_spend_eur NUMERIC(12, 2) NOT NULL DEFAULT 0,
      trial_gate TEXT NOT NULL DEFAULT 'open'
        CHECK (trial_gate IN ('open', 'closed')),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  state.ensured = true;
};
