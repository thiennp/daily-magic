import { resolveLiveAgentClientsByDeviceIdForUser } from "@/lib/agentWitch/resolveLiveAgentClientsByDeviceIdForUser";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";

export const retargetWriterRunToSoleLiveMac = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly executorUserId: string;
  readonly targetDeviceId: string;
}): Promise<
  | { readonly agentClient: AgentWitchHubClient; readonly deviceId: string }
  | undefined
> => {
  const liveByDeviceId = await resolveLiveAgentClientsByDeviceIdForUser(
    input.runtime,
    input.executorUserId,
  );
  const liveClients = [...new Set(liveByDeviceId.values()).values()];

  if (liveClients.length !== 1) {
    return undefined;
  }

  const agentClient = liveClients[0];
  const deviceIdsForClient = [...liveByDeviceId.entries()]
    .filter(([, client]) => client.id === agentClient.id)
    .map(([deviceId]) => deviceId);
  const resolvedDeviceId =
    deviceIdsForClient.find((id) => id !== agentClient.deviceId) ??
    deviceIdsForClient[0] ??
    agentClient.deviceId;

  if (
    resolvedDeviceId === undefined ||
    resolvedDeviceId === input.targetDeviceId
  ) {
    return undefined;
  }

  return { agentClient, deviceId: resolvedDeviceId };
};
