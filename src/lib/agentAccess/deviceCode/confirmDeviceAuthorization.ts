import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { buildSyntheticAgentEmail } from "@/lib/agentAccess/buildSyntheticAgentEmail";
import { consumeAgentAccessBucket } from "@/lib/agentAccess/consumeAgentAccessBucket";
import {
  DEVICE_VERIFY_BUCKET,
  DEVICE_VERIFY_PER_HOUR,
} from "@/lib/agentAccess/deviceCode/deviceCode.constants";
import type { ConfirmDeviceAuthorizationResult } from "@/lib/agentAccess/deviceCode/ConfirmDeviceAuthorizationResult.type";
import { finalizeDeviceAuthorizationConfirm } from "@/lib/agentAccess/deviceCode/finalizeDeviceAuthorizationConfirm";
import {
  formatUserCodeDisplay,
  normalizeUserCode,
} from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import { loadPendingDeviceRequestForConfirm } from "@/lib/agentAccess/deviceCode/loadPendingDeviceRequestForConfirm";
import { resolveAgentAccessRegisterUser } from "@/lib/agentAccess/resolveAgentAccessRegisterUser";
import { getSql } from "@/lib/db";

export type { ConfirmDeviceAuthorizationResult };

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

  const nowMs = input.nowMs ?? Date.now();
  const nowIso = new Date(nowMs).toISOString();
  const pending = await loadPendingDeviceRequestForConfirm({
    normalizedUserCode: normalized,
    nowMs,
  });
  if (!pending.ok) {
    return pending;
  }

  const email = buildSyntheticAgentEmail();
  const userId = await resolveAgentAccessRegisterUser({
    email,
    displayName: pending.displayName ?? pending.clientName,
  });
  if (typeof userId !== "string") {
    return {
      ok: false,
      status: userId.status,
      code: userId.code,
      error: userId.error,
    };
  }

  if (pending.displayName !== null) {
    const sql = getSql();
    await sql`UPDATE users SET name = ${pending.displayName} WHERE id = ${userId}`;
  }

  const termsVersion =
    pending.termsVersion !== null && pending.termsVersion.length > 0
      ? pending.termsVersion
      : AWC_TERMS_VERSION;
  const termsAcceptedAt =
    pending.createdAt.length > 0 ? pending.createdAt : nowIso;

  const finalized = await finalizeDeviceAuthorizationConfirm({
    userId,
    ownerUserId: input.ownerUserId,
    deviceRequestId: pending.id,
    termsVersion,
    termsAcceptedAt,
    nowMs,
    nowIso,
  });
  if (!finalized.ok) {
    return finalized;
  }

  return {
    ok: true,
    tokenId: finalized.tokenId,
    botUserId: userId,
    clientName: pending.clientName,
    userCodeDisplay: formatUserCodeDisplay(normalized),
  };
};
