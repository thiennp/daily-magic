import {
  AGENT_WITCH_PROD_INSTALL_DIR_NAME,
  resolveAgentWitchAppHome,
} from "@/lib/agentWitch/resolveAgentWitchAppHome";
import { AGENT_WITCH_COMMAND_DIR_NAME } from "@/lib/agentWitch/agentWitchInstallApp.constant";

export const resolveAgentWitchSelfUpdateShellRelativePath = (): string => {
  if (typeof window === "undefined") {
    return `${AGENT_WITCH_PROD_INSTALL_DIR_NAME}/${AGENT_WITCH_COMMAND_DIR_NAME}/self-update.sh`;
  }

  return `${resolveAgentWitchAppHome(window.location.hostname).installDirName}/${AGENT_WITCH_COMMAND_DIR_NAME}/self-update.sh`;
};

export const buildAgentWitchSelfUpdateTerminalCommand = (): string =>
  `~/${resolveAgentWitchSelfUpdateShellRelativePath()}`;
