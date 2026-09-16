import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { notifyDashboardUser } from "@/lib/dispatch/dispatchWriterRunToAgent";

export const notifyDispatchApprovalRunning = (
  runtime: AgentWitchHubRuntime,
  requesterUserId: string,
  runId: string,
  requestId?: string,
): void => {
  notifyDashboardUser(runtime, requesterUserId, {
    type: AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_RESULT,
    payload: {
      runId,
      status: AgentRunStatus.RUNNING,
    },
    requestId,
  });
};
