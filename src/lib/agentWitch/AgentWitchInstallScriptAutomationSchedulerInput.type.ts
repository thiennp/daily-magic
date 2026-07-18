export interface AgentWitchInstallScriptAutomationSchedulerInput {
  readonly installDirName: string;
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
