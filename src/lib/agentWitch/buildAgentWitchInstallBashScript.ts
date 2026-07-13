import { buildAgentWitchInstallScriptLaunchAgent } from "@/lib/agentWitch/buildAgentWitchInstallScriptLaunchAgent";
import { buildAgentWitchInstallScriptSetup } from "@/lib/agentWitch/buildAgentWitchInstallScriptSetup";
import { buildAgentWitchInstallScriptWakeServer } from "@/lib/agentWitch/buildAgentWitchInstallScriptWakeServer";

export const buildAgentWitchInstallBashScript = (input: {
  readonly wsUrl: string;
  readonly clientScriptUrl: string;
  readonly resolveLayoutScriptUrl: string;
  readonly readHarnessExportSetsScriptUrl: string;
  readonly buildWriterCliScriptUrl: string;
  readonly wakeServerScriptUrl: string;
  readonly wakeConstantsScriptUrl: string;
  readonly wakeListTargetsScriptUrl: string;
  readonly wakeKickstartScriptUrl: string;
  readonly wakeHandlersScriptUrl: string;
  readonly wakeAllowedOriginsScriptUrl: string;
  readonly wakeEnsureProfileScriptUrl: string;
  readonly wakeLinkAccountScriptUrl: string;
  readonly wakeSpawnClientScriptUrl: string;
  readonly websocketSupportWarning: string;
}): string =>
  `${buildAgentWitchInstallScriptSetup({
    wsUrl: input.wsUrl,
    clientScriptUrl: input.clientScriptUrl,
    resolveLayoutScriptUrl: input.resolveLayoutScriptUrl,
    readHarnessExportSetsScriptUrl: input.readHarnessExportSetsScriptUrl,
    buildWriterCliScriptUrl: input.buildWriterCliScriptUrl,
    websocketSupportWarning: input.websocketSupportWarning,
  })}${buildAgentWitchInstallScriptLaunchAgent(input.wsUrl)}${buildAgentWitchInstallScriptWakeServer(
    {
      wakeServerScriptUrl: input.wakeServerScriptUrl,
      wakeConstantsScriptUrl: input.wakeConstantsScriptUrl,
      wakeListTargetsScriptUrl: input.wakeListTargetsScriptUrl,
      wakeKickstartScriptUrl: input.wakeKickstartScriptUrl,
      wakeHandlersScriptUrl: input.wakeHandlersScriptUrl,
      wakeAllowedOriginsScriptUrl: input.wakeAllowedOriginsScriptUrl,
      wakeEnsureProfileScriptUrl: input.wakeEnsureProfileScriptUrl,
      wakeLinkAccountScriptUrl: input.wakeLinkAccountScriptUrl,
      wakeSpawnClientScriptUrl: input.wakeSpawnClientScriptUrl,
    },
  )}`;
