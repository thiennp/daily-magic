import type { AgentWitchConnectionHealth } from "./agentWitchConnectionHealth.constants";

export type AgentWitchReviveReason =
  "healthy" | "not_running" | "stale_connection";

export interface AgentWitchReviveTargetResult {
  readonly launchAgentLabel: string;
  readonly profileEmail: string | null;
  readonly revived: boolean;
  readonly reason: AgentWitchReviveReason;
  readonly errorMessage?: string;
}

export interface AgentWitchReviveResult {
  readonly ok: boolean;
  readonly targets: readonly AgentWitchReviveTargetResult[];
  readonly reinstallAttempted?: boolean;
  readonly reinstallOk?: boolean;
  readonly reinstallErrorMessage?: string;
}

export interface AgentWitchWatchdogTargetStatus {
  readonly launchAgentLabel: string;
  readonly profileEmail: string | null;
  readonly isLaunchAgentRunning: boolean;
  readonly connectionHealth: AgentWitchConnectionHealth | null;
  readonly isConnectionStale: boolean;
  readonly needsRevive: boolean;
  readonly reason: AgentWitchReviveReason;
}
