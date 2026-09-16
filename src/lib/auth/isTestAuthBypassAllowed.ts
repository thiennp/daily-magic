import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";

const parseUrlHost = (value: string): string | null => {
  try {
    return new URL(value).host;
  } catch {
    return null;
  }
};

const productionAgentWitchHost = (): string | null =>
  parseUrlHost(AGENT_WITCH_DEFAULT_ORIGIN);

export const isProductionAgentWitchRequestHost = (host: string): boolean => {
  const canonicalHost = productionAgentWitchHost();

  if (canonicalHost === null) {
    return false;
  }

  const normalized = host.trim().toLowerCase();

  return (
    normalized === canonicalHost.toLowerCase() ||
    normalized === "agentwitch.com"
  );
};

export const isTestAuthEnvEnabled = (): boolean => {
  if (process.env.ALLOW_TEST_AUTH === "1") {
    return true;
  }

  if (process.env.E2E === "1") {
    return true;
  }

  return process.env.NODE_ENV !== "production";
};

export const isTestAuthBypassAllowedForRequest = (
  request: Request,
): boolean => {
  const requestHost = parseUrlHost(request.url);

  if (requestHost !== null && isProductionAgentWitchRequestHost(requestHost)) {
    return false;
  }

  return isTestAuthEnvEnabled();
};
