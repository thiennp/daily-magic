import { randomUUID } from "node:crypto";

import { isAgentWitchDevDashboardEnabled } from "@/lib/auth/resolveDevDashboardActor";
import { asRowArray, getSql } from "@/lib/db";
import { mapWorkflowRunRow } from "@/lib/workflowOrchestration/mapWorkflowRunRow";
import type WorkflowRunRecord from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";
import { registerWorkflowRunSession } from "@/lib/workflowOrchestration/workflowRunSessionRegistry";

export const createWorkflowRunRecord = async (input: {
  readonly requesterUserId: string;
  readonly executorUserId: string;
  readonly deviceId: string | null;
  readonly capabilityId: string | null;
  readonly templateId: string;
  readonly fieldValues: Readonly<Record<string, string>>;
  readonly definitionSnapshot: Record<string, unknown>;
  readonly orchestrationVersion?: number;
}): Promise<WorkflowRunRecord> => {
  const id = randomUUID();
  const now = new Date().toISOString();
  const orchestrationVersion = input.orchestrationVersion ?? 1;

  if (isAgentWitchDevDashboardEnabled()) {
    const run: WorkflowRunRecord = {
      id,
      requesterUserId: input.requesterUserId,
      executorUserId: input.executorUserId,
      deviceId: input.deviceId,
      capabilityId: input.capabilityId,
      templateId: input.templateId,
      orchestrationVersion,
      status: "running",
      currentStepIndex: 0,
      fieldValues: input.fieldValues,
      stepOutputs: {},
      definitionSnapshot: input.definitionSnapshot,
      errorMessage: null,
      createdAt: now,
      updatedAt: now,
      completedAt: null,
    };
    registerWorkflowRunSession(run);
    return run;
  }

  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO workflow_runs (
        id,
        requester_user_id,
        executor_user_id,
        device_id,
        capability_id,
        template_id,
        orchestration_version,
        status,
        current_step_index,
        field_values,
        step_outputs,
        definition_snapshot
      )
      VALUES (
        ${id},
        ${input.requesterUserId},
        ${input.executorUserId},
        ${input.deviceId},
        ${input.capabilityId},
        ${input.templateId},
        ${orchestrationVersion},
        'running',
        0,
        ${JSON.stringify(input.fieldValues)}::jsonb,
        '{}'::jsonb,
        ${JSON.stringify(input.definitionSnapshot)}::jsonb
      )
      RETURNING *
    `,
  );

  const run = mapWorkflowRunRow(rows[0]);
  registerWorkflowRunSession(run);
  return run;
};

export default createWorkflowRunRecord;
