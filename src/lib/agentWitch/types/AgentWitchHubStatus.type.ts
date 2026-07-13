import type { AgentWitchRole } from "./AgentWitchRole.type";

export default interface AgentWitchHubStatus {
  readonly agentCount: number;
  readonly dashboardCount: number;
}

export interface AgentWitchConnectedClient {
  readonly id: string;
  readonly role: AgentWitchRole;
  readonly connectedAt: string;
  readonly userId?: string;
  readonly deviceId?: string;
  readonly deviceLabel?: string;
  readonly lastHeartbeatAt?: string;
}

export interface AgentWitchHarnessManifestReport {
  readonly agentClientId: string;
  readonly hostname: string;
  readonly manifest: Readonly<Record<string, unknown>>;
  readonly reportedAt: string;
  readonly userId?: string;
}
