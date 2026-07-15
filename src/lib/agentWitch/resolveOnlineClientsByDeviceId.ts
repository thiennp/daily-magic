import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";

export const resolveOnlineClientsByDeviceId = async (
  clients: readonly AgentWitchHubClient[],
): Promise<Map<string, AgentWitchHubClient>> => {
  const byDeviceId = new Map<string, AgentWitchHubClient>();

  for (const client of clients) {
    if (client.deviceId !== undefined) {
      byDeviceId.set(client.deviceId, client);
    }
  }

  for (const client of clients) {
    if (client.pairingToken === undefined) {
      continue;
    }

    const device = await findAgentWitchDeviceByToken(client.pairingToken);
    if (device === null || device.revokedAt !== null) {
      continue;
    }

    if (!byDeviceId.has(device.id)) {
      byDeviceId.set(device.id, client);
    }
  }

  return byDeviceId;
};
