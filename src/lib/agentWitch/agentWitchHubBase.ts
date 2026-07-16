import type { AgentWitchPairingStore } from "./agentWitchPairingStore";
import {
  registerAgentWitchHubClient,
  unregisterAgentWitchHubClient,
  updateAgentWitchHubClient,
} from "./agentWitchHubClientRegistry";
import {
  dispatchAgentWitchHubMessage,
  dispatchAgentWitchHubMessageAsync,
} from "./agentWitchHubMessageDispatch";
import {
  buildAgentWitchHubStatus,
  listConnectedAgentWitchClients,
  listSortedHarnessManifestReports,
} from "./agentWitchHubQueries";
import type AgentWitchHubClient from "./types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "./types/AgentWitchHubRuntime.type";
import type { AgentWitchHarnessManifestReport } from "./types/AgentWitchHubStatus.type";
import type AgentWitchMessage from "./types/AgentWitchMessage.type";

export class AgentWitchHubBase {
  protected readonly clients = new Map<string, AgentWitchHubClient>();
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
      Pick<
        AgentWitchHubClient,
        "deviceLabel" | "lastHeartbeatAt" | "deviceId" | "userId"
      >
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
    return dispatchAgentWitchHubMessage(
      this as unknown as AgentWitchHubRuntime,
      this.clients,
      senderId,
      message,
    );
  }

  async handleMessageAsync(
    senderId: string,
    message: AgentWitchMessage,
  ): Promise<AgentWitchMessage | null> {
    return dispatchAgentWitchHubMessageAsync(
      this as unknown as AgentWitchHubRuntime,
      this.clients,
      senderId,
      message,
    );
  }
}
