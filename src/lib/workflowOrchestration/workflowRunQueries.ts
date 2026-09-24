import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { asRowArray, getSql } from "@/lib/db";
import {
  mapWorkflowRunRow,
  mapWorkflowStepRunRow,
} from "@/lib/workflowOrchestration/mapWorkflowRunRow";
import type WorkflowRunRecord from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";
import type { WorkflowStepRunRecord } from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";
import {
  findWorkflowStepRunSessionByAgentRunId,
  getWorkflowRunSession,
  getWorkflowStepRunSession,
  listWorkflowStepRunSessionsForRun,
  registerWorkflowRunSession,
  registerWorkflowStepRunSession,
} from "@/lib/workflowOrchestration/workflowRunSessionRegistry";

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

export const listWorkflowStepRunsForWorkflowRunId = async (
  workflowRunId: string,
): Promise<readonly WorkflowStepRunRecord[]> => {
  const fromSession = listWorkflowStepRunSessionsForRun(workflowRunId);
  if (fromSession.length > 0) {
    return fromSession;
  }

  if (isAgentWitchDevDashboardEnabled()) {
    return [];
  }

  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT * FROM workflow_step_runs
      WHERE workflow_run_id = ${workflowRunId}
      ORDER BY step_index ASC
    `,
  );

  const steps = rows.map((row) => mapWorkflowStepRunRow(row));
  for (const step of steps) {
    registerWorkflowStepRunSession(step);
  }

  return steps;
};

export const getWorkflowStepRunByAgentRunId = async (
  agentRunId: string,
): Promise<WorkflowStepRunRecord | null> => {
  const cached = findWorkflowStepRunSessionByAgentRunId(agentRunId);
  if (cached !== undefined) {
    return cached;
  }

  if (isAgentWitchDevDashboardEnabled()) {
    return null;
  }

  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT * FROM workflow_step_runs WHERE agent_run_id = ${agentRunId}
      LIMIT 1
    `,
  );
  if (!rows[0]) {
    return null;
  }

  const step = mapWorkflowStepRunRow(rows[0]);
  registerWorkflowStepRunSession(step);
  return step;
};
