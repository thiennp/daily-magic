import { buildAgentWitchWsUrl } from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { AGENT_WITCH_PRODUCTION_WS_URL } from "@/lib/agentWitch/constants";
import { isLocalAgentWitchOrigin } from "@/lib/agentWitch/resolveAgentWitchAppHome";

const normalizeWebSocketUrl = (value: string): string =>
  value.replace(/\/$/, "");

export const resolveAgentWitchWsUrl = (origin: string): string => {
  const configuredWsUrl = process.env.AGENT_WITCH_WS_URL?.trim();

  if (configuredWsUrl !== undefined && configuredWsUrl.length > 0) {
    return normalizeWebSocketUrl(configuredWsUrl);
  }

  if (!isLocalAgentWitchOrigin(origin)) {
    return AGENT_WITCH_PRODUCTION_WS_URL;
  }

  return buildAgentWitchWsUrl(origin);
};
