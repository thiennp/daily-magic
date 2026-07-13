import { buildAgentWitchWsUrl } from "@/lib/agentWitch/buildAgentWitchInstallUrls";

const normalizeWebSocketUrl = (value: string): string => value.replace(/\/$/, "");

export const resolveAgentWitchWsUrl = (origin: string): string => {
  const configuredWsUrl = process.env.AGENT_WITCH_WS_URL?.trim();

  if (configuredWsUrl !== undefined && configuredWsUrl.length > 0) {
    return normalizeWebSocketUrl(configuredWsUrl);
  }

  return buildAgentWitchWsUrl(origin);
};
