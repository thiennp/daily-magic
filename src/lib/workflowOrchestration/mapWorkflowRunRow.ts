import type WorkflowRunRecord from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";
import type {
  WorkflowRunStatusValue,
  WorkflowStepRunRecord,
  WorkflowStepRunStatusValue,
} from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";

export const mapWorkflowRunRow = (
  row: Record<string, unknown>,
): WorkflowRunRecord => ({
  id: String(row.id),
  requesterUserId: String(row.requester_user_id),
  executorUserId: String(row.executor_user_id),
  deviceId: row.device_id ? String(row.device_id) : null,
  capabilityId: row.capability_id ? String(row.capability_id) : null,
  templateId: String(row.template_id),
  orchestrationVersion: Number(row.orchestration_version),
  status: String(row.status) as WorkflowRunStatusValue,
  currentStepIndex: Number(row.current_step_index),
  fieldValues:
    typeof row.field_values === "object" && row.field_values !== null
      ? (row.field_values as Record<string, string>)
      : {},
  stepOutputs:
    typeof row.step_outputs === "object" && row.step_outputs !== null
      ? (row.step_outputs as Record<string, unknown>)
      : {},
  definitionSnapshot:
    typeof row.definition_snapshot === "object" &&
    row.definition_snapshot !== null
      ? (row.definition_snapshot as Record<string, unknown>)
      : {},
  errorMessage: row.error_message ? String(row.error_message) : null,
  createdAt: String(row.created_at),
  updatedAt: String(row.updated_at),
  completedAt: row.completed_at ? String(row.completed_at) : null,
});

export const mapWorkflowStepRunRow = (
  row: Record<string, unknown>,
): WorkflowStepRunRecord => ({
  id: String(row.id),
  workflowRunId: String(row.workflow_run_id),
  stepIndex: Number(row.step_index),
  nodeId: String(row.node_id),
  nodeKind: String(row.node_kind) as "human" | "agent",
  status: String(row.status) as WorkflowStepRunStatusValue,
  title: String(row.title),
  agentRunId: row.agent_run_id ? String(row.agent_run_id) : null,
  output:
    typeof row.output === "object" && row.output !== null
      ? (row.output as Record<string, unknown>)
      : null,
  createdAt: String(row.created_at),
  updatedAt: String(row.updated_at),
  completedAt: row.completed_at ? String(row.completed_at) : null,
});

export default mapWorkflowRunRow;
