import {
  findAgentClientForUser,
  listOnlineAgentClientsForUser,
} from "@/lib/agentWitch/agentWitchHubClientOperations";
import { enrichOnlineAgentClients } from "@/lib/agentWitch/enrichOnlineAgentClients";
import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";

const toClientMap = (
  clients: readonly AgentWitchHubClient[],
): Map<string, AgentWitchHubClient> =>
  new Map(clients.map((client) => [client.id, client]));

const resolveAgentClientByDeviceToken = async (
  clients: readonly AgentWitchHubClient[],
  userId: string,
  deviceId: string,
): Promise<AgentWitchHubClient | undefined> => {
  for (const client of listOnlineAgentClientsForUser(
    toClientMap(clients),
    userId,
  )) {
    if (client.pairingToken === undefined) {
      continue;
    }

    const device = await findAgentWitchDeviceByToken(client.pairingToken);
    if (device?.id === deviceId && device.revokedAt === null) {
      return client;
    }
  }

  return undefined;
};

export const findEnrichedAgentClientForUser = async (
  runtime: AgentWitchHubRuntime,
  userId: string,
  deviceId?: string,
): Promise<AgentWitchHubClient | undefined> => {
  const enriched = await enrichOnlineAgentClients(
    runtime.pairingStore,
    runtime.listAgentClients(),
  );
  const clientMap = toClientMap(enriched);
  const matched = findAgentClientForUser(clientMap, userId, deviceId);

  if (matched !== undefined || deviceId === undefined) {
    return matched;
  }

  return resolveAgentClientByDeviceToken(enriched, userId, deviceId);
};
