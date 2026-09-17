import {
  AGENT_WITCH_LOCAL_INSTALL_DIR_NAME,
  AGENT_WITCH_LOCAL_LAUNCH_AGENT_PREFIX,
  AGENT_WITCH_LOCAL_WAKE_PORT,
  AGENT_WITCH_PROD_INSTALL_DIR_NAME,
  AGENT_WITCH_PROD_LAUNCH_AGENT_PREFIX,
  AGENT_WITCH_PROD_WAKE_PORT,
} from "../../public-api/types";

import type { AgentWitchAppHome } from "../../public-api/types";

export const isLocalAgentWitchHostname = (hostname: string): boolean => {
  const host = hostname.trim().toLowerCase().split(":")[0] ?? "";
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1" ||
    host === "[::1]"
  );
};

export const isLocalAgentWitchOrigin = (origin: string): boolean => {
  try {
    return isLocalAgentWitchHostname(new URL(origin).hostname);
  } catch {
    return isLocalAgentWitchHostname(origin);
  }
};

export const resolveAgentWitchAppHome = (
  originOrHostname: string,
): AgentWitchAppHome => {
  const isLocalApp = originOrHostname.includes("://")
    ? isLocalAgentWitchOrigin(originOrHostname)
    : isLocalAgentWitchHostname(originOrHostname);

  if (isLocalApp) {
    return {
      installDirName: AGENT_WITCH_LOCAL_INSTALL_DIR_NAME,
      wakePort: AGENT_WITCH_LOCAL_WAKE_PORT,
      launchAgentPrefix: AGENT_WITCH_LOCAL_LAUNCH_AGENT_PREFIX,
      isLocalApp: true,
    };
  }

  return {
    installDirName: AGENT_WITCH_PROD_INSTALL_DIR_NAME,
    wakePort: AGENT_WITCH_PROD_WAKE_PORT,
    launchAgentPrefix: AGENT_WITCH_PROD_LAUNCH_AGENT_PREFIX,
    isLocalApp: false,
  };
};
