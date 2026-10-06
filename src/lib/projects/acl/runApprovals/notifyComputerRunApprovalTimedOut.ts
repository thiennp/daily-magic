import { getAgentWitchHub } from "@/lib/agentWitch/getAgentWitchHub";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { broadcastAgentRunRecord } from "@/lib/dispatch/broadcastAgentRunRecord";
import { notifyDashboardUser } from "@/lib/dispatch/dispatchWriterRunToAgent";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";
import { ComputerRunApprovalState } from "@/lib/projects/acl/runApprovals/computerRunApprovalState.constant";

/**
 * Live push when an approval hits timed_out: same DISPATCH_APPROVAL_RESULT
 * channel as approve/deny, plus AGENT_RUN_RECORD so the run reads as timed out
 * (not "Needs retry").
 */
export const notifyComputerRunApprovalTimedOut = (
  run: AgentRunRecord,
): void => {
  const hub = getAgentWitchHub();
  const message = {
    type: AGENT_WITCH_MESSAGE_TYPES.DISPATCH_APPROVAL_RESULT,
    payload: {
      runId: run.id,
      status: ComputerRunApprovalState.TIMED_OUT,
      projectId: run.projectId,
      denialReason: run.denialReason ?? "Dispatch approval expired.",
    },
  };
  notifyDashboardUser(hub, run.executorUserId, message);
  if (run.requesterUserId !== run.executorUserId) {
    notifyDashboardUser(hub, run.requesterUserId, message);
  }
  broadcastAgentRunRecord(hub, run);
};
