import mapAgentWitchDeviceRow from "@/lib/agentWitch/mapAgentWitchDeviceRow";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";
import { asRowArray, getSql } from "@/lib/db";

/** Labels too generic to use for same-Mac reclaim on reinstall. */
export const isReusableDeviceLabel = (
  deviceLabel: string | null,
): deviceLabel is string => {
  if (deviceLabel === null) {
    return false;
  }

  const trimmed = deviceLabel.trim();
  if (trimmed.length === 0) {
    return false;
  }

  return trimmed.toLowerCase() !== "mac";
};

export async function findActiveAgentWitchDeviceByUserAndLabel(
  userId: string,
  deviceLabel: string,
): Promise<AgentWitchDeviceRecord | null> {
  if (!isReusableDeviceLabel(deviceLabel)) {
    return null;
  }

  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT id, user_id, device_label, display_name, dispatch_policy, claimed_at, last_seen_at, revoked_at
      FROM agent_witch_devices
      WHERE user_id = ${userId}
        AND revoked_at IS NULL
        AND device_label = ${deviceLabel.trim()}
      ORDER BY
        CASE
          WHEN display_name IS NOT NULL AND btrim(display_name) <> '' THEN 0
          ELSE 1
        END,
        claimed_at ASC
      LIMIT 1
    `,
  );

  if (!result[0]) {
    return null;
  }

  return mapAgentWitchDeviceRow(result[0]);
}
