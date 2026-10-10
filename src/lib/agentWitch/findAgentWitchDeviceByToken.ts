import hashPairingToken from "@/lib/agentWitch/hashPairingToken";
import mapAgentWitchDeviceRow from "@/lib/agentWitch/mapAgentWitchDeviceRow";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export async function findAgentWitchDeviceByToken(
  pairingToken: string,
): Promise<AgentWitchDeviceRecord | null> {
  const sql = getSql();
  const tokenHash = hashPairingToken(pairingToken);
  const result = asRowArray(
    await sql`
      SELECT id, user_id, device_label, claimed_at, last_seen_at, revoked_at, superseded_by_device_id
      FROM agent_witch_devices
      WHERE token_hash = ${tokenHash}
      LIMIT 1
    `,
  );

  if (!result[0]) {
    return null;
  }

  return mapAgentWitchDeviceRow(result[0]);
}

export interface AgentWitchDeviceRevokeAudit {
  readonly deviceId: string;
  readonly revokedReason: string | null;
  readonly supersededByDeviceId: string | null;
}

/** Why a token's row is revoked, for the register rejection log line. */
export async function findAgentWitchDeviceRevokeAuditByToken(
  pairingToken: string,
): Promise<AgentWitchDeviceRevokeAudit | null> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT dev.id, dev.revoked_reason, dev.superseded_by_device_id
      FROM agent_witch_devices dev
      WHERE dev.token_hash = ${hashPairingToken(pairingToken)}
      LIMIT 1
    `,
  );
  const row = result[0];
  if (row === undefined) {
    return null;
  }
  const supersededBy =
    typeof row.superseded_by_device_id === "string"
      ? row.superseded_by_device_id
      : null;
  return {
    deviceId: String(row.id),
    revokedReason:
      typeof row.revoked_reason === "string" ? row.revoked_reason : null,
    supersededByDeviceId: supersededBy,
  };
}
