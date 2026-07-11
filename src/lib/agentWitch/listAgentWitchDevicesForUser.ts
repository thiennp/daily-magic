import mapAgentWitchDeviceRow from "@/lib/agentWitch/mapAgentWitchDeviceRow";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export async function listAgentWitchDevicesForUser(
  userId: string,
): Promise<readonly AgentWitchDeviceRecord[]> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT id, user_id, device_label, claimed_at, last_seen_at, revoked_at
      FROM agent_witch_devices
      WHERE user_id = ${userId}
      ORDER BY COALESCE(last_seen_at, claimed_at) DESC
    `,
  );

  return result.map(mapAgentWitchDeviceRow);
}
