import {
  AGENT_WITCH_PROD_INSTALL_DIR_NAME,
  resolveAgentWitchAppHome,
} from "@/lib/agentWitch/resolveAgentWitchAppHome";
import { buildAgentWitchInstallCommandRelativePath } from "@/lib/agentWitch/agentWitchInstallApp.constant";

export const resolveAgentWitchWakeShellRelativePath = (): string => {
  if (typeof window === "undefined") {
    return `${AGENT_WITCH_PROD_INSTALL_DIR_NAME}/${buildAgentWitchInstallCommandRelativePath()}/wake.sh`;
  }

  return `${resolveAgentWitchAppHome(window.location.hostname).installDirName}/${buildAgentWitchInstallCommandRelativePath()}/wake.sh`;
};

/** @deprecated Prefer resolveAgentWitchWakeShellRelativePath() */
export const AGENT_WITCH_WAKE_SHELL_RELATIVE_PATH = `${AGENT_WITCH_PROD_INSTALL_DIR_NAME}/${buildAgentWitchInstallCommandRelativePath()}/wake.sh`;

export const buildAgentWitchWakeTerminalCommand = (): string =>
  `~/${resolveAgentWitchWakeShellRelativePath()}`;
