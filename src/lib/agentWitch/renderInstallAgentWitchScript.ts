import {
  buildAgentWitchClientScriptUrl,
  buildAgentWitchWsUrl,
} from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { buildAgentWitchInstallBashScript } from "@/lib/agentWitch/buildAgentWitchInstallBashScript";
import { buildAgentWitchWebSocketSupportWarning } from "@/lib/agentWitch/buildAgentWitchWebSocketSupportWarning";

export const renderInstallAgentWitchScript = (origin: string): string => {
  const wsUrl = buildAgentWitchWsUrl(origin);
  const clientScriptUrl = buildAgentWitchClientScriptUrl(origin);
  const websocketSupportWarning = buildAgentWitchWebSocketSupportWarning(
    origin,
    wsUrl,
  );

  return buildAgentWitchInstallBashScript({
    wsUrl,
    clientScriptUrl,
    websocketSupportWarning,
  });
};
