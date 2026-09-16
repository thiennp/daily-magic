import path from "node:path";

import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";
import { AGENT_WITCH_PROD_INSTALL_DIR_NAME } from "@/lib/agentWitch/resolveAgentWitchAppHome";

import type { AgentWitchInstallVersionRecord } from "./agentWitchInstallVersion";
import { readAgentWitchRunConfig } from "./readAgentWitchRunConfig";
import { resolveAgentWitchAppOriginFromWsUrl } from "./resolveAgentWitchAppOriginFromWsUrl";
import { resolveAgentWitchInstallDir } from "./resolveAgentWitchLocalLayout";

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
