-- Account page: avatar colour, notification toggles and quiet hours (one JSON blob per user).
-- Runtime twin: src/lib/account/accountPrefsDb.ts (ALTER TABLE ... IF NOT EXISTS).
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS account_prefs JSONB NOT NULL DEFAULT '{}'::jsonb;
