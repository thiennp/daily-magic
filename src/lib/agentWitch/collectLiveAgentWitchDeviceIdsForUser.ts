import { resolveLiveAgentClientsByDeviceIdForUser } from "@/lib/agentWitch/resolveLiveAgentClientsByDeviceIdForUser";
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
  const byDeviceId = await resolveLiveAgentClientsByDeviceIdForUser(
    runtime,
    userId,
  );

  return new Set(byDeviceId.keys());
};
