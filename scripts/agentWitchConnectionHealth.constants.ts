export const AGENT_WITCH_CONNECTION_HEALTH_FILE_NAME = "connection-health.json";

export interface AgentWitchConnectionHealth {
  readonly lastAckAt: string;
  readonly wsUrl: string | null;
  readonly connectedAt: string | null;
}

export const AGENT_WITCH_CONNECTION_STALE_MS = 120_000;

export const AGENT_WITCH_WATCHDOG_LAUNCH_AGENT_LABEL =
  "com.agent-witch-watchdog";

export const AGENT_WITCH_WATCHDOG_INTERVAL_SEC = 60;
