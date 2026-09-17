import { attemptAgentWitchWatchdogReinstall as attemptWatchdogReinstall } from "@agent-witch/install-watchdog";

import type { AgentWitchReviveTargetResult } from "./agentWitchRevive.types";
import { reinstallAgentWitchFromInstallScript } from "./reinstallAgentWitchFromInstallScript";

export type { AgentWitchWatchdogReinstallAttemptResult } from "@agent-witch/install-watchdog/types";

export const attemptAgentWitchWatchdogReinstall = async (
  targets: readonly AgentWitchReviveTargetResult[],
) =>
  attemptWatchdogReinstall(targets, () =>
    reinstallAgentWitchFromInstallScript(),
  );
