import {
  canRequestLocalAgentWitchApi,
  resolveAgentWitchWakeBaseUrlForPage,
} from "@/lib/agentWitch/linkLocalAgentAccount";

export const isLocalAgentWitchWakeServerReachable =
  async (): Promise<boolean> => {
    if (!canRequestLocalAgentWitchApi()) {
      return false;
    }

    try {
      const response = await fetch(
        `${resolveAgentWitchWakeBaseUrlForPage()}/health`,
        {
          method: "GET",
          mode: "cors",
          signal: AbortSignal.timeout(2_000),
        },
      );

      return response.ok;
    } catch {
      return false;
    }
  };
