import {
  AGENT_WITCH_PROD_WAKE_PORT,
  resolveAgentWitchAppHome,
} from "@/lib/agentWitch/resolveAgentWitchAppHome";

export const resolveAgentWitchWakePortForPage = (): number => {
  if (typeof window === "undefined") {
    return AGENT_WITCH_PROD_WAKE_PORT;
  }

  return resolveAgentWitchAppHome(window.location.hostname).wakePort;
};

export const resolveAgentWitchWakeBaseUrlForPage = (): string =>
  `http://127.0.0.1:${resolveAgentWitchWakePortForPage()}`;
