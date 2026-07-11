import type { AgentWitchPairingStore } from "./agentWitchPairingStore";
import type AgentWitchHubClient from "./types/AgentWitchHubClient.type";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

export const findAgentClientForUser = (
  clients: Map<string, AgentWitchHubClient>,
  userId: string,
): AgentWitchHubClient | undefined =>
  [...clients.values()].find(
    (client) => client.role === "agent" && client.userId === userId,
  );

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

export const bindAgentClientsToPairing = (
  clients: Map<string, AgentWitchHubClient>,
  pairingStore: AgentWitchPairingStore,
  pairingToken: string,
): void => {
  const claimedPairing = pairingStore.getClaimedPairing(pairingToken);
  if (claimedPairing === null) {
    return;
  }

  [...clients.entries()].forEach(([clientId, client]) => {
    if (client.role === "agent" && client.pairingToken === pairingToken) {
      clients.set(clientId, {
        ...client,
        userId: claimedPairing.userId,
      });
    }
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
