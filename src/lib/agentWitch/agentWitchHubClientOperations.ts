import type AgentWitchHubClient from "./types/AgentWitchHubClient.type";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";
import { isDashboardTerminalSubscribed } from "@/lib/dispatch/dashboardTerminalSubscriptionRegistry";

const sortAgentClientsByRecency = (
  left: AgentWitchHubClient,
  right: AgentWitchHubClient,
): number => {
  const leftHeartbeat = left.lastHeartbeatAt ?? "";
  const rightHeartbeat = right.lastHeartbeatAt ?? "";

  return rightHeartbeat.localeCompare(leftHeartbeat);
};

export const listAgentWitchAgentClients = (
  clients: Map<string, AgentWitchHubClient>,
): readonly AgentWitchHubClient[] =>
  [...clients.values()].filter((client) => client.role === "agent");

export const listOnlineAgentClientsForUser = (
  clients: Map<string, AgentWitchHubClient>,
  userId: string,
): readonly AgentWitchHubClient[] =>
  listAgentWitchAgentClients(clients)
    .filter((client) => client.userId === userId)
    .sort(sortAgentClientsByRecency);

export const findAgentClientForUser = (
  clients: Map<string, AgentWitchHubClient>,
  userId: string,
  deviceId?: string,
): AgentWitchHubClient | undefined => {
  const onlineAgents = listOnlineAgentClientsForUser(clients, userId);

  if (deviceId !== undefined) {
    return onlineAgents.find((client) => client.deviceId === deviceId);
  }

  return onlineAgents[0];
};

export const broadcastToDashboardUser = (
  clients: Map<string, AgentWitchHubClient>,
  userId: string | undefined,
  message: AgentWitchMessage,
): void => {
  [...clients.values()]
    .filter(
      (client) =>
        client.role === "dashboard" &&
        (userId === undefined || client.userId === userId),
    )
    .forEach((client) => {
      client.send(message);
    });
};

export const broadcastToSubscribedDashboardUser = (
  clients: Map<string, AgentWitchHubClient>,
  userId: string | undefined,
  subscriptionKey: string,
  message: AgentWitchMessage,
): void => {
  [...clients.values()]
    .filter(
      (client) =>
        client.role === "dashboard" &&
        (userId === undefined || client.userId === userId) &&
        isDashboardTerminalSubscribed(client.id, subscriptionKey),
    )
    .forEach((client) => {
      client.send(message);
    });
};

export const unauthorizedAgentOnlyError = (
  requestId: string | undefined,
): AgentWitchMessage => ({
  type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
  payload: {
    errorMessage: "Only paired agent clients can publish this message.",
  },
  requestId,
});
