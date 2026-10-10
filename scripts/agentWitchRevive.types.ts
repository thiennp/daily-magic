import type { AgentWitchLastDisconnect } from "@agent-witch/install-connection-health";

import type { AgentWitchConnectionHealth } from "./agentWitchConnectionHealth.constants";

/**
 * `not_linked` and `cloud_unreachable` are connection problems a restart or
 * reinstall cannot cure (identity rejected / server down), so revive skips them.
 */
export type AgentWitchReviveReason =
  | "healthy"
  | "not_running"
  | "stale_connection"
  | "not_linked"
  | "cloud_unreachable";

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
  /** False when a kickstart/reinstall cannot fix `reason` (see above). */
  readonly reviveCanHelp: boolean;
  readonly reason: AgentWitchReviveReason;
  /** Why the cloud link is down, as recorded by the running client. */
  readonly lastDisconnect: AgentWitchLastDisconnect | null;
}
