import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { buildSyntheticAgentEmail } from "@/lib/agentAccess/buildSyntheticAgentEmail";
import {
  DEVICE_ACCESS_TOKEN_TTL_MS,
  DEVICE_REFRESH_TOKEN_TTL_MS,
} from "@/lib/agentAccess/deviceCode/deviceCode.constants";
import { ensureDeviceCodeSchema } from "@/lib/agentAccess/deviceCode/ensureDeviceCodeSchema";
import {
  createRefreshToken,
  hashRefreshToken,
} from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import {
  createAgentAccessToken,
  hashAgentAccessToken,
} from "@/lib/agentAccess/hashAgentAccessToken";
import { resolveAgentAccessRegisterUser } from "@/lib/agentAccess/resolveAgentAccessRegisterUser";
import { asRowArray, getSql } from "@/lib/db";

export type IssueOwnedAgentAccessCredentialResult =
  | {
      readonly ok: true;
      readonly tokenId: string;
      readonly botUserId: string;
      readonly accessToken: string;
      readonly refreshToken: string;
      readonly expiresIn: number;
    }
  | {
      readonly ok: false;
      readonly status: number;
      readonly code: string;
      readonly error: string;
    };

/**
 * Shared by device-code confirm (S1) and OAuth consent (S2).
 * Creates ACCOUNT credential + owner_user_id ONLY — never project membership.
 */
export const issueOwnedAgentAccessCredential = async (input: {
  readonly ownerUserId: string;
  readonly displayName?: string | null;
  readonly termsVersion?: string;
  readonly termsAcceptedAt?: string;
  readonly nowMs?: number;
}): Promise<IssueOwnedAgentAccessCredentialResult> => {
  await ensureDeviceCodeSchema();
  const nowMs = input.nowMs ?? Date.now();
  const nowIso = new Date(nowMs).toISOString();
  const displayName = input.displayName ?? null;
  const termsVersion = input.termsVersion ?? AWC_TERMS_VERSION;
  const termsAcceptedAt = input.termsAcceptedAt ?? nowIso;
  const email = buildSyntheticAgentEmail();
  const userId = await resolveAgentAccessRegisterUser({
    email,
    displayName,
  });
  if (typeof userId !== "string") {
    return {
      ok: false,
      status: userId.status,
      code: userId.code,
      error: userId.error,
    };
  }

  const sql = getSql();
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
        owner_user_id, expires_at, refresh_token_hash, refresh_expires_at,
        terms_version, terms_accepted_at
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
        ${refreshExpires.toISOString()},
        ${termsVersion},
        ${termsAcceptedAt}
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

  return {
    ok: true,
    tokenId,
    botUserId: userId,
    accessToken,
    refreshToken,
    expiresIn: Math.floor(DEVICE_ACCESS_TOKEN_TTL_MS / 1000),
  };
};
