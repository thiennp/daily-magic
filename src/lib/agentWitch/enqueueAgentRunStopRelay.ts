import { findLiveRegistryInstanceIdForDevice } from "@/lib/agentWitch/agentWitchConnectionRegistryQueries";
import { enqueueAgentWitchHubDispatchRelay } from "@/lib/agentWitch/enqueueAgentWitchHubDispatchRelay";
import { getAgentWitchHubInstanceId } from "@/lib/agentWitch/getAgentWitchHubInstanceId";

/**
 * S0-7 — hand a stop to the instance that owns the computer's socket.
 * Returns false when no other live instance owns it (heartbeat backstop
 * then applies `stop_requested_at` whenever the computer next checks in).
 */
export const enqueueAgentRunStopRelay = async (input: {
  readonly agentRunId: string;
  readonly executorUserId: string;
  readonly requesterUserId: string;
  readonly deviceId: string;
}): Promise<boolean> => {
  const ownerInstanceId = await findLiveRegistryInstanceIdForDevice(
    input.executorUserId,
    input.deviceId,
  );
  if (
    ownerInstanceId === null ||
    ownerInstanceId === getAgentWitchHubInstanceId()
  ) {
    return false;
  }
  await enqueueAgentWitchHubDispatchRelay({
    ownerInstanceId,
    executorUserId: input.executorUserId,
    requesterUserId: input.requesterUserId,
    deviceId: input.deviceId,
    requestId: `stop:${input.agentRunId}`,
    body: { kind: "stop", agentRunId: input.agentRunId },
  });
  return true;
};
