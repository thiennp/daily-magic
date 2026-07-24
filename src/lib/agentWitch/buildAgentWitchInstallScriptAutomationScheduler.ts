import type { AgentWitchInstallScriptAutomationSchedulerInput } from "@/lib/agentWitch/AgentWitchInstallScriptAutomationSchedulerInput.type";
import { buildAgentWitchInstallScriptAutomationSchedulerDownloads } from "@/lib/agentWitch/buildAgentWitchInstallScriptAutomationSchedulerDownloads";
import { buildAgentWitchInstallScriptAutomationSchedulerLaunchAgent } from "@/lib/agentWitch/buildAgentWitchInstallScriptAutomationSchedulerLaunchAgent";

export const buildAgentWitchInstallScriptAutomationScheduler = (
  input: AgentWitchInstallScriptAutomationSchedulerInput,
): string =>
  `${buildAgentWitchInstallScriptAutomationSchedulerDownloads()}${buildAgentWitchInstallScriptAutomationSchedulerLaunchAgent({ installDirName: input.installDirName })}`;
