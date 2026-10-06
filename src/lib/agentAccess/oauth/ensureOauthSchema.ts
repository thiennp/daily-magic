import { ensureDeviceCodeSchema } from "@/lib/agentAccess/deviceCode/ensureDeviceCodeSchema";
import { getSql } from "@/lib/db";

const state: { ensured: boolean; promise: Promise<void> | null } = {
  ensured: false,
  promise: null,
};

export const resetOauthSchemaEnsureForTests = (): void => {
  state.ensured = false;
  state.promise = null;
};

export const ensureOauthSchema = async (): Promise<void> => {
  if (state.ensured) return;
  if (state.promise !== null) return state.promise;

  state.promise = (async () => {
    await ensureDeviceCodeSchema();
    const sql = getSql();
    await sql`
      CREATE TABLE IF NOT EXISTS agent_access_oauth_clients (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        client_id TEXT NOT NULL UNIQUE,
        client_secret_hash TEXT,
        client_name TEXT,
        redirect_uris TEXT[] NOT NULL,
        token_endpoint_auth_method TEXT NOT NULL DEFAULT 'client_secret_post',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS agent_access_oauth_auth_codes (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        code_hash TEXT NOT NULL UNIQUE,
        client_id TEXT NOT NULL,
        redirect_uri TEXT NOT NULL,
        code_challenge TEXT NOT NULL,
        code_challenge_method TEXT NOT NULL,
        owner_user_id TEXT NOT NULL,
        token_id TEXT,
        terms_version TEXT NOT NULL,
        client_display_name TEXT,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        used_at TIMESTAMPTZ
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS agent_access_oauth_token_delivery (
        auth_code_id TEXT PRIMARY KEY,
        access_token TEXT NOT NULL,
        refresh_token TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS agent_access_oauth_pending (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        client_id TEXT NOT NULL,
        redirect_uri TEXT NOT NULL,
        code_challenge TEXT NOT NULL,
        code_challenge_method TEXT NOT NULL,
        state TEXT,
        client_display_name TEXT,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    state.ensured = true;
  })();

  return state.promise;
};
