import { ensureDeviceCodeSchema } from "@/lib/agentAccess/deviceCode/ensureDeviceCodeSchema";
import {
  hashRefreshToken,
  isAgentAccessRefreshToken,
} from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import { hashAgentAccessToken } from "@/lib/agentAccess/hashAgentAccessToken";
import { asRowArray, getSql } from "@/lib/db";

export type RevokeAgentAccessTokenResult =
  | { readonly ok: true }
  | { readonly ok: false; readonly code: "not_found" };

/**
 * Revoke by access token or refresh token. Idempotent for unknown tokens
 * (RFC 7009 style: always succeed from client POV when format is valid).
 */
export const revokeAgentAccessToken = async (input: {
  readonly token: string;
  readonly nowMs?: number;
}): Promise<RevokeAgentAccessTokenResult> => {
  const token = input.token.trim();
  if (token.length === 0) {
    return { ok: false, code: "not_found" };
  }

  await ensureDeviceCodeSchema();
  const nowIso = new Date(input.nowMs ?? Date.now()).toISOString();
  const sql = getSql();

  const hash = isAgentAccessRefreshToken(token)
    ? hashRefreshToken(token)
    : hashAgentAccessToken(token);

  const updated = asRowArray(
    isAgentAccessRefreshToken(token)
      ? await sql`
          UPDATE agent_access_tokens
          SET revoked_at = ${nowIso},
              refresh_token_hash = NULL
          WHERE refresh_token_hash = ${hash}
            AND revoked_at IS NULL
          RETURNING id
        `
      : await sql`
          UPDATE agent_access_tokens
          SET revoked_at = ${nowIso},
              refresh_token_hash = NULL
          WHERE token_hash = ${hash}
            AND revoked_at IS NULL
          RETURNING id
        `,
  );

  if (updated.length === 0) {
    return { ok: false, code: "not_found" };
  }

  return { ok: true };
};
