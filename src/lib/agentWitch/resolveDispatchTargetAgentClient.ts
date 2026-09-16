import { findEnrichedAgentClientForUser } from "@/lib/agentWitch/findEnrichedAgentClientForUser";
import { resolveCurrentAgentWitchDeviceId } from "@/lib/agentWitch/resolveCurrentAgentWitchDeviceId";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { retargetWriterRunToSoleLiveMac } from "@/lib/dispatch/retargetWriterRunToSoleLiveMac";

export interface DispatchTargetAgentClient {
  readonly agentClient: AgentWitchHubClient;
  readonly deviceId: string | null;
}

/**
 * Single liveness resolution for every dispatch caller: exact live match, then
 * the supersession chain left behind by a re-pair, then the sole live Mac.
 */
export const resolveDispatchTargetAgentClient = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly userId: string;
  readonly deviceId: string | undefined;
}): Promise<DispatchTargetAgentClient | undefined> => {
  const agentClient = await findEnrichedAgentClientForUser(
    input.runtime,
    input.userId,
    input.deviceId,
  );

  if (agentClient !== undefined) {
    return {
      agentClient,
      deviceId: input.deviceId ?? agentClient.deviceId ?? null,
    };
  }

  if (input.deviceId === undefined) {
    return undefined;
  }

  const currentDeviceId = await resolveCurrentAgentWitchDeviceId(
    input.deviceId,
  );

  if (currentDeviceId !== input.deviceId) {
    const supersedingClient = await findEnrichedAgentClientForUser(
      input.runtime,
      input.userId,
      currentDeviceId,
    );

    if (supersedingClient !== undefined) {
      return { agentClient: supersedingClient, deviceId: currentDeviceId };
    }
  }

  const retargeted = await retargetWriterRunToSoleLiveMac({
    runtime: input.runtime,
    executorUserId: input.userId,
    targetDeviceId: input.deviceId,
  });

  return retargeted === undefined
    ? undefined
    : { agentClient: retargeted.agentClient, deviceId: retargeted.deviceId };
};
