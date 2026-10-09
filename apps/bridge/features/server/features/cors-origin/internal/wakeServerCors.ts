const AGENT_WITCH_HOSTS = ["agentwitch.com", "www.agentwitch.com"] as const;

const LOCAL_DEV_HOST_PATTERN = /^(localhost|127\.0\.0\.1)(:\d+)?$/i;

const normalizeHost = (host: string): string => {
  const normalizedHost = host.trim().toLowerCase();
  const withoutPort = normalizedHost.split(":")[0] ?? normalizedHost;

  if (withoutPort.startsWith("www.")) {
    return withoutPort;
  }

  return withoutPort;
};

/**
 * Any web app on any local port could otherwise call the wake server (install, update, folders).
 * An installed (production) bridge only trusts agentwitch.com; localhost origins are for
 * development, or when AGENT_WITCH_WAKE_ALLOW_LOCALHOST_ORIGINS=1 is set on purpose.
 */
const localOriginsAllowed = (): boolean =>
  process.env.NODE_ENV !== "production" ||
  process.env.AGENT_WITCH_WAKE_ALLOW_LOCALHOST_ORIGINS === "1";

export const isAgentWitchWakeServerAllowedHost = (host: string): boolean => {
  const normalizedHost = normalizeHost(host);

  if (
    AGENT_WITCH_HOSTS.includes(
      normalizedHost as (typeof AGENT_WITCH_HOSTS)[number],
    )
  ) {
    return true;
  }

  if (LOCAL_DEV_HOST_PATTERN.test(host.trim().toLowerCase())) {
    return localOriginsAllowed();
  }

  return false;
};

export const isAgentWitchWakeServerAllowedOrigin = (
  origin: string,
): boolean => {
  try {
    const url = new URL(origin);
    const host = url.host.trim().toLowerCase();

    if (!isAgentWitchWakeServerAllowedHost(host)) {
      return false;
    }

    if (LOCAL_DEV_HOST_PATTERN.test(host)) {
      return url.protocol === "http:";
    }

    return url.protocol === "https:";
  } catch {
    return false;
  }
};

export const buildWakeServerCorsHeaders = (
  requestOrigin: string | undefined,
): { readonly headers: Record<string, string>; readonly allowed: boolean } => {
  const baseHeaders = {
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Private-Network": "true",
    "Content-Type": "application/json; charset=utf-8",
  } as const;

  if (requestOrigin === undefined || requestOrigin.length === 0) {
    return { headers: { ...baseHeaders }, allowed: true };
  }

  if (!isAgentWitchWakeServerAllowedOrigin(requestOrigin)) {
    return { headers: {}, allowed: false };
  }

  return {
    headers: {
      ...baseHeaders,
      "Access-Control-Allow-Origin": requestOrigin,
      Vary: "Origin",
    },
    allowed: true,
  };
};
