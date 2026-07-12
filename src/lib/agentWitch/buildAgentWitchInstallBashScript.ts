import { buildAgentWitchInstallScriptLaunchAgent } from "@/lib/agentWitch/buildAgentWitchInstallScriptLaunchAgent";
import { buildAgentWitchInstallScriptSetup } from "@/lib/agentWitch/buildAgentWitchInstallScriptSetup";

export const buildAgentWitchInstallBashScript = (input: {
  readonly wsUrl: string;
  readonly clientScriptUrl: string;
  readonly resolveLayoutScriptUrl: string;
  readonly readHarnessExportSetsScriptUrl: string;
  readonly websocketSupportWarning: string;
}): string =>
  `${buildAgentWitchInstallScriptSetup({
    wsUrl: input.wsUrl,
    clientScriptUrl: input.clientScriptUrl,
    resolveLayoutScriptUrl: input.resolveLayoutScriptUrl,
    readHarnessExportSetsScriptUrl: input.readHarnessExportSetsScriptUrl,
    websocketSupportWarning: input.websocketSupportWarning,
  })}${buildAgentWitchInstallScriptLaunchAgent(input.wsUrl)}`;
