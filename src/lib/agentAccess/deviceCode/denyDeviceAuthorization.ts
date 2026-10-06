import { consumeAgentAccessBucket } from "@/lib/agentAccess/consumeAgentAccessBucket";
import {
  DEVICE_VERIFY_BUCKET,
  DEVICE_VERIFY_PER_HOUR,
} from "@/lib/agentAccess/deviceCode/deviceCode.constants";
import { ensureDeviceCodeSchema } from "@/lib/agentAccess/deviceCode/ensureDeviceCodeSchema";
import {
  hashUserCode,
  normalizeUserCode,
} from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import { asRowArray, getSql } from "@/lib/db";

export type DenyDeviceAuthorizationResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly status: number;
      readonly code: string;
      readonly error: string;
    };

export const denyDeviceAuthorization = async (input: {
  readonly userCode: string;
  readonly ownerUserId: string;
  readonly ipHash: string;
  readonly nowMs?: number;
}): Promise<DenyDeviceAuthorizationResult> => {
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
  const sql = getSql();

  const updated = asRowArray(
    await sql`
      UPDATE agent_access_device_requests
      SET status = 'denied',
          owner_user_id = ${input.ownerUserId},
          decided_at = ${nowIso}
      WHERE user_code_hash = ${hashUserCode(normalized)}
        AND status = 'pending'
        AND expires_at > ${nowIso}::timestamptz
      RETURNING id
    `,
  );

  if (updated.length === 0) {
    return {
      ok: false,
      status: 409,
      code: "not_pending",
      error: "This code is not waiting for a decision.",
    };
  }

  return { ok: true };
};
