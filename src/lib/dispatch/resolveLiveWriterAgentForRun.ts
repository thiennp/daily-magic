import { findEnrichedAgentClientForUser } from "@/lib/agentWitch/findEnrichedAgentClientForUser";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { retargetWriterRunToSoleLiveMac } from "@/lib/dispatch/retargetWriterRunToSoleLiveMac";

export const resolveLiveWriterAgentForRun = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly executorUserId: string;
  readonly targetDeviceId: string | undefined;
}): Promise<
  | {
      readonly agentClient: AgentWitchHubClient;
      readonly deviceId: string | null;
    }
  | undefined
> => {
  const agentClient = await findEnrichedAgentClientForUser(
    input.runtime,
    input.executorUserId,
    input.targetDeviceId,
  );

  if (agentClient !== undefined) {
    const deviceId =
      input.targetDeviceId ??
      (agentClient.deviceId !== undefined ? agentClient.deviceId : null);
    return { agentClient, deviceId: deviceId ?? null };
  }

  if (input.targetDeviceId === undefined) {
    return undefined;
  }

  const retargeted = await retargetWriterRunToSoleLiveMac({
    runtime: input.runtime,
    executorUserId: input.executorUserId,
    targetDeviceId: input.targetDeviceId,
  });

  if (retargeted === undefined) {
    return undefined;
  }

  return {
    agentClient: retargeted.agentClient,
    deviceId: retargeted.deviceId,
  };
};
