import type { AgentWitchReviveTargetResult } from "./agentWitchRevive.types";
import {
  canRunAgentWitchWatchdogReinstall,
  recordAgentWitchWatchdogReinstallAttempt,
} from "./agentWitchWatchdogReinstallState";
import { kickstartAgentWitchLaunchAgent } from "./kickstartAgentWitchLaunchAgent";
import { reinstallAgentWitchFromInstallScript } from "./reinstallAgentWitchFromInstallScript";

export interface AgentWitchWatchdogReinstallAttemptResult {
  readonly attempted: boolean;
  readonly ok: boolean;
  readonly errorMessage?: string;
  readonly targets: readonly AgentWitchReviveTargetResult[];
}

export const attemptAgentWitchWatchdogReinstall = async (
  targets: readonly AgentWitchReviveTargetResult[],
): Promise<AgentWitchWatchdogReinstallAttemptResult> => {
  const failedTargets = targets.filter(
    (entry) => entry.reason !== "healthy" && !entry.revived,
  );

  if (failedTargets.length === 0 || !canRunAgentWitchWatchdogReinstall()) {
    return { attempted: false, ok: false, targets };
  }

  recordAgentWitchWatchdogReinstallAttempt();
  const reinstall = await reinstallAgentWitchFromInstallScript();

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
