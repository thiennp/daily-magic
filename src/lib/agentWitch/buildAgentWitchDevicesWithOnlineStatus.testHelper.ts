import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";

export const onlineClientsByDeviceId = (
  clients: readonly AgentWitchHubClient[],
): Map<string, AgentWitchHubClient> =>
  new Map(
    clients.flatMap((client) =>
      client.deviceId === undefined ? [] : [[client.deviceId, client] as const],
    ),
  );
