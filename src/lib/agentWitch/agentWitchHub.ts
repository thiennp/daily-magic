import {
  broadcastToDashboardUser,
  broadcastToSubscribedDashboardUser,
  findAgentClientForUser,
  listAgentWitchAgentClients,
  listOnlineAgentClientsForUser,
} from "./agentWitchHubClientOperations";
import { AgentWitchHubBase } from "./agentWitchHubBase";
import {
  bindHubAgentClientsToPairing,
  resolveHubUserIdForAgentRegister,
} from "./agentWitchHubPairingOps";
import type AgentWitchHubClient from "./types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "./types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";

export type {
  AgentWitchConnectedClient,
  AgentWitchHarnessManifestReport,
} from "./types/AgentWitchHubStatus.type";
export type { default as AgentWitchHubStatus } from "./types/AgentWitchHubStatus.type";

export class AgentWitchHub
  extends AgentWitchHubBase
  implements AgentWitchHubRuntime
{
  async resolveUserIdForAgentRegister(
    pairingToken: string,
  ): Promise<string | undefined> {
    return resolveHubUserIdForAgentRegister(this.pairingStore, pairingToken);
  }

  findAgentClientForUser(
    userId: string,
    deviceId?: string,
  ): AgentWitchHubClient | undefined {
    return findAgentClientForUser(this.clients, userId, deviceId);
  }

  listOnlineAgentClientsForUser(
    userId: string,
  ): readonly AgentWitchHubClient[] {
    return listOnlineAgentClientsForUser(this.clients, userId);
  }

  listAgentClients(): readonly AgentWitchHubClient[] {
    return listAgentWitchAgentClients(this.clients);
  }

  broadcastToDashboardUser(
    userId: string | undefined,
    message: AgentWitchMessage,
  ): void {
    broadcastToDashboardUser(this.clients, userId, message);
  }

  broadcastToSubscribedDashboardUser(
    userId: string | undefined,
    subscriptionKey: string,
    message: AgentWitchMessage,
  ): void {
    broadcastToSubscribedDashboardUser(
      this.clients,
      userId,
      subscriptionKey,
      message,
    );
  }

  bindAgentClientsToPairing(pairingToken: string): void {
    bindHubAgentClientsToPairing(this.clients, this.pairingStore, pairingToken);
  }
}
