import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";
import type WorkflowRunRecord from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";

const readOutputPreview = (value: unknown): string | undefined => {
  if (typeof value !== "object" || value === null) {
    return undefined;
  }
  const preview = (value as { outputPreview?: unknown }).outputPreview;
  return typeof preview === "string" && preview.trim().length > 0
    ? preview
    : undefined;
};

export const readPriorAgentOutputPreview = (
  run: WorkflowRunRecord,
  definition: OfficialWorkflowDefinition,
  stepIndex: number,
): string | undefined => {
  const priorAgentNode = definition.nodes
    .slice(0, Math.max(stepIndex, 0))
    .filter((node) => node.kind === "agent")
    .at(-1);

  return priorAgentNode === undefined
    ? undefined
    : readOutputPreview(run.stepOutputs[priorAgentNode.id]);
};

export default readPriorAgentOutputPreview;
