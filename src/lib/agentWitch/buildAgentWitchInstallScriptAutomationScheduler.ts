import { buildAgentWitchInstallScriptAutomationSchedulerDownloads } from "@/lib/agentWitch/buildAgentWitchInstallScriptAutomationSchedulerDownloads";
import { buildAgentWitchInstallScriptAutomationSchedulerLaunchAgent } from "@/lib/agentWitch/buildAgentWitchInstallScriptAutomationSchedulerLaunchAgent";

export const buildAgentWitchInstallScriptAutomationScheduler = (): string =>
  `${buildAgentWitchInstallScriptAutomationSchedulerDownloads()}${buildAgentWitchInstallScriptAutomationSchedulerLaunchAgent()}`;
