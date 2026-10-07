import { buildAgentWitchLocalHealthCheckCommand } from "@agent-witch/shared/network";

import { buildAgentWitchReviveAwlSteps } from "@/lib/agentWitch/buildAgentWitchReviveAwlTerminalCommand";
import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";
import { buildAgentWitchRepairCommands } from "@/lib/agentWitch/repair/buildAgentWitchRepairCommands";
import { resolveAgentWitchAppHome } from "@/lib/agentWitch/resolveAgentWitchAppHome";

const productionHostname = new URL(AGENT_WITCH_DEFAULT_ORIGIN).hostname;

export interface RepairThisComputerCommands {
  readonly updateUnix: string;
  readonly updateWindows: string;
  readonly restartMacos: string;
  readonly restartLinux: string;
  readonly healthCheck: string;
}

/** Production commands for the public repair docs page. */
export const resolveRepairThisComputerCommands =
  (): RepairThisComputerCommands => {
    const repair = buildAgentWitchRepairCommands(AGENT_WITCH_DEFAULT_ORIGIN);
    const macRestart = buildAgentWitchReviveAwlSteps({
      operatingSystem: "mac",
      hostname: productionHostname,
    })[0]?.command;
    const linuxRestart = buildAgentWitchReviveAwlSteps({
      operatingSystem: "linux",
      hostname: productionHostname,
    })[0]?.command;

    if (macRestart === undefined || linuxRestart === undefined) {
      throw new Error("Missing revive steps for repair docs.");
    }

    return {
      updateUnix: repair.macos,
      updateWindows: repair.windows,
      restartMacos: macRestart,
      restartLinux: linuxRestart,
      // DF-033: discovered per-account port (H6), not legacy 43347.
      healthCheck: buildAgentWitchLocalHealthCheckCommand(
        resolveAgentWitchAppHome(productionHostname).installDirName,
      ),
    };
  };
