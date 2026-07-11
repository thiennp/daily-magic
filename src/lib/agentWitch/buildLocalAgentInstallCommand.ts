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

  return {
    installScriptUrl,
    installCommand: `curl -fsSL ${installScriptUrl} | bash`,
    wsUrl: buildAgentWitchWsUrl(origin),
  };
};

export const buildLocalAgentInstallCommand = (
  request: Request,
): LocalAgentInstallCommand =>
  buildLocalAgentInstallCommandFromHeaders(request.headers);
