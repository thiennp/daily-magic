import { buildAgentWitchInstallScriptLaunchAgent } from "@/lib/agentWitch/buildAgentWitchInstallScriptLaunchAgent";
import { buildAgentWitchInstallScriptSetup } from "@/lib/agentWitch/buildAgentWitchInstallScriptSetup";

export const buildAgentWitchInstallBashScript = (input: {
  readonly wsUrl: string;
  readonly clientScriptUrl: string;
  readonly websocketSupportWarning: string;
}): string =>
  `${buildAgentWitchInstallScriptSetup({
    wsUrl: input.wsUrl,
    clientScriptUrl: input.clientScriptUrl,
    websocketSupportWarning: input.websocketSupportWarning,
  })}${buildAgentWitchInstallScriptLaunchAgent(input.wsUrl)}`;
