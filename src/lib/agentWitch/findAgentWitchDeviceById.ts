import mapAgentWitchDeviceRow from "@/lib/agentWitch/mapAgentWitchDeviceRow";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export async function findAgentWitchDeviceById(
  deviceId: string,
): Promise<AgentWitchDeviceRecord | null> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT id, user_id, device_label, display_name, dispatch_policy, claimed_at, last_seen_at, revoked_at
      FROM agent_witch_devices
      WHERE id = ${deviceId}
      LIMIT 1
    `,
  );

  if (!result[0]) {
    return null;
  }

  return mapAgentWitchDeviceRow(result[0]);
}
