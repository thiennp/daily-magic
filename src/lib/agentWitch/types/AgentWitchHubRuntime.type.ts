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
  findAgentClientForUser(
    userId: string,
    deviceId?: string,
  ): AgentWitchHubClient | undefined;
  listOnlineAgentClientsForUser(userId: string): readonly AgentWitchHubClient[];
  updateClient(
    clientId: string,
    patch: Partial<
      Pick<
        AgentWitchHubClient,
        "deviceLabel" | "lastHeartbeatAt" | "deviceId" | "userId"
      >
    >,
  ): void;
  broadcastToDashboardUser(
    userId: string | undefined,
    message: AgentWitchMessage,
  ): void;
  bindAgentClientsToPairing(pairingToken: string): void;
}
