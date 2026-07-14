import { buildAgentWitchInstallAuxiliaryScriptUrl } from "@/lib/agentWitch/buildAgentWitchInstallUrls";

export interface AgentWitchWatchdogInstallScriptUrls {
  readonly watchdogScriptUrl: string;
  readonly reviveScriptUrl: string;
  readonly connectionHealthScriptUrl: string;
  readonly connectionHealthConstantsScriptUrl: string;
  readonly launchAgentRunningScriptUrl: string;
  readonly localLayoutScriptUrl: string;
  readonly watchdogLogScriptUrl: string;
  readonly watchdogStatusScriptUrl: string;
}

export const buildAgentWitchWatchdogInstallScriptUrls = (
  origin: string,
): AgentWitchWatchdogInstallScriptUrls => ({
  watchdogScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agent-witch-watchdog.ts",
  ),
  reviveScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "reviveAgentWitchWebSocket.ts",
  ),
  connectionHealthScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchConnectionHealth.ts",
  ),
  connectionHealthConstantsScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchConnectionHealth.constants.ts",
  ),
  launchAgentRunningScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "isAgentWitchLaunchAgentRunning.ts",
  ),
  localLayoutScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "resolveAgentWitchLocalLayout.ts",
  ),
  watchdogLogScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchWatchdogLog.ts",
  ),
  watchdogStatusScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "buildAgentWitchWatchdogStatus.ts",
  ),
});
