import { buildAgentWitchInstallAuxiliaryScriptUrl } from "@/lib/agentWitch/buildAgentWitchInstallUrls";

export interface AgentWitchUpdaterInstallScriptUrls {
  readonly selfUpdateScriptUrl: string;
  readonly selfUpdateCoreScriptUrl: string;
  readonly installVersionScriptUrl: string;
  readonly resolveAppOriginScriptUrl: string;
  readonly selfUpdateLogScriptUrl: string;
  readonly launchAgentLabelsScriptUrl: string;
  readonly listTargetsScriptUrl: string;
  readonly kickstartScriptUrl: string;
  readonly localLayoutScriptUrl: string;
}

export const buildAgentWitchUpdaterInstallScriptUrls = (
  origin: string,
): AgentWitchUpdaterInstallScriptUrls => ({
  selfUpdateScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agent-witch-self-update.ts",
  ),
  selfUpdateCoreScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchSelfUpdate.ts",
  ),
  installVersionScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchInstallVersion.ts",
  ),
  resolveAppOriginScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "resolveAgentWitchAppOriginFromWsUrl.ts",
  ),
  selfUpdateLogScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchSelfUpdateLog.ts",
  ),
  launchAgentLabelsScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "agentWitchServiceLaunchAgentLabels.constants.ts",
  ),
  listTargetsScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "listAgentWitchLaunchTargets.ts",
  ),
  kickstartScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "kickstartAgentWitchLaunchAgent.ts",
  ),
  localLayoutScriptUrl: buildAgentWitchInstallAuxiliaryScriptUrl(
    origin,
    "resolveAgentWitchLocalLayout.ts",
  ),
});
