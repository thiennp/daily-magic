import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";

import type { AgentWitchInstallVersionRecord } from "./agentWitchInstallVersion";
import { readAgentWitchRunConfig } from "./readAgentWitchRunConfig";
import { resolveAgentWitchAppOriginFromWsUrl } from "./resolveAgentWitchAppOriginFromWsUrl";

export const resolveAgentWitchLocalCloudAppOrigin = (
  installVersion?: AgentWitchInstallVersionRecord | null,
): string => {
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
