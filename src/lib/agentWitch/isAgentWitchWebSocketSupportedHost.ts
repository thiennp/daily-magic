import {
  AGENT_WITCH_DEFAULT_ORIGIN,
  AGENT_WITCH_SUPPORTED_HOSTS,
} from "@/lib/agentWitch/constants";

const SERVERLESS_HOST_PATTERNS = [
  /\.vercel\.app$/i,
  /\.netlify\.app$/i,
  /\.pages\.dev$/i,
] as const;

export const normalizeAgentWitchHost = (host: string): string => {
  const normalizedHost = host.trim().toLowerCase();
  const withoutPort = normalizedHost.split(":")[0] ?? normalizedHost;

  if (withoutPort.startsWith("www.")) {
    return withoutPort;
  }

  return withoutPort;
};

export const isAgentWitchProductionHost = (host: string): boolean => {
  const normalizedHost = normalizeAgentWitchHost(host);

  return AGENT_WITCH_SUPPORTED_HOSTS.includes(
    normalizedHost as (typeof AGENT_WITCH_SUPPORTED_HOSTS)[number],
  );
};

export default function isAgentWitchWebSocketSupportedHost(
  host: string,
): boolean {
  const normalizedHost = normalizeAgentWitchHost(host);

  if (normalizedHost.length === 0) {
    return true;
  }

  if (isAgentWitchProductionHost(normalizedHost)) {
    return true;
  }

  return !SERVERLESS_HOST_PATTERNS.some((pattern) =>
    pattern.test(normalizedHost),
  );
}

export function isAgentWitchWebSocketSupportedOrigin(origin: string): boolean {
  try {
    const url = new URL(origin);
    return isAgentWitchWebSocketSupportedHost(url.host);
  } catch {
    return true;
  }
}

export function resolveAgentWitchProductionOrigin(): string {
  return AGENT_WITCH_DEFAULT_ORIGIN;
}
