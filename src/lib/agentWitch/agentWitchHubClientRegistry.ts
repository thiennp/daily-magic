import type { AgentWitchPairingStore } from "./agentWitchPairingStore";
import type AgentWitchHubClient from "./types/AgentWitchHubClient.type";

export const updateAgentWitchHubClient = (
  clients: Map<string, AgentWitchHubClient>,
  clientId: string,
  patch: Partial<
    Pick<
      AgentWitchHubClient,
      "deviceLabel" | "lastHeartbeatAt" | "deviceId" | "userId" | "email"
    >
  >,
): void => {
  const existing = clients.get(clientId);

  if (existing === undefined) {
    return;
  }

  clients.set(clientId, {
    ...existing,
    ...patch,
  });
};

export const registerAgentWitchHubClient = (
  clients: Map<string, AgentWitchHubClient>,
  connectedAtByClientId: Map<string, number>,
  client: AgentWitchHubClient,
): void => {
  if (!connectedAtByClientId.has(client.id)) {
    connectedAtByClientId.set(client.id, Date.now());
  }

  clients.set(client.id, {
    ...client,
    lastHeartbeatAt: client.lastHeartbeatAt ?? new Date().toISOString(),
  });
};

export const unregisterAgentWitchHubClient = (
  clients: Map<string, AgentWitchHubClient>,
  connectedAtByClientId: Map<string, number>,
  manifestByAgentClientId: Map<string, unknown>,
  clientId: string,
): void => {
  clients.delete(clientId);
  connectedAtByClientId.delete(clientId);
  manifestByAgentClientId.delete(clientId);
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
        ...(claimedPairing.deviceId !== undefined
          ? { deviceId: claimedPairing.deviceId }
          : {}),
      });
    }
  });
};
