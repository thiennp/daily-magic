export const AGENT_WITCH_CONNECTION_HEALTH_FILE_NAME = "connection-health.json";

export interface AgentWitchConnectionHealth {
  readonly lastAckAt: string;
  readonly wsUrl: string | null;
  readonly connectedAt: string | null;
}

export const AGENT_WITCH_CONNECTION_STALE_MS = 120_000;
