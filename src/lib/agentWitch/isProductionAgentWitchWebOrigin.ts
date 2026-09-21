import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";

const parseOriginHost = (origin: string): string | null => {
  try {
    return new URL(origin).host.trim().toLowerCase();
  } catch {
    return null;
  }
};

const productionAgentWitchHost = (): string | null =>
  parseOriginHost(AGENT_WITCH_DEFAULT_ORIGIN);

/** True when the browser tab is on canonical production AWC (not localhost / preview). */
export const isProductionAgentWitchWebOrigin = (origin: string): boolean => {
  const host = parseOriginHost(origin);
  const canonicalHost = productionAgentWitchHost();

  if (host === null || canonicalHost === null) {
    return false;
  }

  return host === canonicalHost || host === "agentwitch.com";
};
