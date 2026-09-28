import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { asRowArray, getSql } from "@/lib/db";
import {
  mapWorkflowRunRow,
  mapWorkflowStepRunRow,
} from "@/lib/workflowOrchestration/mapWorkflowRunRow";
import type WorkflowRunRecord from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";
import type { WorkflowStepRunRecord } from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";
import {
  getWorkflowRunSession,
  getWorkflowStepRunSession,
  registerWorkflowRunSession,
  registerWorkflowStepRunSession,
} from "@/lib/workflowOrchestration/workflowRunSessionRegistry";

export { getWorkflowStepRunByAgentRunId } from "@/lib/workflowOrchestration/getWorkflowStepRunByAgentRunId";
export { listWorkflowStepRunsForWorkflowRunId } from "@/lib/workflowOrchestration/listWorkflowStepRunsForWorkflowRunId";

export { updateWorkflowRunRecord } from "@/lib/workflowOrchestration/updateWorkflowRunRecord";
export {
  upsertWorkflowStepRunRecord,
  completeWorkflowStepRun,
} from "@/lib/workflowOrchestration/upsertWorkflowStepRunRecord";
export { createWorkflowRunRecord } from "@/lib/workflowOrchestration/createWorkflowRunRecord";

export const getWorkflowRunById = async (
  workflowRunId: string,
): Promise<WorkflowRunRecord | null> => {
  const cached = getWorkflowRunSession(workflowRunId);
  if (cached !== undefined) {
    return cached;
  }

  if (isAgentWitchDevDashboardEnabled()) {
    return null;
  }

  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT * FROM workflow_runs WHERE id = ${workflowRunId}
    `,
  );
  if (!rows[0]) {
    return null;
  }

  const run = mapWorkflowRunRow(rows[0]);
  registerWorkflowRunSession(run);
  return run;
};

export const getWorkflowStepRunById = async (
  stepRunId: string,
): Promise<WorkflowStepRunRecord | null> => {
  const cached = getWorkflowStepRunSession(stepRunId);
  if (cached !== undefined) {
    return cached;
  }

  if (isAgentWitchDevDashboardEnabled()) {
    return null;
  }

  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT * FROM workflow_step_runs WHERE id = ${stepRunId}
    `,
  );
  if (!rows[0]) {
    return null;
  }

  const step = mapWorkflowStepRunRow(rows[0]);
  registerWorkflowStepRunSession(step);
  return step;
};
