import { ensureOauthSchema } from "@/lib/agentAccess/oauth/ensureOauthSchema";
import {
  createOauthClientId,
  createOauthClientSecret,
  hashOauthSecret,
} from "@/lib/agentAccess/oauth/hashOauthSecrets";
import { isAllowedOauthRedirectUri } from "@/lib/agentAccess/oauth/isAllowedOauthRedirectUri";
import { OAUTH_CLIENT_NAME_MAX } from "@/lib/agentAccess/oauth/oauth.constants";
import type { RegisterOauthClientResult } from "@/lib/agentAccess/oauth/RegisterOauthClientResult.type";
import { getSql } from "@/lib/db";

export type { RegisterOauthClientResult };

export const registerOauthClient = async (input: {
  readonly body: unknown;
}): Promise<RegisterOauthClientResult> => {
  if (input.body === null || typeof input.body !== "object") {
    return {
      ok: false,
      status: 400,
      error: "invalid_client_metadata",
      error_description: "JSON body required.",
    };
  }
  const raw = input.body as Record<string, unknown>;
  const redirectUrisRaw = raw.redirect_uris;
  if (!Array.isArray(redirectUrisRaw) || redirectUrisRaw.length === 0) {
    return {
      ok: false,
      status: 400,
      error: "invalid_redirect_uri",
      error_description: "redirect_uris must be a non-empty array.",
    };
  }
  const redirectUris: string[] = [];
  for (const uri of redirectUrisRaw) {
    if (typeof uri !== "string" || !isAllowedOauthRedirectUri(uri)) {
      return {
        ok: false,
        status: 400,
        error: "invalid_redirect_uri",
        error_description:
          "Each redirect_uri must be https or localhost http; javascript/data rejected.",
      };
    }
    redirectUris.push(uri.trim());
  }

  const clientName =
    typeof raw.client_name === "string" && raw.client_name.trim().length > 0
      ? raw.client_name.trim().slice(0, OAUTH_CLIENT_NAME_MAX)
      : null;

  const authMethod =
    typeof raw.token_endpoint_auth_method === "string"
      ? raw.token_endpoint_auth_method
      : "client_secret_post";

  if (authMethod !== "client_secret_post" && authMethod !== "none") {
    return {
      ok: false,
      status: 400,
      error: "invalid_client_metadata",
      error_description:
        'token_endpoint_auth_method must be "client_secret_post" or "none".',
    };
  }

  await ensureOauthSchema();
  const clientId = createOauthClientId();
  const clientSecret =
    authMethod === "none" ? null : createOauthClientSecret();
  const sql = getSql();
  await sql`
    INSERT INTO agent_access_oauth_clients (
      client_id, client_secret_hash, client_name, redirect_uris,
      token_endpoint_auth_method
    )
    VALUES (
      ${clientId},
      ${clientSecret === null ? null : hashOauthSecret(clientSecret)},
      ${clientName},
      ${redirectUris},
      ${authMethod}
    )
  `;

  return {
    ok: true,
    body: {
      client_id: clientId,
      ...(clientSecret !== null ? { client_secret: clientSecret } : {}),
      client_name: clientName,
      redirect_uris: redirectUris,
      token_endpoint_auth_method: authMethod,
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      code_challenge_methods: ["S256"],
    },
  };
};
