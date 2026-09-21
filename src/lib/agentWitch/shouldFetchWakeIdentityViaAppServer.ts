import { isProductionAgentWitchWebOrigin } from "@/lib/agentWitch/isProductionAgentWitchWebOrigin";
import { isLocalAgentWitchHostname } from "@/lib/agentWitch/resolveAgentWitchAppHome";

/**
 * When false, the browser must call AWB on loopback (production AWC on a Mac).
 * Otherwise AWC uses same-origin `/api/agent-witch/local-identity` so Node probes AWB.
 */
export const shouldFetchWakeIdentityViaAppServer = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  if (isProductionAgentWitchWebOrigin(window.location.origin)) {
    return false;
  }

  return (
    isLocalAgentWitchHostname(window.location.hostname) ||
    window.location.protocol === "http:"
  );
};
