import { buildAgentWitchInstallAuxiliaryScriptUrl } from "@/lib/agentWitch/buildAgentWitchInstallUrls";

export interface AgentWitchWakeInstallScriptUrls {
  readonly wakeServerScriptUrl: string;
  readonly wakeConstantsScriptUrl: string;
  readonly wakeListTargetsScriptUrl: string;
  readonly wakeKickstartScriptUrl: string;
  readonly wakeHandlersScriptUrl: string;
  readonly wakeAllowedOriginsScriptUrl: string;
  readonly wakeEnsureProfileScriptUrl: string;
  readonly wakeSpawnClientScriptUrl: string;
  readonly wakeCliScriptUrl: string;
}

export const buildAgentWitchWakeInstallScriptUrls = (
  origin: string,
): AgentWitchWakeInstallScriptUrls => ({
  wakeServerScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agent-witch-wake-server.ts",
  ),
  wakeConstantsScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchWakeConstants.ts",
  ),
  wakeListTargetsScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "listAgentWitchLaunchTargets.ts",
  ),
  wakeKickstartScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "kickstartAgentWitchLaunchAgent.ts",
  ),
  wakeHandlersScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchWakeHandlers.ts",
  ),
  wakeAllowedOriginsScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchWakeAllowedOrigins.ts",
  ),
  wakeEnsureProfileScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "ensureAgentWitchProfile.ts",
  ),
  wakeSpawnClientScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "spawnAgentWitchClient.ts",
  ),
  wakeCliScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agent-witch-wake-cli.ts",
  ),
});
