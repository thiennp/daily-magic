const normalizeOrigin = (origin: string): string => origin.replace(/\/$/, "");

export const buildAppOrigin = (request: Request): string => {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host");

  if (host === null || host.length === 0) {
    return "http://localhost:3000";
  }

  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol =
    forwardedProto ?? (host.includes("localhost") ? "http" : "https");

  return normalizeOrigin(`${protocol}://${host}`);
};

export const buildAgentWitchWsUrl = (origin: string): string => {
  const url = new URL(origin);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.pathname = "/api/agent-witch/ws";
  url.search = "";
  url.hash = "";
  return url.toString();
};

export const buildAgentWitchInstallScriptUrl = (origin: string): string =>
  `${normalizeOrigin(origin)}/install/agent-witch.sh`;

export const buildAgentWitchClientScriptUrl = (origin: string): string =>
  `${normalizeOrigin(origin)}/install/agent-witch/client.ts`;
