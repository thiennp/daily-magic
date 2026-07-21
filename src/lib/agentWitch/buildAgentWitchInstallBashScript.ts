import { buildAgentWitchInstallScriptAutomationScheduler } from "@/lib/agentWitch/buildAgentWitchInstallScriptAutomationScheduler";
import { buildAgentWitchInstallScriptFinish } from "@/lib/agentWitch/buildAgentWitchInstallScriptFinish";
import { buildAgentWitchInstallScriptLaunchAgent } from "@/lib/agentWitch/buildAgentWitchInstallScriptLaunchAgent";
import { buildAgentWitchInstallScriptSetup } from "@/lib/agentWitch/buildAgentWitchInstallScriptSetup";
import { buildAgentWitchInstallScriptUpdater } from "@/lib/agentWitch/buildAgentWitchInstallScriptUpdater";
import { buildAgentWitchInstallScriptVersionStamp } from "@/lib/agentWitch/buildAgentWitchInstallScriptVersionStamp";
import { buildAgentWitchInstallScriptWatchdog } from "@/lib/agentWitch/buildAgentWitchInstallScriptWatchdog";
import { buildAgentWitchInstallScriptWakeServer } from "@/lib/agentWitch/buildAgentWitchInstallScriptWakeServer";
import type { AgentWitchInstallBashScriptInput } from "@/lib/agentWitch/AgentWitchInstallBashScriptInput.type";
import type { AgentWitchInstallScriptPreset } from "@/lib/agentWitch/AgentWitchInstallScriptPreset.type";
import { resolveAgentWitchAppHome } from "@/lib/agentWitch/resolveAgentWitchAppHome";

export const buildAgentWitchInstallBashScript = (
  input: AgentWitchInstallBashScriptInput & AgentWitchInstallScriptPreset,
): string => {
  const appHome = resolveAgentWitchAppHome(input.appOrigin);

  // Updater + automation download modules the wake server imports at boot.
  // Install them before registering the wake LaunchAgent (AGENT-005).
  return `${buildAgentWitchInstallScriptSetup({
    appOrigin: input.appOrigin,
    wsUrl: input.wsUrl,
    clientScriptUrl: input.clientScriptUrl,
    websocketSupportWarning: input.websocketSupportWarning,
    appHome,
    presetPairingToken: input.presetPairingToken,
    presetProfileEmail: input.presetProfileEmail,
  })}${buildAgentWitchInstallScriptLaunchAgent()}${buildAgentWitchInstallScriptUpdater(
    {
      installDirName: appHome.installDirName,
      selfUpdateScriptUrl: input.selfUpdateScriptUrl,
      selfUpdateCoreScriptUrl: input.selfUpdateCoreScriptUrl,
      installVersionScriptUrl: input.installVersionScriptUrl,
      resolveAppOriginScriptUrl: input.resolveAppOriginScriptUrl,
      selfUpdateLogScriptUrl: input.selfUpdateLogScriptUrl,
      launchAgentLabelsScriptUrl: input.launchAgentLabelsScriptUrl,
      listTargetsScriptUrl: input.wakeListTargetsScriptUrl,
      kickstartScriptUrl: input.wakeKickstartScriptUrl,
      localLayoutScriptUrl: input.localLayoutScriptUrl,
    },
  )}${buildAgentWitchInstallScriptAutomationScheduler({
    installDirName: appHome.installDirName,
    automationSchedulerScriptUrl: input.automationSchedulerScriptUrl,
    automationRunnerScriptUrl: input.automationRunnerScriptUrl,
    automationHeadlessWriterScriptUrl: input.automationHeadlessWriterScriptUrl,
    automationStoreScriptUrl: input.automationStoreScriptUrl,
    automationTypesScriptUrl: input.automationTypesScriptUrl,
    automationComputeNextScriptUrl: input.automationComputeNextScriptUrl,
    automationReadConfigScriptUrl: input.automationReadConfigScriptUrl,
    automationApplySyncScriptUrl: input.automationApplySyncScriptUrl,
    automationLocalLayoutScriptUrl: input.automationLocalLayoutScriptUrl,
    automationWriterCliScriptUrl: input.automationWriterCliScriptUrl,
    automationCloudApiScriptUrl: input.automationCloudApiScriptUrl,
    automationDeviceAuthScriptUrl: input.automationDeviceAuthScriptUrl,
    automationResolveAppOriginScriptUrl:
      input.automationResolveAppOriginScriptUrl,
    launchAgentRunningScriptUrl: input.automationLaunchAgentRunningScriptUrl,
    launchAgentLabelsScriptUrl: input.launchAgentLabelsScriptUrl,
    kickstartScriptUrl: input.automationKickstartScriptUrl,
  })}${buildAgentWitchInstallScriptWakeServer({
    installDirName: appHome.installDirName,
    appOrigin: input.appOrigin,
    wakeServerScriptUrl: input.wakeServerScriptUrl,
    wakeConstantsScriptUrl: input.wakeConstantsScriptUrl,
    wakeListTargetsScriptUrl: input.wakeListTargetsScriptUrl,
    wakeKickstartScriptUrl: input.wakeKickstartScriptUrl,
    wakeHandlersScriptUrl: input.wakeHandlersScriptUrl,
    wakeAllowedOriginsScriptUrl: input.wakeAllowedOriginsScriptUrl,
    wakeEnsureProfileScriptUrl: input.wakeEnsureProfileScriptUrl,
    wakeSpawnClientScriptUrl: input.wakeSpawnClientScriptUrl,
    wakeCliScriptUrl: input.wakeCliScriptUrl,
    reviveScriptUrl: input.reviveScriptUrl,
    connectionHealthScriptUrl: input.connectionHealthScriptUrl,
    connectionHealthConstantsScriptUrl:
      input.connectionHealthConstantsScriptUrl,
    launchAgentRunningScriptUrl: input.launchAgentRunningScriptUrl,
    watchdogLogScriptUrl: input.watchdogLogScriptUrl,
    watchdogStatusScriptUrl: input.watchdogStatusScriptUrl,
    localLayoutScriptUrl: input.localLayoutScriptUrl,
  })}${buildAgentWitchInstallScriptWatchdog({
    installDirName: appHome.installDirName,
    watchdogScriptUrl: input.watchdogScriptUrl,
    reviveScriptUrl: input.reviveScriptUrl,
    connectionHealthScriptUrl: input.connectionHealthScriptUrl,
    connectionHealthConstantsScriptUrl:
      input.connectionHealthConstantsScriptUrl,
    launchAgentRunningScriptUrl: input.launchAgentRunningScriptUrl,
    listTargetsScriptUrl: input.wakeListTargetsScriptUrl,
    kickstartScriptUrl: input.wakeKickstartScriptUrl,
    spawnClientScriptUrl: input.wakeSpawnClientScriptUrl,
    localLayoutScriptUrl: input.localLayoutScriptUrl,
    watchdogLogScriptUrl: input.watchdogLogScriptUrl,
    watchdogStatusScriptUrl: input.watchdogStatusScriptUrl,
  })}${buildAgentWitchInstallScriptVersionStamp(input.appOrigin)}${buildAgentWitchInstallScriptFinish({ appOrigin: input.appOrigin })}`;
};
