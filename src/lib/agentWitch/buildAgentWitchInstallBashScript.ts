import { buildAgentWitchInstallScriptLaunchAgent } from "@/lib/agentWitch/buildAgentWitchInstallScriptLaunchAgent";
import { buildAgentWitchInstallScriptSetup } from "@/lib/agentWitch/buildAgentWitchInstallScriptSetup";
import { buildAgentWitchInstallScriptWakeServer } from "@/lib/agentWitch/buildAgentWitchInstallScriptWakeServer";

export const buildAgentWitchInstallBashScript = (input: {
  readonly wsUrl: string;
  readonly clientScriptUrl: string;
  readonly resolveLayoutScriptUrl: string;
  readonly readHarnessExportSetsScriptUrl: string;
  readonly wakeServerScriptUrl: string;
  readonly wakeConstantsScriptUrl: string;
  readonly wakeListTargetsScriptUrl: string;
  readonly wakeKickstartScriptUrl: string;
  readonly wakeHandlersScriptUrl: string;
  readonly wakeEnsureProfileScriptUrl: string;
  readonly wakeLinkAccountScriptUrl: string;
  readonly websocketSupportWarning: string;
}): string =>
  `${buildAgentWitchInstallScriptSetup({
    wsUrl: input.wsUrl,
    clientScriptUrl: input.clientScriptUrl,
    resolveLayoutScriptUrl: input.resolveLayoutScriptUrl,
    readHarnessExportSetsScriptUrl: input.readHarnessExportSetsScriptUrl,
    websocketSupportWarning: input.websocketSupportWarning,
  })}${buildAgentWitchInstallScriptLaunchAgent(input.wsUrl)}${buildAgentWitchInstallScriptWakeServer(
    {
      wakeServerScriptUrl: input.wakeServerScriptUrl,
      wakeConstantsScriptUrl: input.wakeConstantsScriptUrl,
      wakeListTargetsScriptUrl: input.wakeListTargetsScriptUrl,
      wakeKickstartScriptUrl: input.wakeKickstartScriptUrl,
      wakeHandlersScriptUrl: input.wakeHandlersScriptUrl,
      wakeEnsureProfileScriptUrl: input.wakeEnsureProfileScriptUrl,
      wakeLinkAccountScriptUrl: input.wakeLinkAccountScriptUrl,
    },
  )}`;
