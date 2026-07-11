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
      SELECT id, user_id, device_label, claimed_at, last_seen_at, revoked_at
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
