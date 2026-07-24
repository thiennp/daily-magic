import { buildAgentWitchInstallBundleUrl } from "@/lib/agentWitch/buildAgentWitchInstallBundleUrl";
import { buildAgentWitchInstallBashScript } from "@/lib/agentWitch/buildAgentWitchInstallBashScript";
import { buildAgentWitchWebSocketSupportWarning } from "@/lib/agentWitch/buildAgentWitchWebSocketSupportWarning";
import { resolveAgentWitchWsUrl } from "@/lib/agentWitch/resolveAgentWitchWsUrl";
import type { AgentWitchInstallScriptPreset } from "@/lib/agentWitch/AgentWitchInstallScriptPreset.type";

export const renderInstallAgentWitchScript = (
  origin: string,
  preset: AgentWitchInstallScriptPreset = {},
): string => {
  const wsUrl = resolveAgentWitchWsUrl(origin);
  const bundleUrl = buildAgentWitchInstallBundleUrl(origin);
  const websocketSupportWarning = buildAgentWitchWebSocketSupportWarning(
    origin,
    wsUrl,
  );

  return buildAgentWitchInstallBashScript({
    appOrigin: origin,
    wsUrl,
    bundleUrl,
    ...preset,
    websocketSupportWarning,
  });
};
