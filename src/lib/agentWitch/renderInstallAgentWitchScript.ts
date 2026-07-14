import { buildAgentWitchClientScriptUrl } from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { buildAgentWitchWakeInstallScriptUrls } from "@/lib/agentWitch/buildAgentWitchWakeInstallScriptUrls";
import { buildAgentWitchWatchdogInstallScriptUrls } from "@/lib/agentWitch/buildAgentWitchWatchdogInstallScriptUrls";
import { buildAgentWitchInstallBashScript } from "@/lib/agentWitch/buildAgentWitchInstallBashScript";
import { buildAgentWitchWebSocketSupportWarning } from "@/lib/agentWitch/buildAgentWitchWebSocketSupportWarning";
import { resolveAgentWitchWsUrl } from "@/lib/agentWitch/resolveAgentWitchWsUrl";

export const renderInstallAgentWitchScript = (origin: string): string => {
  const wsUrl = resolveAgentWitchWsUrl(origin);
  const clientScriptUrl = buildAgentWitchClientScriptUrl(origin);
  const wakeUrls = buildAgentWitchWakeInstallScriptUrls(origin);
  const watchdogUrls = buildAgentWitchWatchdogInstallScriptUrls(origin);
  const websocketSupportWarning = buildAgentWitchWebSocketSupportWarning(
    origin,
    wsUrl,
  );

  return buildAgentWitchInstallBashScript({
    appOrigin: origin,
    wsUrl,
    clientScriptUrl,
    ...wakeUrls,
    ...watchdogUrls,
    websocketSupportWarning,
  });
};
