import { ensureDeviceCodeSchema } from "@/lib/agentAccess/deviceCode/ensureDeviceCodeSchema";
import { hashUserCode } from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import { parseSqlTimestamptz } from "@/lib/agentAccess/deviceCode/parseSqlTimestamptz";
import { asRowArray, getSql } from "@/lib/db";

export type PendingDeviceRequestForConfirm =
  | {
      readonly ok: true;
      readonly id: string;
      readonly clientName: string | null;
      readonly displayName: string | null;
      readonly termsVersion: string | null;
      readonly createdAt: string;
    }
  | {
      readonly ok: false;
      readonly status: number;
      readonly code: string;
      readonly error: string;
    };

export const loadPendingDeviceRequestForConfirm = async (input: {
  readonly normalizedUserCode: string;
  readonly nowMs: number;
}): Promise<PendingDeviceRequestForConfirm> => {
  await ensureDeviceCodeSchema();
  const sql = getSql();
  const userCodeHash = hashUserCode(input.normalizedUserCode);

  const pending = asRowArray(
    await sql`
      SELECT id, status, client_name, display_name, expires_at,
             terms_version, created_at
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

  const expiresAt = parseSqlTimestamptz(pending.expires_at);

  if (pending.status !== "pending") {
    return {
      ok: false,
      status: 409,
      code: "already_decided",
      error: "This code was already used.",
    };
  }

  if (expiresAt.length === 0 || Date.parse(expiresAt) <= input.nowMs) {
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

  return {
    ok: true,
    id: pending.id,
    clientName:
      typeof pending.client_name === "string" ? pending.client_name : null,
    displayName:
      typeof pending.display_name === "string" ? pending.display_name : null,
    termsVersion:
      typeof pending.terms_version === "string" ? pending.terms_version : null,
    createdAt: parseSqlTimestamptz(pending.created_at),
  };
};
