import {
  DEVICE_ACCESS_TOKEN_TTL_MS,
  DEVICE_REFRESH_TOKEN_TTL_MS,
} from "@/lib/agentAccess/deviceCode/deviceCode.constants";
import { ensureDeviceCodeSchema } from "@/lib/agentAccess/deviceCode/ensureDeviceCodeSchema";
import {
  createRefreshToken,
  hashRefreshToken,
  isAgentAccessRefreshToken,
} from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import { parseSqlTimestamptz } from "@/lib/agentAccess/deviceCode/parseSqlTimestamptz";
import { refreshDeviceInvalidGrant } from "@/lib/agentAccess/deviceCode/refreshDeviceInvalidGrant";
import type { RefreshDeviceAccessTokenResult } from "@/lib/agentAccess/deviceCode/RefreshDeviceAccessTokenResult.type";
import {
  createAgentAccessToken,
  hashAgentAccessToken,
} from "@/lib/agentAccess/hashAgentAccessToken";
import { asRowArray, getSql } from "@/lib/db";

export type { RefreshDeviceAccessTokenResult };

/** Rotate refresh token on each use (RFC 8628 / best practice). */
export const refreshDeviceAccessToken = async (input: {
  readonly refreshToken: string;
  readonly nowMs?: number;
}): Promise<RefreshDeviceAccessTokenResult> => {
  const refreshToken = input.refreshToken.trim();
  if (!isAgentAccessRefreshToken(refreshToken)) {
    return refreshDeviceInvalidGrant("refresh_token is invalid.");
  }

  await ensureDeviceCodeSchema();
  const nowMs = input.nowMs ?? Date.now();
  const nowIso = new Date(nowMs).toISOString();
  const sql = getSql();
  const refreshHash = hashRefreshToken(refreshToken);

  const row = asRowArray(
    await sql`
      SELECT id, revoked_at, refresh_expires_at
      FROM agent_access_tokens
      WHERE refresh_token_hash = ${refreshHash}
      LIMIT 1
    `,
  )[0];

  if (row === undefined || typeof row.id !== "string") {
    return refreshDeviceInvalidGrant(
      "refresh_token is unknown or already rotated.",
    );
  }

  if (row.revoked_at !== null && row.revoked_at !== undefined) {
    return refreshDeviceInvalidGrant("Token was revoked.");
  }

  const refreshExpiresAt = parseSqlTimestamptz(row.refresh_expires_at);
  if (
    refreshExpiresAt.length === 0 ||
    Date.parse(refreshExpiresAt) <= nowMs
  ) {
    return refreshDeviceInvalidGrant("refresh_token expired.");
  }

  const nextAccess = createAgentAccessToken();
  const nextRefresh = createRefreshToken();
  const accessExpires = new Date(nowMs + DEVICE_ACCESS_TOKEN_TTL_MS);
  const refreshExpires = new Date(nowMs + DEVICE_REFRESH_TOKEN_TTL_MS);

  // Atomic rotate: only succeed if refresh hash still matches (reuse detection).
  const rotated = asRowArray(
    await sql`
      UPDATE agent_access_tokens
      SET token_hash = ${hashAgentAccessToken(nextAccess)},
          token_prefix = ${nextAccess.slice(0, 10)},
          expires_at = ${accessExpires.toISOString()},
          refresh_token_hash = ${hashRefreshToken(nextRefresh)},
          refresh_expires_at = ${refreshExpires.toISOString()},
          last_used_at = ${nowIso}
      WHERE id = ${row.id}
        AND refresh_token_hash = ${refreshHash}
        AND revoked_at IS NULL
      RETURNING id
    `,
  );

  if (rotated.length === 0) {
    return refreshDeviceInvalidGrant("refresh_token was already rotated.");
  }

  return {
    ok: true,
    status: 200,
    body: {
      access_token: nextAccess,
      token_type: "Bearer",
      expires_in: Math.floor(DEVICE_ACCESS_TOKEN_TTL_MS / 1000),
      refresh_token: nextRefresh,
    },
  };
};
