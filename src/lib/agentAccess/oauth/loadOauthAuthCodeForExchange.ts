import { hashOauthSecret } from "@/lib/agentAccess/oauth/hashOauthSecrets";
import type { ExchangeAuthorizationCodeResult } from "@/lib/agentAccess/oauth/ExchangeAuthorizationCodeResult.type";
import { parseSqlTimestamptz } from "@/lib/agentAccess/deviceCode/parseSqlTimestamptz";
import { verifyPkceS256 } from "@/lib/agentAccess/oauth/verifyPkceS256";
import { asRowArray, getSql } from "@/lib/db";

export type OauthAuthCodeForExchange = {
  readonly id: string;
  readonly code_challenge: string;
};

export const loadOauthAuthCodeForExchange = async (input: {
  readonly code: string;
  readonly redirectUri: string;
  readonly clientId: string;
  readonly codeVerifier: string;
  readonly nowMs: number;
}): Promise<
  | { readonly ok: true; readonly row: OauthAuthCodeForExchange }
  | ExchangeAuthorizationCodeResult
> => {
  const sql = getSql();
  const codeHash = hashOauthSecret(input.code);
  const row = asRowArray(
    await sql`
      SELECT id, redirect_uri, code_challenge, expires_at, used_at, client_id
      FROM agent_access_oauth_auth_codes
      WHERE code_hash = ${codeHash}
      LIMIT 1
    `,
  )[0];

  if (row === undefined || typeof row.id !== "string") {
    return {
      ok: false,
      status: 400,
      body: {
        error: "invalid_grant",
        error_description: "authorization code unknown.",
      },
    };
  }

  if (String(row.client_id) !== input.clientId) {
    return {
      ok: false,
      status: 400,
      body: {
        error: "invalid_grant",
        error_description: "client_id mismatch.",
      },
    };
  }

  if (String(row.redirect_uri) !== input.redirectUri) {
    return {
      ok: false,
      status: 400,
      body: {
        error: "invalid_grant",
        error_description: "redirect_uri mismatch.",
      },
    };
  }

  if (row.used_at !== null && row.used_at !== undefined) {
    return {
      ok: false,
      status: 400,
      body: {
        error: "invalid_grant",
        error_description: "authorization code already used.",
      },
    };
  }

  const expiresAt = parseSqlTimestamptz(row.expires_at);
  if (expiresAt.length === 0 || Date.parse(expiresAt) <= input.nowMs) {
    return {
      ok: false,
      status: 400,
      body: {
        error: "invalid_grant",
        error_description: "authorization code expired.",
      },
    };
  }

  if (
    !verifyPkceS256({
      codeVerifier: input.codeVerifier,
      codeChallenge: String(row.code_challenge),
    })
  ) {
    return {
      ok: false,
      status: 400,
      body: {
        error: "invalid_grant",
        error_description: "PKCE verification failed.",
      },
    };
  }

  return {
    ok: true,
    row: { id: row.id, code_challenge: String(row.code_challenge) },
  };
};
