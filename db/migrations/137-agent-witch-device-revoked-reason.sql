-- Why a computer row was revoked: superseded | user_revoked | placeholder_sweep
-- | placeholder_replaced | placeholder_consumed. Lets register tell a real
-- computer whose replacement was deleted (healed) from a removal done on
-- purpose (kept revoked), and explains any "device_not_linked" after the fact.
-- Rows revoked before this migration keep NULL and are never auto-healed.
ALTER TABLE agent_witch_devices
  ADD COLUMN IF NOT EXISTS revoked_reason TEXT;
