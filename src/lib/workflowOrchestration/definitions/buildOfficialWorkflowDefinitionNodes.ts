import type {
  OfficialWorkflowAgentNode,
  OfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

export const buildOfficialWorkflowHumanNode = (
  index: number,
  title: string,
  instructions: string,
): OfficialWorkflowHumanNode => ({
  id: `human_${index}`,
  kind: "human",
  title,
  instructions,
});

export const buildOfficialWorkflowAgentNode = (
  index: number,
  title: string,
  promptSection: string,
): OfficialWorkflowAgentNode => ({
  id: `agent_${index}`,
  kind: "agent",
  title,
  promptSection,
});
