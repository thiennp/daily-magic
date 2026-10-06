import { ensureOauthSchema } from "@/lib/agentAccess/oauth/ensureOauthSchema";
import { createOauthPendingId } from "@/lib/agentAccess/oauth/hashOauthSecrets";
import { isAllowedOauthRedirectUri } from "@/lib/agentAccess/oauth/isAllowedOauthRedirectUri";
import {
  OAUTH_CODE_TTL_MS,
  OAUTH_CONSENT_PATH,
  OAUTH_PKCE_METHOD,
} from "@/lib/agentAccess/oauth/oauth.constants";
import { isPkceS256Method } from "@/lib/agentAccess/oauth/verifyPkceS256";
import { asRowArray, getSql } from "@/lib/db";

export type CreateOauthAuthorizationPendingResult =
  | {
      readonly ok: true;
      readonly consentPath: string;
      readonly pendingId: string;
    }
  | {
      readonly ok: false;
      readonly status: number;
      readonly error: string;
      readonly error_description: string;
    };

export const createOauthAuthorizationPending = async (input: {
  readonly clientId: string;
  readonly redirectUri: string;
  readonly codeChallenge: string;
  readonly codeChallengeMethod: string;
  readonly state: string | null;
  readonly nowMs?: number;
}): Promise<CreateOauthAuthorizationPendingResult> => {
  if (!isAllowedOauthRedirectUri(input.redirectUri)) {
    return {
      ok: false,
      status: 400,
      error: "invalid_request",
      error_description: "redirect_uri is not allowed.",
    };
  }
  if (!isPkceS256Method(input.codeChallengeMethod)) {
    return {
      ok: false,
      status: 400,
      error: "invalid_request",
      error_description: 'code_challenge_method must be "S256" (plain rejected).',
    };
  }
  if (
    input.codeChallenge.trim().length < 43 ||
    input.codeChallenge.trim().length > 128
  ) {
    return {
      ok: false,
      status: 400,
      error: "invalid_request",
      error_description: "code_challenge is required (PKCE S256).",
    };
  }

  await ensureOauthSchema();
  const sql = getSql();
  const client = asRowArray(
    await sql`
      SELECT client_id, client_name, redirect_uris
      FROM agent_access_oauth_clients
      WHERE client_id = ${input.clientId}
      LIMIT 1
    `,
  )[0];

  if (client === undefined || typeof client.client_id !== "string") {
    return {
      ok: false,
      status: 400,
      error: "invalid_client",
      error_description: "Unknown client_id.",
    };
  }

  const registered: unknown = client.redirect_uris;
  const uris = Array.isArray(registered)
    ? registered.map(String)
    : typeof registered === "string"
      ? [registered]
      : [];
  if (!uris.includes(input.redirectUri)) {
    return {
      ok: false,
      status: 400,
      error: "invalid_request",
      error_description: "redirect_uri does not match registration.",
    };
  }

  const nowMs = input.nowMs ?? Date.now();
  const pendingId = createOauthPendingId();
  const clientName =
    typeof client.client_name === "string" ? client.client_name : null;

  await sql`
    INSERT INTO agent_access_oauth_pending (
      id, client_id, redirect_uri, code_challenge, code_challenge_method,
      state, client_display_name, expires_at, created_at
    )
    VALUES (
      ${pendingId},
      ${input.clientId},
      ${input.redirectUri},
      ${input.codeChallenge.trim()},
      ${OAUTH_PKCE_METHOD},
      ${input.state},
      ${clientName},
      ${new Date(nowMs + OAUTH_CODE_TTL_MS).toISOString()},
      ${new Date(nowMs).toISOString()}
    )
  `;

  const params = new URLSearchParams({ pending: pendingId });
  return {
    ok: true,
    pendingId,
    consentPath: `${OAUTH_CONSENT_PATH}?${params.toString()}`,
  };
};
