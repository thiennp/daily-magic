import { findLiveRegistryInstanceIdForDevice } from "@/lib/agentWitch/agentWitchConnectionRegistry";
import { enqueueAgentWitchHubDispatchRelay } from "@/lib/agentWitch/enqueueAgentWitchHubDispatchRelay";
import { getAgentWitchHubInstanceId } from "@/lib/agentWitch/getAgentWitchHubInstanceId";
import { waitForAgentWitchHubDispatchRelay } from "@/lib/agentWitch/waitForAgentWitchHubDispatchRelay";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import type { DispatchClaudeRunForDashboardResult } from "@/lib/dispatch/types/DispatchClaudeRunForDashboardResult.type";

export const tryDispatchClaudeRunThroughHubRelay = async (input: {
  readonly executorUserId: string;
  readonly requesterUserId: string;
  readonly deviceId: string;
  readonly requestId: string;
  readonly body: AgentRunDispatchBody;
}): Promise<DispatchClaudeRunForDashboardResult | null> => {
  const ownerInstanceId = await findLiveRegistryInstanceIdForDevice(
    input.executorUserId,
    input.deviceId,
  );

  if (ownerInstanceId === null) {
    return null;
  }

  const localInstanceId = getAgentWitchHubInstanceId();
  if (ownerInstanceId === localInstanceId) {
    return null;
  }

  const relayId = await enqueueAgentWitchHubDispatchRelay({
    ownerInstanceId,
    executorUserId: input.executorUserId,
    requesterUserId: input.requesterUserId,
    deviceId: input.deviceId,
    requestId: input.requestId,
    body: input.body,
  });

  const relayResult = await waitForAgentWitchHubDispatchRelay(relayId);
  if (relayResult === null) {
    return null;
  }

  if (
    relayResult.ok &&
    relayResult.message !== undefined &&
    relayResult.run !== undefined
  ) {
    return {
      ok: true,
      message: relayResult.message,
      run: relayResult.run,
    };
  }

  if (!relayResult.ok && relayResult.message !== undefined) {
    return { ok: false, message: relayResult.message };
  }

  return null;
};
