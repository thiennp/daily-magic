import {
  buildAgentWitchDmgDownloadUrl,
  buildAgentWitchWsUrl,
  buildAppOriginFromHeaders,
} from "@/lib/agentWitch/buildAgentWitchInstallUrls";

export interface LocalAgentInstallUrls {
  readonly dmgDownloadUrl: string;
  readonly wsUrl: string;
}

export const buildLocalAgentInstallUrlsFromHeaders = (
  headerList: Headers,
): LocalAgentInstallUrls => {
  const origin = buildAppOriginFromHeaders(headerList);

  return {
    dmgDownloadUrl: buildAgentWitchDmgDownloadUrl(origin),
    wsUrl: buildAgentWitchWsUrl(origin),
  };
};

export const buildLocalAgentInstallUrls = (
  request: Request,
): LocalAgentInstallUrls =>
  buildLocalAgentInstallUrlsFromHeaders(request.headers);
