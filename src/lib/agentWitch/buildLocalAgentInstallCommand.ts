import {
  buildAgentWitchInstallScriptUrl,
  buildAgentWitchWsUrl,
  buildAppOrigin,
} from "@/lib/agentWitch/buildAgentWitchInstallUrls";

export interface LocalAgentInstallCommand {
  readonly installScriptUrl: string;
  readonly installCommand: string;
  readonly wsUrl: string;
}

export const buildLocalAgentInstallCommand = (
  request: Request,
): LocalAgentInstallCommand => {
  const origin = buildAppOrigin(request);
  const installScriptUrl = buildAgentWitchInstallScriptUrl(origin);

  return {
    installScriptUrl,
    installCommand: `curl -fsSL ${installScriptUrl} | bash`,
    wsUrl: buildAgentWitchWsUrl(origin),
  };
};
