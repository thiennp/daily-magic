import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { getSql } from "@/lib/db";
import type { WorkflowStepRunRecord } from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";
import {
  getWorkflowStepRunSession,
  registerWorkflowStepRunSession,
} from "@/lib/workflowOrchestration/workflowRunSessionRegistry";

export const upsertWorkflowStepRunRecord = async (
  step: Omit<
    WorkflowStepRunRecord,
    "createdAt" | "updatedAt" | "completedAt"
  > & {
    readonly createdAt?: string;
    readonly updatedAt?: string;
    readonly completedAt?: string | null;
  },
): Promise<void> => {
  const now = new Date().toISOString();
  const record: WorkflowStepRunRecord = {
    ...step,
    createdAt: step.createdAt ?? now,
    updatedAt: step.updatedAt ?? now,
    completedAt: step.completedAt ?? null,
  };

  registerWorkflowStepRunSession(record);

  if (isAgentWitchDevDashboardEnabled()) {
    return;
  }

  const sql = getSql();
  await sql`
    INSERT INTO workflow_step_runs (
      id,
      workflow_run_id,
      step_index,
      node_id,
      node_kind,
      status,
      title,
      agent_run_id,
      output
    )
    VALUES (
      ${record.id},
      ${record.workflowRunId},
      ${record.stepIndex},
      ${record.nodeId},
      ${record.nodeKind},
      ${record.status},
      ${record.title},
      ${record.agentRunId},
      ${record.output ? JSON.stringify(record.output) : null}::jsonb
    )
    ON CONFLICT (workflow_run_id, step_index)
    DO UPDATE SET
      status = EXCLUDED.status,
      title = EXCLUDED.title,
      agent_run_id = EXCLUDED.agent_run_id,
      output = EXCLUDED.output,
      updated_at = NOW()
  `;
};

export const completeWorkflowStepRun = async (
  stepRunId: string,
  input: {
    readonly status: WorkflowStepRunRecord["status"];
    readonly output?: Record<string, unknown> | null;
  },
): Promise<void> => {
  const cached = getWorkflowStepRunSession(stepRunId);
  const now = new Date().toISOString();
  if (cached !== undefined) {
    registerWorkflowStepRunSession({
      ...cached,
      status: input.status,
      output: input.output ?? cached.output,
      updatedAt: now,
      completedAt: now,
    });
  }

  if (isAgentWitchDevDashboardEnabled()) {
    return;
  }

  const sql = getSql();
  await sql`
    UPDATE workflow_step_runs
    SET
      status = ${input.status},
      output = COALESCE(${input.output ? JSON.stringify(input.output) : null}::jsonb, output),
      completed_at = NOW(),
      updated_at = NOW()
    WHERE id = ${stepRunId}
  `;
};

export default upsertWorkflowStepRunRecord;
