import { enrichOnlineAgentClients } from "@/lib/agentWitch/enrichOnlineAgentClients";
import { resolveOnlineClientsByDeviceId } from "@/lib/agentWitch/resolveOnlineClientsByDeviceId";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";

/**
 * Live agent hub clients for `userId`, keyed by resolved device id.
 * Same resolution as `collectLiveAgentWitchDeviceIdsForUser` / devices API `live` tier.
 */
export const resolveLiveAgentClientsByDeviceIdForUser = async (
  runtime: AgentWitchHubRuntime,
  userId: string,
): Promise<Map<string, AgentWitchHubClient>> => {
  const enriched = await enrichOnlineAgentClients(
    runtime.pairingStore,
    runtime.listAgentClients(),
  );
  const agentsForUser = enriched.filter(
    (client) => client.role === "agent" && client.userId === userId,
  );

  return resolveOnlineClientsByDeviceId(agentsForUser);
};
