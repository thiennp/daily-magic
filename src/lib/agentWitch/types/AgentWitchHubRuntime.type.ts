import type { AgentWitchPairingStore } from "../agentWitchPairingStore";
import type AgentWitchHubClient from "./AgentWitchHubClient.type";
import type { AgentWitchHarnessManifestReport } from "./AgentWitchHubStatus.type";
import type AgentWitchMessage from "./AgentWitchMessage.type";

export default interface AgentWitchHubRuntime {
  readonly manifestByAgentClientId: Map<
    string,
    AgentWitchHarnessManifestReport
  >;
  readonly pairingStore: AgentWitchPairingStore;
  findAgentClientForUser(userId: string): AgentWitchHubClient | undefined;
  broadcastToDashboardUser(
    userId: string | undefined,
    message: AgentWitchMessage,
  ): void;
  bindAgentClientsToPairing(pairingToken: string): void;
}
