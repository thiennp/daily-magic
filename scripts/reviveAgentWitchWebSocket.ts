import { AGENT_WITCH_CONNECTION_STALE_MS } from "./agentWitchConnectionHealth.constants";
import {
  isAgentWitchConnectionHealthStale,
  readAgentWitchConnectionHealth,
} from "./agentWitchConnectionHealth";
import { isAgentWitchLaunchAgentRunning } from "./isAgentWitchLaunchAgentRunning";
import { kickstartAgentWitchLaunchAgent } from "./kickstartAgentWitchLaunchAgent";
import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";
import {
  resolveAgentWitchInstallDir,
  resolveAgentWitchLocalLayout,
} from "./resolveAgentWitchLocalLayout";
import { spawnAgentWitchClient } from "./spawnAgentWitchClient";
import {
  appendAgentWitchWatchdogLog,
  type AgentWitchWatchdogLogEvent,
} from "./agentWitchWatchdogLog";

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
}

export interface AgentWitchWatchdogTargetStatus {
  readonly launchAgentLabel: string;
  readonly profileEmail: string | null;
  readonly isLaunchAgentRunning: boolean;
  readonly connectionHealth: ReturnType<typeof readAgentWitchConnectionHealth>;
  readonly isConnectionStale: boolean;
  readonly needsRevive: boolean;
  readonly reason: AgentWitchReviveReason;
}

const resolveProfileLayout = (profileEmail: string | null) =>
  profileEmail === null
    ? resolveAgentWitchLocalLayout()
    : resolveAgentWitchLocalLayout(profileEmail);

const shouldReviveTarget = async (
  launchAgentLabel: string,
  profileEmail: string | null,
  staleAfterMs: number,
): Promise<AgentWitchReviveReason> => {
  const isRunning = await isAgentWitchLaunchAgentRunning(launchAgentLabel);
  if (!isRunning) {
    return "not_running";
  }

  const layout = resolveProfileLayout(profileEmail);
  const health = readAgentWitchConnectionHealth(layout);
  if (isAgentWitchConnectionHealthStale(health, staleAfterMs)) {
    return "stale_connection";
  }

  return "healthy";
};

export const inspectAgentWitchWebSocketTargets = async (input?: {
  readonly staleAfterMs?: number;
}): Promise<readonly AgentWitchWatchdogTargetStatus[]> => {
  const staleAfterMs = input?.staleAfterMs ?? AGENT_WITCH_CONNECTION_STALE_MS;
  const installDir = resolveAgentWitchInstallDir();
  const targets = listAgentWitchLaunchTargets(installDir);

  return Promise.all(
    targets.map(async (target) => {
      const reason = await shouldReviveTarget(
        target.launchAgentLabel,
        target.profileEmail,
        staleAfterMs,
      );
      const layout = resolveProfileLayout(target.profileEmail);
      const connectionHealth = readAgentWitchConnectionHealth(layout);
      const isRunning = await isAgentWitchLaunchAgentRunning(
        target.launchAgentLabel,
      );

      return {
        launchAgentLabel: target.launchAgentLabel,
        profileEmail: target.profileEmail,
        isLaunchAgentRunning: isRunning,
        connectionHealth,
        isConnectionStale: isAgentWitchConnectionHealthStale(
          connectionHealth,
          staleAfterMs,
        ),
        needsRevive: reason !== "healthy",
        reason,
      };
    }),
  );
};

const buildWatchdogLogMessage = (
  results: readonly AgentWitchReviveTargetResult[],
): string => {
  const revived = results.filter((entry) => entry.revived);
  if (revived.length > 0) {
    return `Revived ${revived.map((entry) => entry.launchAgentLabel).join(", ")}`;
  }

  const failures = results.filter(
    (entry) => entry.reason !== "healthy" && !entry.revived,
  );
  if (failures.length > 0) {
    return failures
      .map((entry) => entry.errorMessage ?? entry.launchAgentLabel)
      .join("; ");
  }

  return "All Agent Witch WebSocket connections are healthy.";
};

const resolveWatchdogLogEvent = (
  results: readonly AgentWitchReviveTargetResult[],
  ok: boolean,
): AgentWitchWatchdogLogEvent => {
  if (results.some((entry) => entry.revived)) {
    return "revive_triggered";
  }

  if (!ok) {
    return "revive_failed";
  }

  return "check_complete";
};

export const reviveAgentWitchWebSocket = async (input?: {
  readonly staleAfterMs?: number;
  readonly skipLog?: boolean;
}): Promise<AgentWitchReviveResult> => {
  const staleAfterMs = input?.staleAfterMs ?? AGENT_WITCH_CONNECTION_STALE_MS;
  const installDir = resolveAgentWitchInstallDir();
  const targets = listAgentWitchLaunchTargets(installDir);
  const results: AgentWitchReviveTargetResult[] = [];

  for (const target of targets) {
    const reason = await shouldReviveTarget(
      target.launchAgentLabel,
      target.profileEmail,
      staleAfterMs,
    );

    if (reason === "healthy") {
      results.push({
        launchAgentLabel: target.launchAgentLabel,
        profileEmail: target.profileEmail,
        revived: false,
        reason,
      });
      continue;
    }

    const kickResult = await kickstartAgentWitchLaunchAgent(
      target.launchAgentLabel,
    );
    results.push({
      launchAgentLabel: target.launchAgentLabel,
      profileEmail: target.profileEmail,
      revived: kickResult.ok,
      reason,
      ...(kickResult.errorMessage !== undefined
        ? { errorMessage: kickResult.errorMessage }
        : {}),
    });
  }

  if (results.length === 0) {
    const spawned = spawnAgentWitchClient();
    results.push({
      launchAgentLabel: "direct-spawn",
      profileEmail: null,
      revived: spawned.ok,
      reason: "not_running",
      ...(spawned.errorMessage !== undefined
        ? { errorMessage: spawned.errorMessage }
        : {}),
    });
  }

  const result = {
    ok: results.some((entry) => entry.revived || entry.reason === "healthy"),
    targets: results,
  };

  if (input?.skipLog !== true) {
    appendAgentWitchWatchdogLog({
      event: resolveWatchdogLogEvent(results, result.ok),
      ok: result.ok,
      message: buildWatchdogLogMessage(results),
      targets: results,
    });
  }

  return result;
};
