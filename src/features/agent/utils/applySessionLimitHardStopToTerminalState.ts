import { resolveAgentRunOutcomeFromWriterOutput } from "@agent-witch/shared/dispatch";

import { formatHardStopOutcomeTerminalBlock } from "@/lib/dispatch/formatHardStopOutcomeTerminalBlock";

import type { AgentLiveTerminalState } from "./agentLiveTerminalState.type";

export const applySessionLimitHardStopToTerminalState = (
  state: AgentLiveTerminalState,
  output: string,
): AgentLiveTerminalState | null => {
  const outcome = resolveAgentRunOutcomeFromWriterOutput(output);
  if (outcome === null) {
    return null;
  }

  const block = formatHardStopOutcomeTerminalBlock(outcome);
  const separator = output.length === 0 || output.endsWith("\n") ? "" : "\n";

  return {
    ...state,
    status: "error",
    output: `${output}${separator}${block}\n`,
    pendingInput: null,
    pendingCommandLine: null,
  };
};
