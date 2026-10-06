import { buildAgentWitchReviveAwlSteps } from "@/lib/agentWitch/buildAgentWitchReviveAwlTerminalCommand";
import {
  buildAgentWitchUpdateInstallCommand,
  buildAgentWitchUpdateInstallScriptUrl,
} from "@/lib/agentWitch/buildAgentWitchUpdateInstallCommand";
import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";
import { AGENT_WITCH_LOCAL_APP_PORT } from "@/lib/agentWitch/agentWitchLocalAppPort.constant";

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
    const scriptUrl = buildAgentWitchUpdateInstallScriptUrl(
      AGENT_WITCH_DEFAULT_ORIGIN,
    );
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
      updateUnix: buildAgentWitchUpdateInstallCommand(AGENT_WITCH_DEFAULT_ORIGIN),
      updateWindows: `wsl.exe -e bash -lc "set -o pipefail; curl -fsSL ${scriptUrl} | bash"`,
      restartMacos: macRestart,
      restartLinux: linuxRestart,
      healthCheck: `curl -sS -m 5 "http://127.0.0.1:${AGENT_WITCH_LOCAL_APP_PORT}/health"`,
    };
  };
