import { DEVICE_ACCESS_TOKEN_TTL_MS } from "@/lib/agentAccess/deviceCode/deviceCode.constants";
import { ensureOauthSchema } from "@/lib/agentAccess/oauth/ensureOauthSchema";
import { hashOauthSecret } from "@/lib/agentAccess/oauth/hashOauthSecrets";
import { verifyPkceS256 } from "@/lib/agentAccess/oauth/verifyPkceS256";
import { asRowArray, getSql } from "@/lib/db";

export type ExchangeAuthorizationCodeResult =
  | {
      readonly ok: true;
      readonly status: 200;
      readonly body: {
        readonly access_token: string;
        readonly token_type: "Bearer";
        readonly expires_in: number;
        readonly refresh_token: string;
        readonly scope: string;
      };
    }
  | {
      readonly ok: false;
      readonly status: number;
      readonly body: {
        readonly error: string;
        readonly error_description?: string;
      };
    };

export const exchangeAuthorizationCode = async (input: {
  readonly code: string;
  readonly redirectUri: string;
  readonly clientId: string;
  readonly clientSecret: string | null;
  readonly codeVerifier: string;
  readonly nowMs?: number;
}): Promise<ExchangeAuthorizationCodeResult> => {
  await ensureOauthSchema();
  const sql = getSql();
  const nowMs = input.nowMs ?? Date.now();
  const nowIso = new Date(nowMs).toISOString();

  const client = asRowArray(
    await sql`
      SELECT client_id, client_secret_hash, token_endpoint_auth_method, redirect_uris
      FROM agent_access_oauth_clients
      WHERE client_id = ${input.clientId}
      LIMIT 1
    `,
  )[0];
  if (client === undefined) {
    return {
      ok: false,
      status: 401,
      body: {
        error: "invalid_client",
        error_description: "Unknown client_id.",
      },
    };
  }

  const authMethod =
    typeof client.token_endpoint_auth_method === "string"
      ? client.token_endpoint_auth_method
      : "client_secret_post";
  if (authMethod === "client_secret_post") {
    const expectedHash =
      typeof client.client_secret_hash === "string"
        ? client.client_secret_hash
        : null;
    if (
      input.clientSecret === null ||
      expectedHash === null ||
      hashOauthSecret(input.clientSecret) !== expectedHash
    ) {
      return {
        ok: false,
        status: 401,
        body: {
          error: "invalid_client",
          error_description: "client_secret mismatch.",
        },
      };
    }
  }

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

  const expiresAt =
    typeof row.expires_at === "string"
      ? row.expires_at
      : row.expires_at instanceof Date
        ? row.expires_at.toISOString()
        : "";
  if (expiresAt.length === 0 || Date.parse(expiresAt) <= nowMs) {
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

  const marked = asRowArray(
    await sql`
      UPDATE agent_access_oauth_auth_codes
      SET used_at = ${nowIso}
      WHERE id = ${row.id} AND used_at IS NULL
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
      WHERE auth_code_id = ${row.id}
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
