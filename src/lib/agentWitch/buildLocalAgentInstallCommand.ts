import {
  buildAgentWitchInstallScriptUrl,
  buildAgentWitchWsUrl,
  buildAppOriginFromHeaders,
} from "@/lib/agentWitch/buildAgentWitchInstallUrls";

export interface LocalAgentInstallCommand {
  readonly installScriptUrl: string;
  readonly installCommand: string;
  readonly wsUrl: string;
}

export const buildLocalAgentInstallCommandFromHeaders = (
  headerList: Headers,
): LocalAgentInstallCommand => {
  const origin = buildAppOriginFromHeaders(headerList);
  const installScriptUrl = buildAgentWitchInstallScriptUrl(origin);
  const installCommand = `curl -fsSL ${installScriptUrl} | bash`;

  return {
    installScriptUrl,
    installCommand,
    wsUrl: buildAgentWitchWsUrl(origin),
  };
};

export const buildLocalAgentInstallCommand = (
  request: Request,
): LocalAgentInstallCommand =>
  buildLocalAgentInstallCommandFromHeaders(request.headers);
