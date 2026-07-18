import { fetchLocalAgentWitchWakeJson } from "@/lib/agentWitch/fetchLocalAgentWitchWakeJson";

export const requestLocalAgentWitchRestartFromWakeServer = async (): Promise<{
  readonly reachable: boolean;
  readonly result: unknown;
}> => {
  const restartResult = await fetchLocalAgentWitchWakeJson("/restart", {
    method: "POST",
  });

  if (!restartResult.reachable) {
    return { reachable: false, result: null };
  }

  return {
    reachable: true,
    result: restartResult.payload,
  };
};
