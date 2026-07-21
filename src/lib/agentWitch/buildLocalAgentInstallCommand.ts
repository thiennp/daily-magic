import {
  buildAgentWitchWsUrl,
  buildAppOriginFromHeaders,
} from "@/lib/agentWitch/buildAgentWitchInstallUrls";

export interface LocalAgentInstallUrls {
  readonly installCommand: string;
  readonly wsUrl: string;
}

/** Generic install URLs are no longer valid; use `/api/agent-witch/install-token`. */
export const buildLocalAgentInstallUrlsFromHeaders = (
  headerList: Headers,
): LocalAgentInstallUrls => {
  const origin = buildAppOriginFromHeaders(headerList);

  return {
    installCommand: "",
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
