import { ensureAgentWitchCoupledWakeClientHealth } from "./ensureAgentWitchCoupledWakeClientHealth";
import { kickstartAgentWitchLaunchAgent } from "./kickstartAgentWitchLaunchAgent";
import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";
import { spawnAgentWitchClient } from "./spawnAgentWitchClient";
import { buildAgentWitchWatchdogStatusResponse } from "./buildAgentWitchWatchdogStatus";
import type { AgentWitchWatchdogStatusResponse } from "./buildAgentWitchWatchdogStatus";
import {
  readAgentWitchWatchdogLogs,
  type AgentWitchWatchdogLogEntry,
} from "./agentWitchWatchdogLog";
import {
  buildAgentWitchSelfUpdateStatus,
  runAgentWitchSelfUpdate,
} from "./agentWitchSelfUpdate";
import { runAgentWitchUninstallLocal } from "./agentWitchUninstallLocal";
import { readAgentWitchSelfUpdateLogs } from "./agentWitchSelfUpdateLog";
import {
  reviveAgentWitchWebSocket,
  type AgentWitchReviveResult,
} from "./reviveAgentWitchWebSocket";

export type {
  AgentWitchWakeHealthResponse,
  AgentWitchWakeIdentityResponse,
} from "../apps/bridge/features/discovery/features/health-identity/public-api/types";

export interface AgentWitchWakeKickResult {
  readonly launchAgentLabel: string;
  readonly profileEmail: string | null;
  readonly ok: boolean;
  readonly errorMessage?: string;
}

export interface AgentWitchWakeResponse {
  readonly ok: boolean;
  readonly kicked: readonly AgentWitchWakeKickResult[];
}

export type { AgentWitchHarnessInstallWakeResponse } from "../apps/bridge/features/awc-proxy/features/harness-proxy/public-api/types";

export type {
  AgentWitchAutomationRunWakeResponse,
  AgentWitchAutomationStatusWakeResponse,
  AgentWitchAutomationSyncWakeResponse,
} from "../apps/bridge/features/awc-proxy/features/automations-proxy/public-api/types";

export type {
  AgentWitchWatchdogLogEntry,
  AgentWitchWatchdogStatusResponse,
  AgentWitchReviveResult,
};

export { installHarnessFromWakeServer } from "../apps/bridge/features/awc-proxy/features/harness-proxy/public-api/infrastructure";

export {
  buildAgentWitchAutomationStatusFromWakeServer,
  runAutomationFromWakeServer,
  syncAutomationsFromWakeServer,
} from "../apps/bridge/features/awc-proxy/features/automations-proxy/public-api/infrastructure";

export {
  buildAgentWitchWakeHealthResponse,
  buildAgentWitchWakeIdentityResponse,
} from "../apps/bridge/features/discovery/features/health-identity/public-api/infrastructure";

export const wakeAgentWitchLaunchAgents =
  async (): Promise<AgentWitchWakeResponse> => {
    await ensureAgentWitchCoupledWakeClientHealth();
    const targets = listAgentWitchLaunchTargets();
    const kicked: AgentWitchWakeKickResult[] = [];

    for (const target of targets) {
      const result = await kickstartAgentWitchLaunchAgent(
        target.launchAgentLabel,
      );
      kicked.push({
        launchAgentLabel: target.launchAgentLabel,
        profileEmail: target.profileEmail,
        ok: result.ok,
        ...(result.errorMessage !== undefined
          ? { errorMessage: result.errorMessage }
          : {}),
      });
    }

    if (!kicked.some((entry) => entry.ok)) {
      const spawned = spawnAgentWitchClient();
      kicked.push({
        launchAgentLabel: "direct-spawn",
        profileEmail: null,
        ok: spawned.ok,
        ...(spawned.errorMessage !== undefined
          ? { errorMessage: spawned.errorMessage }
          : {}),
      });
    }

    return {
      ok: kicked.some((entry) => entry.ok),
      kicked,
    };
  };

export const readAgentWitchWatchdogLogEntries = (
  limit: number = 20,
): readonly AgentWitchWatchdogLogEntry[] => readAgentWitchWatchdogLogs(limit);

export const buildAgentWitchWatchdogStatus =
  buildAgentWitchWatchdogStatusResponse;

export const reviveAgentWitchWebSocketFromWakeServer =
  reviveAgentWitchWebSocket;

/** Kickstart Agent Witch, verify WS health, and reinstall from install script when revive fails. */
export const restartAgentWitchFromWakeServer = reviveAgentWitchWebSocket;

export const buildAgentWitchSelfUpdateStatusFromWakeServer =
  buildAgentWitchSelfUpdateStatus;

export const readAgentWitchSelfUpdateLogEntries = (
  limit: number = 20,
): ReturnType<typeof readAgentWitchSelfUpdateLogs> =>
  readAgentWitchSelfUpdateLogs(limit);

export const runAgentWitchSelfUpdateFromWakeServer = (input?: {
  readonly force?: boolean;
}): ReturnType<typeof runAgentWitchSelfUpdate> =>
  runAgentWitchSelfUpdate(input);

export const runAgentWitchUninstallLocalFromWakeServer = (): ReturnType<
  typeof runAgentWitchUninstallLocal
> => runAgentWitchUninstallLocal();
