import {
  AGENT_WITCH_PROD_INSTALL_DIR_NAME,
  resolveAgentWitchAppHome,
} from "@/lib/agentWitch/resolveAgentWitchAppHome";

export const resolveAgentWitchSelfUpdateShellRelativePath = (): string => {
  if (typeof window === "undefined") {
    return `${AGENT_WITCH_PROD_INSTALL_DIR_NAME}/self-update.sh`;
  }

  return `${resolveAgentWitchAppHome(window.location.hostname).installDirName}/self-update.sh`;
};

export const buildAgentWitchSelfUpdateTerminalCommand = (): string =>
  `~/${resolveAgentWitchSelfUpdateShellRelativePath()}`;
