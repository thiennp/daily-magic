import {
  AGENT_WITCH_PROD_INSTALL_DIR_NAME,
  resolveAgentWitchAppHome,
} from "@/lib/agentWitch/resolveAgentWitchAppHome";
import { AGENT_WITCH_COMMAND_DIR_NAME } from "@/lib/agentWitch/agentWitchInstallApp.constant";

export const resolveAgentWitchWakeShellRelativePath = (): string => {
  if (typeof window === "undefined") {
    return `${AGENT_WITCH_PROD_INSTALL_DIR_NAME}/${AGENT_WITCH_COMMAND_DIR_NAME}/wake.sh`;
  }

  return `${resolveAgentWitchAppHome(window.location.hostname).installDirName}/${AGENT_WITCH_COMMAND_DIR_NAME}/wake.sh`;
};

/** @deprecated Prefer resolveAgentWitchWakeShellRelativePath() */
export const AGENT_WITCH_WAKE_SHELL_RELATIVE_PATH = `${AGENT_WITCH_PROD_INSTALL_DIR_NAME}/${AGENT_WITCH_COMMAND_DIR_NAME}/wake.sh`;

export const buildAgentWitchWakeTerminalCommand = (): string =>
  `~/${resolveAgentWitchWakeShellRelativePath()}`;
