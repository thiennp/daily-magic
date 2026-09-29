import { AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN } from "@/lib/agentWitch/agentWitchLocalAppPort.constant";

const LOCAL_STATUS_PATH = "/status";
const HEALTH_PROBE_MS = 2500;

export type OpenAgentWitchLocalStatusResult = "opened" | "unavailable";

export const probeAgentWitchLocalHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(
      `${AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN}/health`,
      {
        signal: AbortSignal.timeout(HEALTH_PROBE_MS),
      },
    );
    return response.ok;
  } catch {
    return false;
  }
};

/** Opens AWL Status when healthy; returns unavailable when :43347 is down. */
export const openAgentWitchLocalStatus =
  async (): Promise<OpenAgentWitchLocalStatusResult> => {
    const healthy = await probeAgentWitchLocalHealth();
    if (!healthy) {
      return "unavailable";
    }
    window.open(
      `${AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN}${LOCAL_STATUS_PATH}`,
      "_blank",
      "noopener,noreferrer",
    );
    return "opened";
  };
