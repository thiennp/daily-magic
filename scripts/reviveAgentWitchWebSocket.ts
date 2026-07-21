import { isActiveMacOsConsoleUser } from "./isActiveMacOsConsoleUser";
import { AGENT_WITCH_CONNECTION_STALE_MS } from "./agentWitchConnectionHealth.constants";

import {
  isAgentWitchConnectionHealthStale,
  readAgentWitchConnectionHealth,
} from "./agentWitchConnectionHealth";
import type {
  AgentWitchReviveReason,
  AgentWitchReviveResult,
  AgentWitchReviveTargetResult,
  AgentWitchWatchdogTargetStatus,
} from "./agentWitchRevive.types";
import { isAgentWitchLaunchAgentRunning } from "./isAgentWitchLaunchAgentRunning";
import { kickstartAgentWitchLaunchAgent } from "./kickstartAgentWitchLaunchAgent";
import { listAgentWitchLaunchTargets } from "./listAgentWitchLaunchTargets";
import {
  resolveAgentWitchInstallDir,
  resolveAgentWitchLocalLayout,
} from "./resolveAgentWitchLocalLayout";
import { spawnAgentWitchClient } from "./spawnAgentWitchClient";
import { verifyAgentWitchReviveAfterKickstart } from "./verifyAgentWitchReviveAfterKickstart";
import {
  appendAgentWitchWatchdogLog,
  type AgentWitchWatchdogLogEvent,
} from "./agentWitchWatchdogLog";

export type {
  AgentWitchReviveReason,
  AgentWitchReviveResult,
  AgentWitchReviveTargetResult,
  AgentWitchWatchdogTargetStatus,
} from "./agentWitchRevive.types";

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
  reinstall?: Pick<
    AgentWitchReviveResult,
    "reinstallAttempted" | "reinstallOk" | "reinstallErrorMessage"
  >,
): string => {
  const revived = results.filter((entry) => entry.revived);
  if (revived.length > 0) {
    return `Revived ${revived.map((entry) => entry.launchAgentLabel).join(", ")}`;
  }

  if (reinstall?.reinstallAttempted === true) {
    if (reinstall.reinstallOk === true) {
      return "Reinstalled Agent Witch from install script and retried kickstart.";
    }

    return (
      reinstall.reinstallErrorMessage ??
      "Agent Witch reinstall from install script failed."
    );
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
  reinstall?: Pick<
    AgentWitchReviveResult,
    "reinstallAttempted" | "reinstallOk"
  >,
): AgentWitchWatchdogLogEvent => {
  if (reinstall?.reinstallAttempted === true) {
    return reinstall.reinstallOk === true
      ? "reinstall_triggered"
      : "reinstall_failed";
  }

  if (results.some((entry) => entry.revived)) {
    return "revive_triggered";
  }

  if (!ok) {
    return "revive_failed";
  }

  return "check_complete";
};

const reviveTarget = async (input: {
  readonly launchAgentLabel: string;
  readonly profileEmail: string | null;
  readonly reason: AgentWitchReviveReason;
  readonly staleAfterMs: number;
}): Promise<AgentWitchReviveTargetResult> => {
  const kickResult = await kickstartAgentWitchLaunchAgent(
    input.launchAgentLabel,
  );
  let revived = kickResult.ok;
  let errorMessage = kickResult.errorMessage;

  if (revived) {
    const verified = await verifyAgentWitchReviveAfterKickstart({
      launchAgentLabel: input.launchAgentLabel,
      profileEmail: input.profileEmail,
      staleAfterMs: input.staleAfterMs,
    });
    revived = verified;
    if (!verified) {
      errorMessage = "Connection still stale after kickstart.";
    }
  }

  return {
    launchAgentLabel: input.launchAgentLabel,
    profileEmail: input.profileEmail,
    revived,
    reason: input.reason,
    ...(errorMessage !== undefined ? { errorMessage } : {}),
  };
};

export const reviveAgentWitchWebSocket = async (input?: {
  readonly staleAfterMs?: number;
  readonly skipLog?: boolean;
}): Promise<AgentWitchReviveResult> => {
  if (!isActiveMacOsConsoleUser()) {
    return { ok: true, targets: [] };
  }

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

    results.push(
      await reviveTarget({
        launchAgentLabel: target.launchAgentLabel,
        profileEmail: target.profileEmail,
        reason,
        staleAfterMs,
      }),
    );
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

  let reinstallAttempted = false;
  let reinstallOk = false;
  let reinstallErrorMessage: string | undefined;
  let finalTargets = results;

  if (results.some((entry) => entry.reason !== "healthy" && !entry.revived)) {
    // Dynamic import so a partial self-update (missing reinstall helper) cannot
    // crash-loop the whole Agent Witch process on module load (AGENT-049).
    try {
      const { attemptAgentWitchWatchdogReinstall } =
        await import("./attemptAgentWitchWatchdogReinstall");
      const reinstall = await attemptAgentWitchWatchdogReinstall(results);
      reinstallAttempted = reinstall.attempted;
      reinstallOk = reinstall.ok;
      reinstallErrorMessage = reinstall.errorMessage;
      finalTargets = [...reinstall.targets];
    } catch (error) {
      reinstallAttempted = true;
      reinstallOk = false;
      reinstallErrorMessage =
        error instanceof Error
          ? error.message
          : "Watchdog reinstall helper is unavailable.";
    }
  }

  const result: AgentWitchReviveResult = {
    ok: finalTargets.some(
      (entry) => entry.revived || entry.reason === "healthy",
    ),
    targets: finalTargets,
    ...(reinstallAttempted
      ? {
          reinstallAttempted,
          reinstallOk,
          ...(reinstallErrorMessage !== undefined
            ? { reinstallErrorMessage }
            : {}),
        }
      : {}),
  };

  if (input?.skipLog !== true) {
    appendAgentWitchWatchdogLog({
      event: resolveWatchdogLogEvent(finalTargets, result.ok, {
        reinstallAttempted,
        reinstallOk,
      }),
      ok: result.ok,
      message: buildWatchdogLogMessage(finalTargets, {
        reinstallAttempted,
        reinstallOk,
        reinstallErrorMessage,
      }),
      targets: finalTargets,
    });
  }

  return result;
};
