import { isAgentWitchRuntimeSupported } from "@/lib/agentWitch/isAgentWitchRuntimeSupported";
import isAgentWitchWebSocketSupportedHost from "@/lib/agentWitch/isAgentWitchWebSocketSupportedHost";

export const isAgentWitchWebSocketAvailableForHost = (
  host: string,
): boolean => {
  if (!isAgentWitchWebSocketSupportedHost(host)) {
    return false;
  }

  return isAgentWitchRuntimeSupported();
};

export const isAgentWitchWebSocketAvailableForOrigin = (
  origin: string,
): boolean => {
  try {
    return isAgentWitchWebSocketAvailableForHost(new URL(origin).host);
  } catch {
    return isAgentWitchRuntimeSupported();
  }
};
