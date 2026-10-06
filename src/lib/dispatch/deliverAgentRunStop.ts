import { cancelQueuedAgentRunOutbox } from "@/lib/agentWitch/cancelQueuedAgentRunOutbox";
import { enqueueAgentRunStopRelay } from "@/lib/agentWitch/enqueueAgentRunStopRelay";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/** sent = this instance's socket · relayed = other instance · on_next_check_in = heartbeat backstop. */
export type AgentRunStopDelivery = "sent" | "relayed" | "on_next_check_in";

/**
 * S0-7 — after `stop_requested_at` is stored: drop any queued start, then
 * reach the computer through this instance's socket, else the hub relay.
 * Never fails the stop: the stored request is applied at the next heartbeat.
 */
export const deliverAgentRunStop = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly run: AgentRunRecord;
  readonly requestedByUserId: string;
  readonly requestId?: string;
}): Promise<AgentRunStopDelivery> => {
  const { run } = input;
  await cancelQueuedAgentRunOutbox(run.id).catch(() => 0);

  const deviceId = run.deviceId ?? undefined;
  const agentClient = input.runtime.findAgentClientForUser(
    run.executorUserId,
    deviceId,
  );
  if (agentClient !== undefined) {
    agentClient.send({
      type: AGENT_WITCH_MESSAGE_TYPES.COMMAND_CLAUDE_STOP,
      payload: { agentRunId: run.id },
      requestId: input.requestId,
    });
    return "sent";
  }

  if (deviceId === undefined) {
    return "on_next_check_in";
  }
  const relayed = await enqueueAgentRunStopRelay({
    agentRunId: run.id,
    executorUserId: run.executorUserId,
    requesterUserId: input.requestedByUserId,
    deviceId,
  }).catch(() => false);
  return relayed ? "relayed" : "on_next_check_in";
};
