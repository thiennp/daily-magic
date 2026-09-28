import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { asRowArray, getSql } from "@/lib/db";
import { mapWorkflowStepRunRow } from "@/lib/workflowOrchestration/mapWorkflowRunRow";
import type { WorkflowStepRunRecord } from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";
import {
  findWorkflowStepRunSessionByAgentRunId,
  registerWorkflowStepRunSession,
} from "@/lib/workflowOrchestration/workflowRunSessionRegistry";

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

export default getWorkflowStepRunByAgentRunId;
