import { AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN } from "@/lib/agentWitch/agentWitchLocalAppPort.constant";

export const openAgentWitchLocalConsole = (): void => {
  window.open(
    AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN,
    "_blank",
    "noopener,noreferrer",
  );
};
