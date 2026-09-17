import { kickstartAgentWitchLaunchAgent } from "@agent-witch/install-macos-launch";

import type {
  AgentWitchWatchdogReinstallAttemptResult,
  AgentWitchWatchdogReviveTarget,
} from "../../public-api/types";

import {
  canRunAgentWitchWatchdogReinstall,
  recordAgentWitchWatchdogReinstallAttempt,
} from "./agentWitchWatchdogReinstallState";

export interface ReinstallAgentWitchFromInstallScriptResult {
  readonly ok: boolean;
  readonly errorMessage?: string;
}

export const attemptAgentWitchWatchdogReinstall = async (
  targets: readonly AgentWitchWatchdogReviveTarget[],
  reinstallFromInstallScript: () => Promise<ReinstallAgentWitchFromInstallScriptResult>,
): Promise<AgentWitchWatchdogReinstallAttemptResult> => {
  const failedTargets = targets.filter(
    (entry) => entry.reason !== "healthy" && !entry.revived,
  );

  if (failedTargets.length === 0 || !canRunAgentWitchWatchdogReinstall()) {
    return { attempted: false, ok: false, targets };
  }

  recordAgentWitchWatchdogReinstallAttempt();
  const reinstall = await reinstallFromInstallScript();

  if (!reinstall.ok) {
    return {
      attempted: true,
      ok: false,
      errorMessage: reinstall.errorMessage,
      targets,
    };
  }

  const retriedTargets = await Promise.all(
    targets.map(async (entry) => {
      if (entry.reason === "healthy" || entry.revived) {
        return entry;
      }

      const kickResult = await kickstartAgentWitchLaunchAgent(
        entry.launchAgentLabel,
      );

      return {
        ...entry,
        revived: kickResult.ok,
        ...(kickResult.errorMessage !== undefined
          ? { errorMessage: kickResult.errorMessage }
          : {}),
      };
    }),
  );

  return {
    attempted: true,
    ok: retriedTargets.some(
      (entry) => entry.revived || entry.reason === "healthy",
    ),
    targets: retriedTargets,
  };
};
