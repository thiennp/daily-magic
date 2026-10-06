import { buildSyntheticAgentEmail } from "@/lib/agentAccess/buildSyntheticAgentEmail";
import { consumeAgentAccessBucket } from "@/lib/agentAccess/consumeAgentAccessBucket";
import {
  DEVICE_ACCESS_TOKEN_TTL_MS,
  DEVICE_REFRESH_TOKEN_TTL_MS,
  DEVICE_VERIFY_BUCKET,
  DEVICE_VERIFY_PER_HOUR,
} from "@/lib/agentAccess/deviceCode/deviceCode.constants";
import { ensureDeviceCodeSchema } from "@/lib/agentAccess/deviceCode/ensureDeviceCodeSchema";
import {
  createRefreshToken,
  formatUserCodeDisplay,
  hashRefreshToken,
  hashUserCode,
  normalizeUserCode,
} from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import {
  createAgentAccessToken,
  hashAgentAccessToken,
} from "@/lib/agentAccess/hashAgentAccessToken";
import { resolveAgentAccessRegisterUser } from "@/lib/agentAccess/resolveAgentAccessRegisterUser";
import { asRowArray, getSql } from "@/lib/db";

export type ConfirmDeviceAuthorizationResult =
  | {
      readonly ok: true;
      readonly tokenId: string;
      readonly botUserId: string;
      readonly clientName: string | null;
      readonly userCodeDisplay: string;
    }
  | {
      readonly ok: false;
      readonly status: number;
      readonly code: string;
      readonly error: string;
    };

/**
 * Confirm: creates ACCOUNT credential + owner binding ONLY.
 * Never grants project membership. Plaintext returned once via device/token poll.
 */
export const confirmDeviceAuthorization = async (input: {
  readonly userCode: string;
  readonly ownerUserId: string;
  readonly ipHash: string;
  readonly nowMs?: number;
}): Promise<ConfirmDeviceAuthorizationResult> => {
  const allowed = await consumeAgentAccessBucket({
    subjectHash: input.ipHash,
    bucket: DEVICE_VERIFY_BUCKET,
    limit: DEVICE_VERIFY_PER_HOUR,
  });
  if (!allowed) {
    return {
      ok: false,
      status: 429,
      code: "rate_limited",
      error: "Too many verify attempts. Wait before trying again.",
    };
  }

  const normalized = normalizeUserCode(input.userCode);
  if (normalized.length !== 8) {
    return {
      ok: false,
      status: 400,
      code: "invalid_code",
      error: "Enter the 8-character code.",
    };
  }

  await ensureDeviceCodeSchema();
  const nowMs = input.nowMs ?? Date.now();
  const nowIso = new Date(nowMs).toISOString();
  const userCodeHash = hashUserCode(normalized);
  const sql = getSql();

  const pending = asRowArray(
    await sql`
      SELECT id, status, client_name, display_name, expires_at, terms_version
      FROM agent_access_device_requests
      WHERE user_code_hash = ${userCodeHash}
      LIMIT 1
    `,
  )[0];

  if (pending === undefined || typeof pending.id !== "string") {
    return {
      ok: false,
      status: 404,
      code: "invalid_code",
      error: "That code was not found.",
    };
  }

  const expiresAt =
    typeof pending.expires_at === "string"
      ? pending.expires_at
      : pending.expires_at instanceof Date
        ? pending.expires_at.toISOString()
        : "";

  if (pending.status !== "pending") {
    return {
      ok: false,
      status: 409,
      code: "already_decided",
      error: "This code was already used.",
    };
  }

  if (expiresAt.length === 0 || Date.parse(expiresAt) <= nowMs) {
    await sql`
      UPDATE agent_access_device_requests
      SET status = 'expired'
      WHERE id = ${pending.id} AND status = 'pending'
    `;
    return {
      ok: false,
      status: 410,
      code: "expired",
      error: "This code expired. The assistant must start again.",
    };
  }

  const displayName =
    typeof pending.display_name === "string" ? pending.display_name : null;
  const clientName =
    typeof pending.client_name === "string" ? pending.client_name : null;

  const email = buildSyntheticAgentEmail();
  const userId = await resolveAgentAccessRegisterUser({
    email,
    displayName: displayName ?? clientName,
  });
  if (typeof userId !== "string") {
    return {
      ok: false,
      status: userId.status,
      code: userId.code,
      error: userId.error,
    };
  }

  if (displayName !== null) {
    await sql`UPDATE users SET name = ${displayName} WHERE id = ${userId}`;
  }

  const accessToken = createAgentAccessToken();
  const refreshToken = createRefreshToken();
  const accessExpires = new Date(nowMs + DEVICE_ACCESS_TOKEN_TTL_MS);
  const refreshExpires = new Date(nowMs + DEVICE_REFRESH_TOKEN_TTL_MS);

  const tokenRows = asRowArray(
    await sql`
      INSERT INTO agent_access_tokens (
        user_id, token_hash, token_prefix, registration_method, agentmail_inbox,
        owner_user_id, expires_at, refresh_token_hash, refresh_expires_at
      )
      VALUES (
        ${userId},
        ${hashAgentAccessToken(accessToken)},
        ${accessToken.slice(0, 10)},
        'none',
        NULL,
        ${input.ownerUserId},
        ${accessExpires.toISOString()},
        ${hashRefreshToken(refreshToken)},
        ${refreshExpires.toISOString()}
      )
      RETURNING id
    `,
  );
  const tokenId = tokenRows[0]?.id;
  if (typeof tokenId !== "string") {
    return {
      ok: false,
      status: 500,
      code: "token_create_failed",
      error: "Could not create the account credential.",
    };
  }

  const updated = asRowArray(
    await sql`
      UPDATE agent_access_device_requests
      SET status = 'approved',
          owner_user_id = ${input.ownerUserId},
          token_id = ${tokenId},
          decided_at = ${nowIso}
      WHERE id = ${pending.id}
        AND status = 'pending'
      RETURNING id
    `,
  );

  if (updated.length === 0) {
    await sql`DELETE FROM agent_access_tokens WHERE id = ${tokenId}`;
    return {
      ok: false,
      status: 409,
      code: "already_decided",
      error: "This code was already used.",
    };
  }

  await sql`
    INSERT INTO agent_access_device_token_delivery (
      device_request_id, access_token, refresh_token, created_at
    )
    VALUES (
      ${pending.id},
      ${accessToken},
      ${refreshToken},
      ${nowIso}
    )
    ON CONFLICT (device_request_id) DO NOTHING
  `;

  return {
    ok: true,
    tokenId,
    botUserId: userId,
    clientName,
    userCodeDisplay: formatUserCodeDisplay(normalized),
  };
};
