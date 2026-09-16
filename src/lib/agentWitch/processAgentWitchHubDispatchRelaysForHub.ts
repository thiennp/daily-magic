import type { AgentWitchHub } from "@/lib/agentWitch/agentWitchHub";
import { claimPendingHubDispatchRelaysForLocalInstance } from "@/lib/agentWitch/claimPendingHubDispatchRelaysForLocalInstance";
import {
  completeAgentWitchHubDispatchRelay,
  releaseAgentWitchHubDispatchRelayToPending,
} from "@/lib/agentWitch/updateAgentWitchHubDispatchRelayStatus";
import { resolveDispatchTargetAgentClient } from "@/lib/agentWitch/resolveDispatchTargetAgentClient";
import { dispatchClaudeRunForDashboardUser } from "@/lib/dispatch/dispatchWriterRunForDashboardUser";
import type { DispatchClaudeRunForDashboardResult } from "@/lib/dispatch/types/DispatchClaudeRunForDashboardResult.type";

export const processAgentWitchHubDispatchRelaysForHub = async (
  hub: AgentWitchHub,
): Promise<void> => {
  const workItems = await claimPendingHubDispatchRelaysForLocalInstance();

  for (const workItem of workItems) {
    const resolved = await resolveDispatchTargetAgentClient({
      runtime: hub,
      userId: workItem.executorUserId,
      deviceId: workItem.deviceId,
    });

    if (resolved === undefined) {
      await releaseAgentWitchHubDispatchRelayToPending(workItem.relayId);
      continue;
    }

    const dispatchResult: DispatchClaudeRunForDashboardResult =
      await dispatchClaudeRunForDashboardUser({
        runtime: hub,
        requesterUserId: workItem.requesterUserId,
        requesterEmail: workItem.requesterEmail,
        body: workItem.body,
        requestId: workItem.requestId,
        allowHubRelay: false,
      });

    const relayResult = dispatchResult.ok
      ? {
          ok: true as const,
          message: dispatchResult.message,
          run: dispatchResult.run,
        }
      : {
          ok: false as const,
          message: dispatchResult.message,
        };

    await completeAgentWitchHubDispatchRelay({
      relayId: workItem.relayId,
      result: relayResult,
    });
  }
};
