import { findAgentClientForUser } from "@/lib/agentWitch/agentWitchHubClientOperations";
import { enrichOnlineAgentClients } from "@/lib/agentWitch/enrichOnlineAgentClients";
import { resolveLiveAgentClientsByDeviceIdForUser } from "@/lib/agentWitch/resolveLiveAgentClientsByDeviceIdForUser";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";

const toClientMap = (
  clients: readonly AgentWitchHubClient[],
): Map<string, AgentWitchHubClient> =>
  new Map(clients.map((client) => [client.id, client]));

export const findEnrichedAgentClientForUser = async (
  runtime: AgentWitchHubRuntime,
  userId: string,
  deviceId?: string,
): Promise<AgentWitchHubClient | undefined> => {
  if (deviceId !== undefined) {
    const liveByDeviceId = await resolveLiveAgentClientsByDeviceIdForUser(
      runtime,
      userId,
    );
    const fromLiveMap = liveByDeviceId.get(deviceId);
    if (fromLiveMap !== undefined) {
      return fromLiveMap;
    }

    return undefined;
  }

  const liveByDeviceId = await resolveLiveAgentClientsByDeviceIdForUser(
    runtime,
    userId,
  );
  const liveClients = [...liveByDeviceId.values()];
  if (liveClients.length === 1) {
    return liveClients[0];
  }

  const enriched = await enrichOnlineAgentClients(
    runtime.pairingStore,
    runtime.listAgentClients(),
  );
  const clientMap = toClientMap(enriched);
  return findAgentClientForUser(clientMap, userId, undefined);
};
