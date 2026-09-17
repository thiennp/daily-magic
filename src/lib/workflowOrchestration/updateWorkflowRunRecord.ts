import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { asRowArray, getSql } from "@/lib/db";
import { mapWorkflowRunRow } from "@/lib/workflowOrchestration/mapWorkflowRunRow";
import type { WorkflowRunStatusValue } from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";
import {
  getWorkflowRunSession,
  registerWorkflowRunSession,
} from "@/lib/workflowOrchestration/workflowRunSessionRegistry";

export const updateWorkflowRunRecord = async (
  workflowRunId: string,
  patch: {
    readonly status?: WorkflowRunStatusValue;
    readonly currentStepIndex?: number;
    readonly stepOutputs?: Readonly<Record<string, unknown>>;
    readonly errorMessage?: string | null;
    readonly completedAt?: string | null;
  },
): Promise<void> => {
  const cached = getWorkflowRunSession(workflowRunId);
  if (cached !== undefined && isAgentWitchDevDashboardEnabled()) {
    registerWorkflowRunSession({
      ...cached,
      status: patch.status ?? cached.status,
      currentStepIndex: patch.currentStepIndex ?? cached.currentStepIndex,
      stepOutputs: patch.stepOutputs ?? cached.stepOutputs,
      errorMessage:
        patch.errorMessage !== undefined
          ? patch.errorMessage
          : cached.errorMessage,
      completedAt:
        patch.completedAt !== undefined
          ? patch.completedAt
          : cached.completedAt,
      updatedAt: new Date().toISOString(),
    });
    return;
  }

  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE workflow_runs
      SET
        status = COALESCE(${patch.status ?? null}, status),
        current_step_index = COALESCE(${patch.currentStepIndex ?? null}, current_step_index),
        step_outputs = COALESCE(${patch.stepOutputs ? JSON.stringify(patch.stepOutputs) : null}::jsonb, step_outputs),
        error_message = COALESCE(${patch.errorMessage ?? null}, error_message),
        completed_at = COALESCE(${patch.completedAt ?? null}, completed_at),
        updated_at = NOW()
      WHERE id = ${workflowRunId}
      RETURNING *
    `,
  );

  if (rows[0]) {
    registerWorkflowRunSession(mapWorkflowRunRow(rows[0]));
  }
};

export default updateWorkflowRunRecord;
