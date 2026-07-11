import {
  AgentRunScope,
  type AgentRunScopeValue,
} from "@/lib/dispatch/AgentRunScope.constant";

export const SCOPE_FILTER_OPTIONS: readonly {
  readonly value: AgentRunScopeValue;
  readonly label: string;
}[] = [
  { value: AgentRunScope.ALL, label: "All my runs" },
  { value: AgentRunScope.MINE, label: "Self only" },
  { value: AgentRunScope.TEAM, label: "Team dispatches" },
  { value: AgentRunScope.GROUP, label: "By group" },
];
