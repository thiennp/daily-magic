import {
  parseLatestAgentLiveTerminalNextActions,
  stripNextActionsFromTerminalOutput,
} from "@/features/agent/utils/splitAgentLiveTerminalOutput";

export interface AgentRunResultDisplayParts {
  readonly body: string;
  readonly nextActions: readonly string[];
}

/** Split stored run output into visible text and suggested next-step buttons. */
export const splitAgentRunResultForDisplay = (
  resultOutput: string,
): AgentRunResultDisplayParts => ({
  body: stripNextActionsFromTerminalOutput(resultOutput),
  nextActions: parseLatestAgentLiveTerminalNextActions(resultOutput),
});
