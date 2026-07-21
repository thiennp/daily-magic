import { fetchLocalAgentWitchWakeJson } from "@/lib/agentWitch/fetchLocalAgentWitchWakeJson";

export const requestLocalAgentWitchInstallDeleteRun = async (): Promise<{
  readonly reachable: boolean;
  readonly result: unknown;
}> => {
  const deleteResult = await fetchLocalAgentWitchWakeJson("/install/delete", {
    method: "POST",
  });

  if (!deleteResult.reachable) {
    return { reachable: false, result: null };
  }

  return {
    reachable: true,
    result: deleteResult.payload,
  };
};
