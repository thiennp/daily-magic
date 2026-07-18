import { enrichOnlineAgentClients } from "@/lib/agentWitch/enrichOnlineAgentClients";
import { resolveOnlineClientsByDeviceId } from "@/lib/agentWitch/resolveOnlineClientsByDeviceId";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";

/**
 * Device ids with a live agent WebSocket on this hub process for `userId`.
 * Enriches pairing metadata and resolves tokens so missing `deviceId` on the
 * hub client still counts as live (dispatch uses the same enrichment).
 */
export const collectLiveAgentWitchDeviceIdsForUser = async (
  runtime: AgentWitchHubRuntime,
  userId: string,
): Promise<ReadonlySet<string>> => {
  const enriched = await enrichOnlineAgentClients(
    runtime.pairingStore,
    runtime.listAgentClients(),
  );
  const agentsForUser = enriched.filter(
    (client) => client.role === "agent" && client.userId === userId,
  );
  const byDeviceId = await resolveOnlineClientsByDeviceId(agentsForUser);

  return new Set(byDeviceId.keys());
};
