import path from "node:path";

import {
  AGENT_WITCH_LOCAL_INSTALL_DIR_NAME,
  AGENT_WITCH_LOCAL_LAUNCH_AGENT_PREFIX,
  AGENT_WITCH_PROD_LAUNCH_AGENT_PREFIX,
} from "../../public-api/types";

export const isAgentWitchLocalInstallDir = (installDir: string): boolean =>
  path.basename(installDir) === AGENT_WITCH_LOCAL_INSTALL_DIR_NAME;

export const resolveAgentWitchLaunchAgentPrefix = (
  installDir: string,
): string =>
  isAgentWitchLocalInstallDir(installDir)
    ? AGENT_WITCH_LOCAL_LAUNCH_AGENT_PREFIX
    : AGENT_WITCH_PROD_LAUNCH_AGENT_PREFIX;
