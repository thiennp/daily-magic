import { buildAgentWitchInstallAuxiliaryScriptUrl } from "@/lib/agentWitch/buildAgentWitchInstallUrls";

export interface AgentWitchAutomationSchedulerInstallScriptUrls {
  readonly automationSchedulerScriptUrl: string;
  readonly automationRunnerScriptUrl: string;
  readonly automationHeadlessWriterScriptUrl: string;
  readonly automationStoreScriptUrl: string;
  readonly automationTypesScriptUrl: string;
  readonly automationComputeNextScriptUrl: string;
  readonly automationReadConfigScriptUrl: string;
  readonly automationApplySyncScriptUrl: string;
  readonly automationLocalLayoutScriptUrl: string;
  readonly automationWriterCliScriptUrl: string;
  readonly automationCloudApiScriptUrl: string;
  readonly automationDeviceAuthScriptUrl: string;
  readonly automationResolveAppOriginScriptUrl: string;
  readonly launchAgentRunningScriptUrl: string;
  readonly launchAgentLabelsScriptUrl: string;
  readonly kickstartScriptUrl: string;
}

export const buildAgentWitchAutomationSchedulerInstallScriptUrls = (
  origin: string,
): AgentWitchAutomationSchedulerInstallScriptUrls => ({
  automationSchedulerScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agent-witch-automation-scheduler.ts",
  ),
  automationRunnerScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchLocalAutomationRunner.ts",
  ),
  automationHeadlessWriterScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchHeadlessWriterRun.ts",
  ),
  automationStoreScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchLocalAutomationStore.ts",
  ),
  automationTypesScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchLocalAutomation.types.ts",
  ),
  automationComputeNextScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchComputeNextScheduleRun.ts",
  ),
  automationReadConfigScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "readAgentWitchRunConfig.ts",
  ),
  automationApplySyncScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "applyAutomationSyncLocally.ts",
  ),
  automationLocalLayoutScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "resolveAgentWitchLocalLayout.ts",
  ),
  automationWriterCliScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "buildWriterCliInvocation.ts",
  ),
  automationCloudApiScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchCloudApi.ts",
  ),
  automationDeviceAuthScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchDeviceAuth.constant.ts",
  ),
  automationResolveAppOriginScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "resolveAgentWitchAppOriginFromWsUrl.ts",
  ),
  launchAgentRunningScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "isAgentWitchLaunchAgentRunning.ts",
  ),
  launchAgentLabelsScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchServiceLaunchAgentLabels.constants.ts",
  ),
  kickstartScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "kickstartAgentWitchLaunchAgent.ts",
  ),
});
