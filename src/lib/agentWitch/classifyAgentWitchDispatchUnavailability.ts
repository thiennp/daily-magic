import { findAgentWitchDeviceById } from "@/lib/agentWitch/findAgentWitchDeviceById";
import { isAgentWitchDeviceRecentlySeen } from "@/lib/agentWitch/agentWitchHeartbeat.constant";

export type AgentWitchDispatchUnavailability =
  "reconnecting" | "replaced" | "offline";

/**
 * Only an active row can be "reconnecting": revoked rows stop receiving
 * `last_seen_at` touches, so their freshness is frozen at revocation time and
 * says nothing about whether the Mac is connected.
 */
export const classifyAgentWitchDispatchUnavailability = async (
  deviceId: string,
): Promise<AgentWitchDispatchUnavailability> => {
  const device = await findAgentWitchDeviceById(deviceId);

  if (device === null) {
    return "offline";
  }

  if (device.revokedAt !== null) {
    return "replaced";
  }

  return isAgentWitchDeviceRecentlySeen(device.lastSeenAt, Date.now())
    ? "reconnecting"
    : "offline";
};
