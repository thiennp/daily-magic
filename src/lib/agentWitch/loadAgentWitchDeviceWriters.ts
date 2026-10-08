import {
  parseStoredDeviceWriters,
  type AgentWitchDeviceWriter,
} from "@/lib/agentWitch/deviceWriters";
import { asRowArray, getSql } from "@/lib/db";

/** Coding tools the computer last reported; empty when it never reported. */
export const loadAgentWitchDeviceWriters = async (
  deviceId: string,
): Promise<readonly AgentWitchDeviceWriter[]> => {
  const rows = asRowArray(
    await getSql()`
      SELECT writers FROM agent_witch_devices WHERE id = ${deviceId} LIMIT 1
    `,
  );
  return parseStoredDeviceWriters(rows[0]?.writers);
};
