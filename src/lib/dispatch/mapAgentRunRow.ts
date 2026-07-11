import { isAgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { isDispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export default function mapAgentRunRow(
  row: Record<string, unknown>,
): AgentRunRecord {
  const status = String(row.status);
  const dispatchPolicy = String(row.dispatch_policy);

  return {
    id: String(row.id),
    groupId: row.group_id ? String(row.group_id) : null,
    requesterUserId: String(row.requester_user_id),
    executorUserId: String(row.executor_user_id),
    prompt: String(row.prompt),
    status: isAgentRunStatus(status) ? status : "failed",
    dispatchPolicy: isDispatchPolicy(dispatchPolicy)
      ? dispatchPolicy
      : "approval",
    resultOutput: row.result_output ? String(row.result_output) : null,
    resultExitCode:
      typeof row.result_exit_code === "number" ? row.result_exit_code : null,
    denialReason: row.denial_reason ? String(row.denial_reason) : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    startedAt: row.started_at ? String(row.started_at) : null,
    completedAt: row.completed_at ? String(row.completed_at) : null,
    approvalExpiresAt: row.approval_expires_at
      ? String(row.approval_expires_at)
      : null,
  };
}
