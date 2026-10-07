-- Soft tip feat/awc-cost-control-api-r1: plan/entitlements + infra spend hooks.
-- Pricing LOCK: trial default → Pro/Team; admin_free flag only; no self-serve Free.
-- Cloud message storage gated in app code (paid only). No customer margin math.

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS plan TEXT NOT NULL DEFAULT 'trial',
  ADD COLUMN IF NOT EXISTS trial_started_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS admin_free BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS seat_count INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'users_plan_check'
  ) THEN
    ALTER TABLE users
      ADD CONSTRAINT users_plan_check
      CHECK (plan IN ('trial', 'pro', 'team', 'admin_free'));
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'users_seat_count_check'
  ) THEN
    ALTER TABLE users
      ADD CONSTRAINT users_seat_count_check
      CHECK (seat_count >= 1);
  END IF;
END $$;

UPDATE users
SET
  trial_started_at = COALESCE(trial_started_at, created_at),
  trial_ends_at = COALESCE(trial_ends_at, created_at + INTERVAL '1 month')
WHERE plan = 'trial'
  AND (trial_started_at IS NULL OR trial_ends_at IS NULL);

CREATE TABLE IF NOT EXISTS billing_infra_spend_months (
  month_key TEXT PRIMARY KEY,
  railway_spend_eur NUMERIC(12, 2) NOT NULL DEFAULT 0,
  neon_spend_eur NUMERIC(12, 2) NOT NULL DEFAULT 0,
  related_infra_spend_eur NUMERIC(12, 2) NOT NULL DEFAULT 0,
  trial_gate TEXT NOT NULL DEFAULT 'open'
    CHECK (trial_gate IN ('open', 'closed')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
