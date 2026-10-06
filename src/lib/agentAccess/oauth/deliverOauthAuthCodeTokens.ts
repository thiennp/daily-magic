import { DEVICE_ACCESS_TOKEN_TTL_MS } from "@/lib/agentAccess/deviceCode/deviceCode.constants";
import type { ExchangeAuthorizationCodeResult } from "@/lib/agentAccess/oauth/ExchangeAuthorizationCodeResult.type";
import { asRowArray, getSql } from "@/lib/db";

/** Mark auth code used and return one-time plaintext tokens. */
export const deliverOauthAuthCodeTokens = async (input: {
  readonly authCodeId: string;
  readonly nowIso: string;
}): Promise<ExchangeAuthorizationCodeResult> => {
  const sql = getSql();
  const marked = asRowArray(
    await sql`
      UPDATE agent_access_oauth_auth_codes
      SET used_at = ${input.nowIso}
      WHERE id = ${input.authCodeId} AND used_at IS NULL
      RETURNING id
    `,
  );
  if (marked.length === 0) {
    return {
      ok: false,
      status: 400,
      body: {
        error: "invalid_grant",
        error_description: "authorization code already used.",
      },
    };
  }

  const delivery = asRowArray(
    await sql`
      DELETE FROM agent_access_oauth_token_delivery
      WHERE auth_code_id = ${input.authCodeId}
      RETURNING access_token, refresh_token
    `,
  )[0];

  const accessToken =
    typeof delivery?.access_token === "string" ? delivery.access_token : null;
  const refreshToken =
    typeof delivery?.refresh_token === "string" ? delivery.refresh_token : null;

  if (accessToken === null || refreshToken === null) {
    return {
      ok: false,
      status: 400,
      body: {
        error: "invalid_grant",
        error_description: "Tokens already delivered.",
      },
    };
  }

  return {
    ok: true,
    status: 200,
    body: {
      access_token: accessToken,
      token_type: "Bearer",
      expires_in: Math.floor(DEVICE_ACCESS_TOKEN_TTL_MS / 1000),
      refresh_token: refreshToken,
      scope: "agent_access",
    },
  };
};
