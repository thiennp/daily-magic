import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";

const normalizeOrigin = (origin: string): string => origin.replace(/\/$/, "");

const resolveOriginFromEnvUrl = (value: string | undefined): string | null => {
  if (value === undefined || value.length === 0) {
    return null;
  }

  try {
    return normalizeOrigin(new URL(value).origin);
  } catch {
    return normalizeOrigin(value);
  }
};

const resolveProtocol = (
  host: string,
  forwardedProto: string | null,
): string => {
  if (forwardedProto !== null && forwardedProto.length > 0) {
    return forwardedProto.split(",")[0]?.trim() ?? "https";
  }

  if (host.includes("localhost") || host.startsWith("127.0.0.1")) {
    return "http";
  }

  return "https";
};

const resolveHost = (headerList: Headers): string | null => {
  const forwardedHost = headerList.get("x-forwarded-host");
  if (forwardedHost !== null && forwardedHost.length > 0) {
    return forwardedHost.split(",")[0]?.trim() ?? null;
  }

  const host = headerList.get("host");
  if (host !== null && host.length > 0) {
    return host;
  }

  return null;
};

const resolveFallbackOrigin = (): string | null => {
  const configuredOrigin = resolveOriginFromEnvUrl(
    process.env.NEXT_PUBLIC_APP_URL,
  );
  if (configuredOrigin !== null) {
    return configuredOrigin;
  }

  const authOrigin = resolveOriginFromEnvUrl(process.env.AUTH_URL);
  if (authOrigin !== null) {
    return authOrigin;
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl !== undefined && vercelUrl.length > 0) {
    return normalizeOrigin(`https://${vercelUrl}`);
  }

  return AGENT_WITCH_DEFAULT_ORIGIN;
};

export const buildAppOriginFromHeaders = (headerList: Headers): string => {
  const host = resolveHost(headerList);

  if (host !== null) {
    const protocol = resolveProtocol(host, headerList.get("x-forwarded-proto"));
    return normalizeOrigin(`${protocol}://${host}`);
  }

  const fallbackOrigin = resolveFallbackOrigin();
  if (fallbackOrigin !== null) {
    return fallbackOrigin;
  }

  return "http://localhost:3000";
};

export const buildAppOrigin = (request: Request): string => {
  const hostFromHeaders = resolveHost(request.headers);

  if (hostFromHeaders !== null) {
    const protocol = resolveProtocol(
      hostFromHeaders,
      request.headers.get("x-forwarded-proto"),
    );
    return normalizeOrigin(`${protocol}://${hostFromHeaders}`);
  }

  try {
    const requestUrl = new URL(request.url);
    if (requestUrl.host.length > 0) {
      return normalizeOrigin(`${requestUrl.protocol}//${requestUrl.host}`);
    }
  } catch {
    // Fall through to deployment fallback below.
  }

  const fallbackOrigin = resolveFallbackOrigin();
  if (fallbackOrigin !== null) {
    return fallbackOrigin;
  }

  return "http://localhost:3000";
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
