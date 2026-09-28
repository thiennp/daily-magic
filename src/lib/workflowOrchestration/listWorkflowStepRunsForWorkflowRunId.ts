import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { asRowArray, getSql } from "@/lib/db";
import { mapWorkflowStepRunRow } from "@/lib/workflowOrchestration/mapWorkflowRunRow";
import { mergeWorkflowStepRunRecordsWithSession } from "@/lib/workflowOrchestration/mergeWorkflowStepRunRecordsWithSession";
import type { WorkflowStepRunRecord } from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";
import {
  listWorkflowStepRunSessionsForRun,
  registerWorkflowStepRunSession,
} from "@/lib/workflowOrchestration/workflowRunSessionRegistry";

export const listWorkflowStepRunsForWorkflowRunId = async (
  workflowRunId: string,
): Promise<readonly WorkflowStepRunRecord[]> => {
  const sessionSteps = listWorkflowStepRunSessionsForRun(workflowRunId);

  if (isAgentWitchDevDashboardEnabled()) {
    return sessionSteps;
  }

  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT * FROM workflow_step_runs
      WHERE workflow_run_id = ${workflowRunId}
      ORDER BY step_index ASC
    `,
  );

  const stepsFromDb = rows.map((row) => mapWorkflowStepRunRow(row));
  const merged = mergeWorkflowStepRunRecordsWithSession({
    stepsFromDb,
    sessionSteps,
  });

  for (const step of merged) {
    registerWorkflowStepRunSession(step);
  }

  return merged;
};

export default listWorkflowStepRunsForWorkflowRunId;
