import type { AgentWitchDevicePlatform } from "@/lib/agentWitch/types/AgentWitchDevicePlatform.type";
import { getSql } from "@/lib/db";

export const updateAgentWitchDevicePlatform = async (input: {
  readonly deviceId: string;
  readonly platform: AgentWitchDevicePlatform;
}): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE agent_witch_devices
    SET platform = ${input.platform}
    WHERE id = ${input.deviceId}
      AND revoked_at IS NULL
  `;
};
