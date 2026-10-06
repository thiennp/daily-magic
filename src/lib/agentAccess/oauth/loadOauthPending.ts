import { ensureOauthSchema } from "@/lib/agentAccess/oauth/ensureOauthSchema";
import { asRowArray, getSql } from "@/lib/db";

export type OauthPendingRow = {
  readonly id: string;
  readonly clientId: string;
  readonly redirectUri: string;
  readonly codeChallenge: string;
  readonly codeChallengeMethod: string;
  readonly state: string | null;
  readonly clientDisplayName: string | null;
  readonly expiresAt: string;
};

export const loadOauthPending = async (input: {
  readonly pendingId: string;
  readonly nowMs?: number;
}): Promise<OauthPendingRow | null> => {
  await ensureOauthSchema();
  const sql = getSql();
  const row = asRowArray(
    await sql`
      SELECT id, client_id, redirect_uri, code_challenge, code_challenge_method,
             state, client_display_name, expires_at
      FROM agent_access_oauth_pending
      WHERE id = ${input.pendingId}
      LIMIT 1
    `,
  )[0];
  if (row === undefined || typeof row.id !== "string") {
    return null;
  }
  const expiresAt =
    typeof row.expires_at === "string"
      ? row.expires_at
      : row.expires_at instanceof Date
        ? row.expires_at.toISOString()
        : "";
  const nowMs = input.nowMs ?? Date.now();
  if (expiresAt.length === 0 || Date.parse(expiresAt) <= nowMs) {
    await sql`DELETE FROM agent_access_oauth_pending WHERE id = ${row.id}`;
    return null;
  }
  return {
    id: row.id,
    clientId: String(row.client_id),
    redirectUri: String(row.redirect_uri),
    codeChallenge: String(row.code_challenge),
    codeChallengeMethod: String(row.code_challenge_method),
    state: typeof row.state === "string" ? row.state : null,
    clientDisplayName:
      typeof row.client_display_name === "string"
        ? row.client_display_name
        : null,
    expiresAt,
  };
};
