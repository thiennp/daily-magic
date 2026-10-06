import { ensureDeviceCodeSchema } from "@/lib/agentAccess/deviceCode/ensureDeviceCodeSchema";
import {
  formatUserCodeDisplay,
  hashUserCode,
  normalizeUserCode,
} from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import { asRowArray, getSql } from "@/lib/db";

export type DeviceRequestRow = {
  readonly id: string;
  readonly status: string;
  readonly clientName: string | null;
  readonly displayName: string | null;
  readonly expiresAt: string;
  readonly ownerUserId: string | null;
  readonly tokenId: string | null;
  readonly userCodeDisplay: string;
};

export const loadDeviceRequestByUserCode = async (input: {
  readonly userCode: string;
  readonly nowMs?: number;
}): Promise<DeviceRequestRow | null> => {
  await ensureDeviceCodeSchema();
  const normalized = normalizeUserCode(input.userCode);
  if (normalized.length !== 8) {
    return null;
  }
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT id, status, client_name, display_name, expires_at,
             owner_user_id, token_id
      FROM agent_access_device_requests
      WHERE user_code_hash = ${hashUserCode(normalized)}
      LIMIT 1
    `,
  );
  const row = rows[0];
  if (row === undefined || typeof row.id !== "string") {
    return null;
  }
  const expiresAt =
    typeof row.expires_at === "string"
      ? row.expires_at
      : row.expires_at instanceof Date
        ? row.expires_at.toISOString()
        : "";
  const nowMs = input.nowMs ?? Date.now();
  let status = typeof row.status === "string" ? row.status : "pending";
  if (status === "pending" && expiresAt.length > 0 && Date.parse(expiresAt) <= nowMs) {
    status = "expired";
    await sql`
      UPDATE agent_access_device_requests
      SET status = 'expired'
      WHERE id = ${row.id} AND status = 'pending'
    `;
  }
  return {
    id: row.id,
    status,
    clientName: typeof row.client_name === "string" ? row.client_name : null,
    displayName: typeof row.display_name === "string" ? row.display_name : null,
    expiresAt,
    ownerUserId:
      typeof row.owner_user_id === "string" ? row.owner_user_id : null,
    tokenId: typeof row.token_id === "string" ? row.token_id : null,
    userCodeDisplay: formatUserCodeDisplay(normalized),
  };
};
