-- DF-014 follow-up: owner can Copy the prompt for a still-usable assistant
-- invite from any device. Nullable AES-256-GCM ciphertext of the invite token
-- (same scheme as project_connections: scrypt(AUTH_SECRET, purpose salt),
-- 12-byte IV, auth tag appended). token_hash stays the redeem lookup key.
-- NULL = legacy invite (created before 107) or AUTH_SECRET missing at create:
-- Copy is not available, owner makes a new invite.
-- Cleared on revoke and when an unusable invite (used / revoked / expired) is
-- swept on owner create / reveal. Additive only; 108 is reserved elsewhere.

ALTER TABLE project_invites
  ADD COLUMN IF NOT EXISTS token_ciphertext TEXT;

ALTER TABLE project_invites
  ADD COLUMN IF NOT EXISTS token_iv TEXT;
