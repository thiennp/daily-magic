import {
  DEVICE_ACCESS_TOKEN_TTL_MS,
  DEVICE_REFRESH_TOKEN_TTL_MS,
} from "@/lib/agentAccess/deviceCode/deviceCode.constants";
import {
  createRefreshToken,
  hashRefreshToken,
} from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import {
  createAgentAccessToken,
  hashAgentAccessToken,
} from "@/lib/agentAccess/hashAgentAccessToken";
import { asRowArray, getSql } from "@/lib/db";

export type DeviceIssuedTokenPair = {
  readonly tokenId: string;
  readonly accessToken: string;
  readonly refreshToken: string;
};

/**
 * Insert ACCOUNT credential (owner-bound) with terms columns.
 * Caller stages one-time plaintext delivery after approve succeeds.
 */
export const insertDeviceIssuedAccessToken = async (input: {
  readonly userId: string;
  readonly ownerUserId: string;
  readonly termsVersion: string;
  readonly termsAcceptedAt: string;
  readonly nowMs: number;
}): Promise<DeviceIssuedTokenPair | null> => {
  const accessToken = createAgentAccessToken();
  const refreshToken = createRefreshToken();
  const accessExpires = new Date(input.nowMs + DEVICE_ACCESS_TOKEN_TTL_MS);
  const refreshExpires = new Date(input.nowMs + DEVICE_REFRESH_TOKEN_TTL_MS);
  const sql = getSql();

  const tokenRows = asRowArray(
    await sql`
      INSERT INTO agent_access_tokens (
        user_id, token_hash, token_prefix, registration_method, agentmail_inbox,
        owner_user_id, expires_at, refresh_token_hash, refresh_expires_at,
        terms_version, terms_accepted_at
      )
      VALUES (
        ${input.userId},
        ${hashAgentAccessToken(accessToken)},
        ${accessToken.slice(0, 10)},
        'none',
        NULL,
        ${input.ownerUserId},
        ${accessExpires.toISOString()},
        ${hashRefreshToken(refreshToken)},
        ${refreshExpires.toISOString()},
        ${input.termsVersion},
        ${input.termsAcceptedAt}
      )
      RETURNING id
    `,
  );
  const tokenId = tokenRows[0]?.id;
  if (typeof tokenId !== "string") {
    return null;
  }

  return { tokenId, accessToken, refreshToken };
};

export const stageDeviceTokenDelivery = async (input: {
  readonly deviceRequestId: string;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly nowIso: string;
}): Promise<void> => {
  const sql = getSql();
  await sql`
    INSERT INTO agent_access_device_token_delivery (
      device_request_id, access_token, refresh_token, created_at
    )
    VALUES (
      ${input.deviceRequestId},
      ${input.accessToken},
      ${input.refreshToken},
      ${input.nowIso}
    )
    ON CONFLICT (device_request_id) DO NOTHING
  `;
};
