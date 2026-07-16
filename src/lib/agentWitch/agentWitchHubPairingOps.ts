import { bindAgentClientsToPairing } from "./agentWitchHubClientRegistry";
import type { AgentWitchPairingStore } from "./agentWitchPairingStore";
import { resolveAgentUserIdForRegister } from "./resolveAgentUserIdForRegister";
import type AgentWitchHubClient from "./types/AgentWitchHubClient.type";

export const resolveHubUserIdForAgentRegister = async (
  pairingStore: AgentWitchPairingStore,
  pairingToken: string,
): Promise<string | undefined> =>
  resolveAgentUserIdForRegister(pairingStore, pairingToken);

export const bindHubAgentClientsToPairing = (
  clients: Map<string, AgentWitchHubClient>,
  pairingStore: AgentWitchPairingStore,
  pairingToken: string,
): void => {
  bindAgentClientsToPairing(clients, pairingStore, pairingToken);
};
