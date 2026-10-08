import { isAgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { isDispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const readStoredSeconds = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value) && value >= 1) {
    return Math.round(value);
  }
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed >= 1) {
      return Math.round(parsed);
    }
  }
  return null;
};

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
    resultOutcomeCode: row.result_outcome_code
      ? String(row.result_outcome_code)
      : null,
    denialReason: row.denial_reason ? String(row.denial_reason) : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    startedAt: row.started_at ? String(row.started_at) : null,
    completedAt: row.completed_at ? String(row.completed_at) : null,
    approvalExpiresAt: row.approval_expires_at
      ? String(row.approval_expires_at)
      : null,
    capabilityId: row.capability_id ? String(row.capability_id) : null,
    capabilityVersionId: row.capability_version_id
      ? String(row.capability_version_id)
      : null,
    deviceId: row.device_id ? String(row.device_id) : null,
    projectId: row.project_id ? String(row.project_id) : null,
    compositionSnapshotId: row.composition_snapshot_id
      ? String(row.composition_snapshot_id)
      : null,
    writerAgent:
      typeof row.writer_agent === "string" && row.writer_agent.length > 0
        ? row.writer_agent
        : "claude-cli",
    lastRunHeartbeatAt: row.last_run_heartbeat_at
      ? String(row.last_run_heartbeat_at)
      : null,
    stopRequestedAt: row.stop_requested_at
      ? String(row.stop_requested_at)
      : null,
    estimateSeconds: readStoredSeconds(row.estimate_seconds),
    actualSeconds: readStoredSeconds(row.actual_seconds),
    // c1731750: host report summary kept as run meta.
    ...(typeof row.report_summary === "string" && row.report_summary.length > 0
      ? {
          reportSummary: row.report_summary,
          reportStatus:
            typeof row.report_status === "string" ? row.report_status : null,
        }
      : {}),
  };
}
