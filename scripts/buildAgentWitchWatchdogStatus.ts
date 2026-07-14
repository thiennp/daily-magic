import os from "node:os";

import { AGENT_WITCH_CONNECTION_STALE_MS } from "./agentWitchConnectionHealth.constants";
import {
  readAgentWitchWatchdogLogs,
  type AgentWitchWatchdogLogEntry,
} from "./agentWitchWatchdogLog";
import {
  inspectAgentWitchWebSocketTargets,
  type AgentWitchWatchdogTargetStatus,
} from "./reviveAgentWitchWebSocket";

export interface AgentWitchWatchdogStatusResponse {
  readonly ok: boolean;
  readonly hostname: string;
  readonly checkedAt: string;
  readonly staleAfterMs: number;
  readonly healthyProfileCount: number;
  readonly profiles: readonly AgentWitchWatchdogTargetStatus[];
  readonly lastLog: AgentWitchWatchdogLogEntry | null;
}

export const buildAgentWitchWatchdogStatusResponse =
  async (): Promise<AgentWitchWatchdogStatusResponse> => {
    const profiles = await inspectAgentWitchWebSocketTargets();
    const healthyProfileCount = profiles.filter(
      (profile) => !profile.needsRevive,
    ).length;

    return {
      ok: healthyProfileCount === profiles.length,
      hostname: os.hostname(),
      checkedAt: new Date().toISOString(),
      staleAfterMs: AGENT_WITCH_CONNECTION_STALE_MS,
      healthyProfileCount,
      profiles,
      lastLog: readAgentWitchWatchdogLogs(1)[0] ?? null,
    };
  };
