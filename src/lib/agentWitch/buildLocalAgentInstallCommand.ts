import {
  buildAgentWitchInstallScriptUrl,
  buildAgentWitchWsUrl,
  buildAppOriginFromHeaders,
} from "@/lib/agentWitch/buildAgentWitchInstallUrls";

export interface LocalAgentInstallUrls {
  readonly installCommand: string;
  readonly wsUrl: string;
}

export const buildLocalAgentInstallUrlsFromHeaders = (
  headerList: Headers,
): LocalAgentInstallUrls => {
  const origin = buildAppOriginFromHeaders(headerList);
  const installScriptUrl = buildAgentWitchInstallScriptUrl(origin);

  return {
    installCommand: `curl -fsSL ${installScriptUrl} | bash`,
    wsUrl: buildAgentWitchWsUrl(origin),
  };
};

export const buildLocalAgentInstallUrls = (
  request: Request,
): LocalAgentInstallUrls =>
  buildLocalAgentInstallUrlsFromHeaders(request.headers);

/** @deprecated Prefer buildLocalAgentInstallUrlsFromHeaders */
export const buildLocalAgentInstallCommandFromHeaders =
  buildLocalAgentInstallUrlsFromHeaders;
