import { randomUUID } from "node:crypto";

import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { broadcastWorkflowHumanStepRequired } from "@/lib/workflowOrchestration/broadcastWorkflowHumanStepRequired";
import { buildWorkflowRunStepResponse } from "@/lib/workflowOrchestration/buildWorkflowRunStepResponse";
import type { OfficialWorkflowHumanNode } from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";
import type WorkflowRunRecord from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";
import type WorkflowRunStepResponse from "@/lib/workflowOrchestration/types/WorkflowRunStepResponse.type";
import {
  updateWorkflowRunRecord,
  upsertWorkflowStepRunRecord,
} from "@/lib/workflowOrchestration/workflowRunQueries";

export const runOfficialWorkflowHumanStep = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly run: WorkflowRunRecord;
  readonly humanNode: OfficialWorkflowHumanNode;
  readonly requesterUserId: string;
}): Promise<WorkflowRunStepResponse> => {
  const stepRunId = randomUUID();
  await upsertWorkflowStepRunRecord({
    id: stepRunId,
    workflowRunId: input.run.id,
    stepIndex: input.run.currentStepIndex,
    nodeId: input.humanNode.id,
    nodeKind: "human",
    status: "waiting_human",
    title: input.humanNode.title,
    agentRunId: null,
    output: null,
  });

  await updateWorkflowRunRecord(input.run.id, {
    status: "waiting_human",
    currentStepIndex: input.run.currentStepIndex,
  });

  const humanStep = {
    stepRunId,
    stepIndex: input.run.currentStepIndex,
    title: input.humanNode.title,
    instructions: input.humanNode.instructions,
  };

  broadcastWorkflowHumanStepRequired(
    input.runtime,
    input.requesterUserId,
    input.run.id,
    humanStep,
  );

  return buildWorkflowRunStepResponse({
    ok: true,
    workflowRunId: input.run.id,
    currentStep: input.run.currentStepIndex,
    humanStep,
  });
};

export default runOfficialWorkflowHumanStep;
