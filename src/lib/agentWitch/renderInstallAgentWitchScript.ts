import { buildAgentWitchAutomationSchedulerInstallScriptUrls } from "@/lib/agentWitch/buildAgentWitchAutomationSchedulerInstallScriptUrls";
import { buildAgentWitchClientScriptUrl } from "@/lib/agentWitch/buildAgentWitchInstallUrls";
import { buildAgentWitchWakeInstallScriptUrls } from "@/lib/agentWitch/buildAgentWitchWakeInstallScriptUrls";
import { buildAgentWitchWatchdogInstallScriptUrls } from "@/lib/agentWitch/buildAgentWitchWatchdogInstallScriptUrls";
import { buildAgentWitchUpdaterInstallScriptUrls } from "@/lib/agentWitch/buildAgentWitchUpdaterInstallScriptUrls";
import { buildAgentWitchInstallBashScript } from "@/lib/agentWitch/buildAgentWitchInstallBashScript";
import { buildAgentWitchWebSocketSupportWarning } from "@/lib/agentWitch/buildAgentWitchWebSocketSupportWarning";
import { resolveAgentWitchWsUrl } from "@/lib/agentWitch/resolveAgentWitchWsUrl";
import type { AgentWitchInstallScriptPreset } from "@/lib/agentWitch/AgentWitchInstallScriptPreset.type";

export const renderInstallAgentWitchScript = (
  origin: string,
  preset: AgentWitchInstallScriptPreset = {},
): string => {
  const wsUrl = resolveAgentWitchWsUrl(origin);
  const clientScriptUrl = buildAgentWitchClientScriptUrl(origin);
  const wakeUrls = buildAgentWitchWakeInstallScriptUrls(origin);
  const watchdogUrls = buildAgentWitchWatchdogInstallScriptUrls(origin);
  const updaterUrls = buildAgentWitchUpdaterInstallScriptUrls(origin);
  const automationUrls =
    buildAgentWitchAutomationSchedulerInstallScriptUrls(origin);
  const websocketSupportWarning = buildAgentWitchWebSocketSupportWarning(
    origin,
    wsUrl,
  );

  return buildAgentWitchInstallBashScript({
    appOrigin: origin,
    wsUrl,
    clientScriptUrl,
    ...preset,
    ...wakeUrls,
    ...watchdogUrls,
    ...updaterUrls,
    automationSchedulerScriptUrl: automationUrls.automationSchedulerScriptUrl,
    automationRunnerScriptUrl: automationUrls.automationRunnerScriptUrl,
    automationHeadlessWriterScriptUrl:
      automationUrls.automationHeadlessWriterScriptUrl,
    automationStoreScriptUrl: automationUrls.automationStoreScriptUrl,
    automationTypesScriptUrl: automationUrls.automationTypesScriptUrl,
    automationComputeNextScriptUrl:
      automationUrls.automationComputeNextScriptUrl,
    automationReadConfigScriptUrl: automationUrls.automationReadConfigScriptUrl,
    automationApplySyncScriptUrl: automationUrls.automationApplySyncScriptUrl,
    automationLocalLayoutScriptUrl:
      automationUrls.automationLocalLayoutScriptUrl,
    automationWriterCliScriptUrl: automationUrls.automationWriterCliScriptUrl,
    automationCloudApiScriptUrl: automationUrls.automationCloudApiScriptUrl,
    automationDeviceAuthScriptUrl: automationUrls.automationDeviceAuthScriptUrl,
    automationResolveAppOriginScriptUrl:
      automationUrls.automationResolveAppOriginScriptUrl,
    automationLaunchAgentRunningScriptUrl:
      automationUrls.launchAgentRunningScriptUrl,
    automationKickstartScriptUrl: automationUrls.kickstartScriptUrl,
    websocketSupportWarning,
  });
};
