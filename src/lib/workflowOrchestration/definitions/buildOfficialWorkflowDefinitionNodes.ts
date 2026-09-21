import type {
  OfficialWorkflowAgentNode,
  OfficialWorkflowHumanNode,
} from "@/lib/workflowOrchestration/types/OfficialWorkflowDefinition.type";

export const buildOfficialWorkflowHumanNode = (
  index: number,
  title: string,
  instructions: string,
  options?: { readonly allowSkip?: boolean },
): OfficialWorkflowHumanNode => ({
  id: `human_${index}`,
  kind: "human",
  title,
  instructions,
  ...(options?.allowSkip === true ? { allowSkip: true } : {}),
});

export const buildOfficialWorkflowAgentNode = (
  index: number,
  title: string,
  promptSection: string,
  options?: { readonly skipWhenPriorResponseMatches?: readonly string[] },
): OfficialWorkflowAgentNode => ({
  id: `agent_${index}`,
  kind: "agent",
  title,
  promptSection,
  ...(options?.skipWhenPriorResponseMatches !== undefined &&
  options.skipWhenPriorResponseMatches.length > 0
    ? {
        skipWhenPriorResponseMatches: [...options.skipWhenPriorResponseMatches],
      }
    : {}),
});
