import { buildAgentWitchInstallScriptLaunchAgent } from "@/lib/agentWitch/buildAgentWitchInstallScriptLaunchAgent";
import { buildAgentWitchInstallScriptSetup } from "@/lib/agentWitch/buildAgentWitchInstallScriptSetup";
import { buildAgentWitchInstallScriptWakeServer } from "@/lib/agentWitch/buildAgentWitchInstallScriptWakeServer";

export const buildAgentWitchInstallBashScript = (input: {
  readonly appOrigin: string;
  readonly wsUrl: string;
  readonly clientScriptUrl: string;
  readonly wakeServerScriptUrl: string;
  readonly wakeConstantsScriptUrl: string;
  readonly wakeListTargetsScriptUrl: string;
  readonly wakeKickstartScriptUrl: string;
  readonly wakeHandlersScriptUrl: string;
  readonly wakeAllowedOriginsScriptUrl: string;
  readonly wakeEnsureProfileScriptUrl: string;
  readonly wakeLinkAccountScriptUrl: string;
  readonly wakeSpawnClientScriptUrl: string;
  readonly wakeCliScriptUrl: string;
  readonly websocketSupportWarning: string;
}): string =>
  `${buildAgentWitchInstallScriptSetup({
    appOrigin: input.appOrigin,
    wsUrl: input.wsUrl,
    clientScriptUrl: input.clientScriptUrl,
    websocketSupportWarning: input.websocketSupportWarning,
  })}${buildAgentWitchInstallScriptLaunchAgent({
    wsUrl: input.wsUrl,
    appOrigin: input.appOrigin,
  })}${buildAgentWitchInstallScriptWakeServer({
    wakeServerScriptUrl: input.wakeServerScriptUrl,
    wakeConstantsScriptUrl: input.wakeConstantsScriptUrl,
    wakeListTargetsScriptUrl: input.wakeListTargetsScriptUrl,
    wakeKickstartScriptUrl: input.wakeKickstartScriptUrl,
    wakeHandlersScriptUrl: input.wakeHandlersScriptUrl,
    wakeAllowedOriginsScriptUrl: input.wakeAllowedOriginsScriptUrl,
    wakeEnsureProfileScriptUrl: input.wakeEnsureProfileScriptUrl,
    wakeLinkAccountScriptUrl: input.wakeLinkAccountScriptUrl,
    wakeSpawnClientScriptUrl: input.wakeSpawnClientScriptUrl,
    wakeCliScriptUrl: input.wakeCliScriptUrl,
  })}`;
