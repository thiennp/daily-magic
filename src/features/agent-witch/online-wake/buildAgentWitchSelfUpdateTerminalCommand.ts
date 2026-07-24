import {
  AGENT_WITCH_PROD_INSTALL_DIR_NAME,
  resolveAgentWitchAppHome,
} from "@/lib/agentWitch/resolveAgentWitchAppHome";
import { buildAgentWitchInstallCommandRelativePath } from "@/lib/agentWitch/agentWitchInstallApp.constant";

export const resolveAgentWitchSelfUpdateShellRelativePath = (): string => {
  if (typeof window === "undefined") {
    return `${AGENT_WITCH_PROD_INSTALL_DIR_NAME}/${buildAgentWitchInstallCommandRelativePath()}/self-update.sh`;
  }

  return `${resolveAgentWitchAppHome(window.location.hostname).installDirName}/${buildAgentWitchInstallCommandRelativePath()}/self-update.sh`;
};

export const buildAgentWitchSelfUpdateTerminalCommand = (): string =>
  `~/${resolveAgentWitchSelfUpdateShellRelativePath()}`;
