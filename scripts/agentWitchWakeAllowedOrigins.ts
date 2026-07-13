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
    return true;
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
