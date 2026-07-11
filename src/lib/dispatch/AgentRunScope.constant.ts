export const AgentRunScope = {
  ALL: "all",
  MINE: "mine",
  TEAM: "team",
  GROUP: "group",
} as const;

export type AgentRunScopeValue =
  (typeof AgentRunScope)[keyof typeof AgentRunScope];

export const isAgentRunScope = (value: string): value is AgentRunScopeValue =>
  value === AgentRunScope.ALL ||
  value === AgentRunScope.MINE ||
  value === AgentRunScope.TEAM ||
  value === AgentRunScope.GROUP;
