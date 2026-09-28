import {
  AGENT_ACCESS_MAX_OPEN_RUNS,
  AGENT_ACCESS_MAX_WORKFLOWS,
  AGENT_ACCESS_MUTATING_TOOLS,
  AGENT_ACCESS_MUTATIONS_PER_HOUR,
  AGENT_ACCESS_TOOL_CALLS_PER_HOUR,
} from "@/lib/agentAccess/agentAccess.constant";

const MUTATING = new Set<string>(AGENT_ACCESS_MUTATING_TOOLS);

export const isAgentAccessMutatingTool = (name: string): boolean =>
  MUTATING.has(name);

export const isAgentAccessToolRateLimited = (toolCount: number): boolean =>
  toolCount >= AGENT_ACCESS_TOOL_CALLS_PER_HOUR;

export const isAgentAccessMutationRateLimited = (
  mutationCount: number,
): boolean => mutationCount >= AGENT_ACCESS_MUTATIONS_PER_HOUR;

export const isAgentAccessRunCapacityFull = (openRuns: number): boolean =>
  openRuns >= AGENT_ACCESS_MAX_OPEN_RUNS;

export const isAgentAccessWorkflowCapacityFull = (
  workflowCount: number,
): boolean => workflowCount >= AGENT_ACCESS_MAX_WORKFLOWS;
