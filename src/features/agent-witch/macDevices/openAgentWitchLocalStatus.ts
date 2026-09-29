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

/**
 * Opens AWL Status in a new tab (sync, so popup blockers allow it), then probes
 * `/health`. Returns `unavailable` when Live is down so callers can show revive UI.
 */
export const openAgentWitchLocalStatus =
  async (): Promise<OpenAgentWitchLocalStatusResult> => {
    const statusUrl = `${AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN}${LOCAL_STATUS_PATH}`;
    window.open(statusUrl, "_blank", "noopener,noreferrer");
    const healthy = await probeAgentWitchLocalHealth();
    return healthy ? "opened" : "unavailable";
  };
