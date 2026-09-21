import { randomUUID } from "node:crypto";

import type { OfficialWorkflowAgentNode } from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";
import type WorkflowRunRecord from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";
import {
  updateWorkflowRunRecord,
  upsertWorkflowStepRunRecord,
} from "@/lib/workflowOrchestration/workflowRunQueries";

export const skipOfficialWorkflowAgentStep = async (input: {
  readonly run: WorkflowRunRecord;
  readonly node: OfficialWorkflowAgentNode;
  readonly reason: string;
}): Promise<void> => {
  await upsertWorkflowStepRunRecord({
    id: randomUUID(),
    workflowRunId: input.run.id,
    stepIndex: input.run.currentStepIndex,
    nodeId: input.node.id,
    nodeKind: "agent",
    status: "skipped",
    title: input.node.title,
    agentRunId: null,
    output: { skippedReason: input.reason },
  });

  await updateWorkflowRunRecord(input.run.id, {
    status: "running",
    currentStepIndex: input.run.currentStepIndex + 1,
  });
};

export default skipOfficialWorkflowAgentStep;
