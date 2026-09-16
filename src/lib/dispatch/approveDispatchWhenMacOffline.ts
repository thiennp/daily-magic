import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { markAgentRunRunning } from "@/lib/dispatch/dispatchWriterRunToAgent";
import { notifyDispatchApprovalRunning } from "@/lib/dispatch/notifyDispatchApprovalRunning";
import {
  buildQueuedClaudeRunDispatchAck,
  queueClaudeRunInDispatchOutbox,
} from "@/lib/dispatch/queueClaudeRunInDispatchOutbox";

export const approveDispatchWhenMacOffline = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly executorUserId: string;
  readonly requesterUserId: string;
  readonly deviceId: string;
  readonly runId: string;
  readonly prompt: string;
  readonly writerAgent: HarnessWriterAgent;
  readonly requestId?: string;
  readonly pendingRequestId?: string;
  readonly includeNextActions: boolean;
}): Promise<AgentWitchMessage> => {
  await queueClaudeRunInDispatchOutbox({
    executorUserId: input.executorUserId,
    deviceId: input.deviceId,
    runId: input.runId,
    prompt: input.prompt,
    writerAgent: input.writerAgent,
    requestId: input.pendingRequestId,
    includeNextActions: input.includeNextActions,
  });

  await markAgentRunRunning(input.runtime, input.runId);
  notifyDispatchApprovalRunning(
    input.runtime,
    input.requesterUserId,
    input.runId,
    input.requestId,
  );

  return buildQueuedClaudeRunDispatchAck({
    runId: input.runId,
    requestId: input.requestId,
    requesterUserId: input.requesterUserId,
    executorUserId: input.executorUserId,
    approvalRunPayload: true,
  });
};

export const buildNoMacForApprovalError = (
  runId: string,
  requestId?: string,
): AgentWitchMessage => ({
  type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
  payload: {
    errorMessage: "No Mac is available to run this task.",
    runId,
  },
  requestId,
});
