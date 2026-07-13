import {
  AGENT_WITCH_WAKE_BASE_URL,
  canRequestLocalAgentWitchApi,
} from "@/lib/agentWitch/linkLocalAgentAccount";

export const isLocalAgentWitchWakeServerReachable =
  async (): Promise<boolean> => {
    if (!canRequestLocalAgentWitchApi()) {
      return false;
    }

    try {
      const response = await fetch(`${AGENT_WITCH_WAKE_BASE_URL}/health`, {
        method: "GET",
        mode: "cors",
        signal: AbortSignal.timeout(2_000),
      });

      return response.ok;
    } catch {
      return false;
    }
  };
