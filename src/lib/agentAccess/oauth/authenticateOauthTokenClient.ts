import { hashOauthSecret } from "@/lib/agentAccess/oauth/hashOauthSecrets";
import type { ExchangeAuthorizationCodeResult } from "@/lib/agentAccess/oauth/ExchangeAuthorizationCodeResult.type";
import { asRowArray, getSql } from "@/lib/db";

export type OauthTokenClientRow = {
  readonly client_id: string;
  readonly client_secret_hash: unknown;
  readonly token_endpoint_auth_method: unknown;
};

/** Load + authenticate confidential client for the token endpoint. */
export const authenticateOauthTokenClient = async (input: {
  readonly clientId: string;
  readonly clientSecret: string | null;
}): Promise<
  | { readonly ok: true; readonly client: OauthTokenClientRow }
  | ExchangeAuthorizationCodeResult
> => {
  const sql = getSql();
  const client = asRowArray(
    await sql`
      SELECT client_id, client_secret_hash, token_endpoint_auth_method, redirect_uris
      FROM agent_access_oauth_clients
      WHERE client_id = ${input.clientId}
      LIMIT 1
    `,
  )[0];
  if (client === undefined || typeof client.client_id !== "string") {
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

  return {
    ok: true,
    client: {
      client_id: client.client_id,
      client_secret_hash: client.client_secret_hash,
      token_endpoint_auth_method: client.token_endpoint_auth_method,
    },
  };
};
