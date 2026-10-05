import { ensureAgentAccessSchema } from "@/lib/agentAccess/ensureAgentAccessSchema";
import { getSql } from "@/lib/db";

const schemaEnsureState: {
  ensured: boolean;
  promise: Promise<void> | null;
} = {
  ensured: false,
  promise: null,
};

export const resetClaimBotSchemaEnsureForTests = (): void => {
  schemaEnsureState.ensured = false;
  schemaEnsureState.promise = null;
};

export const ensureClaimBotSchema = async (): Promise<void> => {
  await ensureAgentAccessSchema();
  if (schemaEnsureState.ensured) {
    return;
  }
  if (schemaEnsureState.promise !== null) {
    return schemaEnsureState.promise;
  }
  schemaEnsureState.promise = (async () => {
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS agent_bot_claim_codes (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        token_id TEXT NOT NULL REFERENCES agent_access_tokens(id) ON DELETE CASCADE,
        code_hash TEXT NOT NULL UNIQUE,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        redeemed_at TIMESTAMPTZ,
        redeemed_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
        superseded_at TIMESTAMPTZ,
        revoked_at TIMESTAMPTZ
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS agent_bot_claim_entry_failures (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS agent_bot_claim_entry_locks (
        user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        locked_until TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    schemaEnsureState.ensured = true;
  })();
  return schemaEnsureState.promise;
};
