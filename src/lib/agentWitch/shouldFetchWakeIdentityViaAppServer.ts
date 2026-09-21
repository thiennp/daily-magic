import { isLocalAgentWitchHostname } from "@/lib/agentWitch/resolveAgentWitchAppHome";

/** Loopback AWC dev: Node can reach AWB; browser need not call 127.0.0.1 directly. */
export const shouldFetchWakeIdentityViaAppServer = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  return isLocalAgentWitchHostname(window.location.hostname);
};
