import type { AgentWitchPairingStore } from "./agentWitchPairingStore";
import {
  bindAgentClientsToPairing,
  broadcastToDashboardUser,
  findAgentClientForUser,
} from "./agentWitchHubClientOperations";
import {
  buildAgentWitchHubStatus,
  listConnectedAgentWitchClients,
  listSortedHarnessManifestReports,
} from "./agentWitchHubQueries";
import { handleAgentPairMessageAsync } from "./handleAgentPairMessageAsync";
import { handleAgentWitchSyncMessage } from "./handleAgentWitchSyncMessage";
import {
  resolvePairingTokenFromRegisterPayload,
  resolveRoleFromRegisterPayload,
} from "./resolveAgentWitchRegisterPayload";
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
    if (!this.connectedAtByClientId.has(client.id)) {
      this.connectedAtByClientId.set(client.id, Date.now());
    }

    this.clients.set(client.id, client);
  }

  unregisterClient(clientId: string): void {
    this.clients.delete(clientId);
    this.connectedAtByClientId.delete(clientId);
    this.manifestByAgentClientId.delete(clientId);
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
    const sender = this.clients.get(senderId);

    if (message.type === AGENT_WITCH_MESSAGE_TYPES.AGENT_PAIR) {
      return handleAgentPairMessageAsync(this, senderId, message, sender);
    }

    return handleAgentWitchSyncMessage(this, senderId, message, sender);
  }

  resolveRoleFromRegisterPayload(
    payload: Readonly<Record<string, unknown>> | undefined,
  ) {
    return resolveRoleFromRegisterPayload(payload);
  }

  resolvePairingTokenFromRegisterPayload(
    payload: Readonly<Record<string, unknown>> | undefined,
  ) {
    return resolvePairingTokenFromRegisterPayload(payload);
  }

  async resolveUserIdForAgentRegister(
    pairingToken: string,
  ): Promise<string | undefined> {
    const claimedPairing =
      await this.pairingStore.resolveClaimedPairing(pairingToken);
    if (claimedPairing !== null) {
      void this.pairingStore.touchLastSeen(pairingToken);
    }
    return claimedPairing?.userId;
  }

  findAgentClientForUser(userId: string): AgentWitchHubClient | undefined {
    return findAgentClientForUser(this.clients, userId);
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
