import type { AgentWitchDeviceWriter } from "@/lib/agentWitch/deviceWriters";
import { getSql } from "@/lib/db";

export const updateAgentWitchDeviceWriters = async (input: {
  readonly deviceId: string;
  readonly writers: readonly AgentWitchDeviceWriter[];
}): Promise<void> => {
  const json = JSON.stringify(input.writers);
  await getSql()`
    UPDATE agent_witch_devices
    SET writers = ${json}::jsonb
    WHERE id = ${input.deviceId}
      AND revoked_at IS NULL
      AND writers IS DISTINCT FROM ${json}::jsonb
  `;
};
