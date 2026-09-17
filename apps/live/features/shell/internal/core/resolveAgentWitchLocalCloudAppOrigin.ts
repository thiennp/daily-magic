import path from "node:path";

import { AGENT_WITCH_DEFAULT_ORIGIN } from "@agent-witch/shared/network";
import { AGENT_WITCH_PROD_INSTALL_DIR_NAME } from "@agent-witch/install-layout/types";
import { resolveAgentWitchInstallDir } from "@agent-witch/install-layout";
import { readAgentWitchRunConfig } from "@agent-witch/install-runtime-client";
import { resolveAgentWitchAppOriginFromWsUrl } from "@agent-witch/install-self-update";
import type { AgentWitchInstallVersionRecord } from "@agent-witch/install-self-update/types";

export const resolveAgentWitchLocalCloudAppOrigin = (
  installVersion?: AgentWitchInstallVersionRecord | null,
): string => {
  const installDir =
    readAgentWitchRunConfig()?.layout.installDir ??
    resolveAgentWitchInstallDir();
  if (path.basename(installDir) === AGENT_WITCH_PROD_INSTALL_DIR_NAME) {
    return AGENT_WITCH_DEFAULT_ORIGIN;
  }

  const config = readAgentWitchRunConfig();
  const fromWsUrl =
    config !== null ? resolveAgentWitchAppOriginFromWsUrl(config.wsUrl) : null;

  if (fromWsUrl !== null && fromWsUrl.length > 0) {
    return fromWsUrl;
  }

  const fromInstall = installVersion?.appOrigin?.trim();
  if (fromInstall !== undefined && fromInstall.length > 0) {
    return fromInstall.replace(/\/$/, "");
  }

  return AGENT_WITCH_DEFAULT_ORIGIN;
};
