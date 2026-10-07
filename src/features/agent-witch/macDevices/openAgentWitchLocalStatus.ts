import { AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN } from "@/lib/agentWitch/agentWitchLocalAppPort.constant";

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
 * AWL-H7: browser local UI retired. Probes `/health` only — does not open a tab.
 * Callers should treat `opened` as "local core reachable"; UI Mac rewires CTAs
 * toward the Mac menu bar app (not localhost HTML).
 */
export const openAgentWitchLocalStatus =
  async (): Promise<OpenAgentWitchLocalStatusResult> => {
    const healthy = await probeAgentWitchLocalHealth();
    return healthy ? "opened" : "unavailable";
  };
