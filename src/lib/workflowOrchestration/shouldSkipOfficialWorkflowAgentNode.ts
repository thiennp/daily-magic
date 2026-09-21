import { collectPriorHumanResponsesFromWorkflowRun } from "@/lib/workflowOrchestration/collectPriorHumanResponsesFromWorkflowRun";
import type OfficialWorkflowDefinition from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";
import type { OfficialWorkflowAgentNode } from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";
import type WorkflowRunRecord from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";

const findClosestPriorHumanNodeId = (
  definition: OfficialWorkflowDefinition,
  stepIndex: number,
): string | undefined =>
  definition.nodes
    .slice(0, Math.max(stepIndex, 0))
    .filter((node) => node.kind === "human")
    .at(-1)?.id;

export const shouldSkipOfficialWorkflowAgentNode = (input: {
  readonly run: WorkflowRunRecord;
  readonly definition: OfficialWorkflowDefinition;
  readonly node: OfficialWorkflowAgentNode;
  readonly stepIndex: number;
}): boolean => {
  const phrases = input.node.skipWhenPriorResponseMatches ?? [];
  if (phrases.length === 0) {
    return false;
  }

  const priorHumanNodeId = findClosestPriorHumanNodeId(
    input.definition,
    input.stepIndex,
  );
  if (priorHumanNodeId === undefined) {
    return false;
  }

  const response = collectPriorHumanResponsesFromWorkflowRun(input.run)[
    priorHumanNodeId
  ];
  if (response === undefined) {
    return false;
  }

  const normalized = response.trim().toLowerCase();
  return phrases.some((phrase) =>
    normalized.includes(phrase.trim().toLowerCase()),
  );
};

export default shouldSkipOfficialWorkflowAgentNode;
