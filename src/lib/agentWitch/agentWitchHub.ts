import type { AgentWitchPairingStore } from "./agentWitchPairingStore";
import {
  bindAgentClientsToPairing,
  registerAgentWitchHubClient,
  unregisterAgentWitchHubClient,
  updateAgentWitchHubClient,
} from "./agentWitchHubClientRegistry";
import {
  broadcastToDashboardUser,
  findAgentClientForUser,
  listOnlineAgentClientsForUser,
} from "./agentWitchHubClientOperations";
import {
  buildAgentWitchHubStatus,
  listConnectedAgentWitchClients,
  listSortedHarnessManifestReports,
} from "./agentWitchHubQueries";
import { handleAgentWitchSyncMessage } from "./handleAgentWitchSyncMessage";
import { routeAgentWitchMessageAsync } from "./routeAgentWitchMessageAsync";
import { resolveAgentUserIdForRegister } from "./resolveAgentUserIdForRegister";
import type AgentWitchHubClient from "./types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "./types/AgentWitchHubRuntime.type";
import type { AgentWitchHarnessManifestReport } from "./types/AgentWitchHubStatus.type";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "./types/AgentWitchMessageType.constant";

export type {
  AgentWitchConnectedClient,
  AgentWitchHarnessManifestReport,
} from "./types/AgentWitchHubStatus.type";
export type { default as AgentWitchHubStatus } from "./types/AgentWitchHubStatus.type";

export class AgentWitchHub implements AgentWitchHubRuntime {
  private readonly clients = new Map<string, AgentWitchHubClient>();
  private readonly connectedAtByClientId = new Map<string, number>();
  readonly manifestByAgentClientId = new Map<
    string,
    AgentWitchHarnessManifestReport
  >();

  constructor(readonly pairingStore: AgentWitchPairingStore) {}

  registerClient(client: AgentWitchHubClient): void {
    registerAgentWitchHubClient(
      this.clients,
      this.connectedAtByClientId,
      client,
    );
  }

  updateClient(
    clientId: string,
    patch: Partial<
      Pick<AgentWitchHubClient, "deviceLabel" | "lastHeartbeatAt" | "deviceId">
    >,
  ): void {
    updateAgentWitchHubClient(this.clients, clientId, patch);
  }

  unregisterClient(clientId: string): void {
    unregisterAgentWitchHubClient(
      this.clients,
      this.connectedAtByClientId,
      this.manifestByAgentClientId,
      clientId,
    );
  }

  getStatus() {
    return buildAgentWitchHubStatus([...this.clients.values()]);
  }

  listConnectedClients() {
    return listConnectedAgentWitchClients(
      this.clients,
      this.connectedAtByClientId,
    );
  }

  listHarnessManifestReports() {
    return listSortedHarnessManifestReports(this.manifestByAgentClientId);
  }

  handleMessage(
    senderId: string,
    message: AgentWitchMessage,
  ): AgentWitchMessage | null {
    if (message.type === AGENT_WITCH_MESSAGE_TYPES.AGENT_PAIR) {
      return null;
    }

    return handleAgentWitchSyncMessage(
      this,
      senderId,
      message,
      this.clients.get(senderId),
    );
  }

  async handleMessageAsync(
    senderId: string,
    message: AgentWitchMessage,
  ): Promise<AgentWitchMessage | null> {
    return routeAgentWitchMessageAsync(
      this,
      senderId,
      this.clients.get(senderId),
      message,
    );
  }

  async resolveUserIdForAgentRegister(
    pairingToken: string,
  ): Promise<string | undefined> {
    return resolveAgentUserIdForRegister(this.pairingStore, pairingToken);
  }

  findAgentClientForUser(
    userId: string,
    deviceId?: string,
  ): AgentWitchHubClient | undefined {
    return findAgentClientForUser(this.clients, userId, deviceId);
  }

  listOnlineAgentClientsForUser(userId: string): readonly AgentWitchHubClient[] {
    return listOnlineAgentClientsForUser(this.clients, userId);
  }

  broadcastToDashboardUser(
    userId: string | undefined,
    message: AgentWitchMessage,
  ): void {
    broadcastToDashboardUser(this.clients, userId, message);
  }

  bindAgentClientsToPairing(pairingToken: string): void {
    bindAgentClientsToPairing(this.clients, this.pairingStore, pairingToken);
  }
}
