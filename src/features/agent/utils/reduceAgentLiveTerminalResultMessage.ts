import { resolveAgentRunOutcomeFromWriterOutput } from "@agent-witch/shared/dispatch";

import { formatHardStopOutcomeTerminalBlock } from "@/lib/dispatch/formatHardStopOutcomeTerminalBlock";
import { isAgentRunUserStopped } from "@/lib/dispatch/isAgentRunUserStopped";

import type { AgentLiveTerminalState } from "./agentLiveTerminalState.type";
import { appendAgentLiveTerminalPrompt } from "./agentLiveTerminalPrompt.constant";
import { mergeTerminalResultOutput } from "./agentLiveTerminalMessageUtils";

/**
 * `command.claude.result` for the active run. 74408099 (Testi recheck @300):
 * agy died in 5 s on a 429 quota with exit 3, and the floater still said
 * Success, because only known output phrases made it an error. A non-zero
 * exit code (other than a user stop) now ends the floater in error too.
 */
export const reduceAgentLiveTerminalResultMessage = (
  state: AgentLiveTerminalState,
  payload: Record<string, unknown>,
): AgentLiveTerminalState => {
  const resultOutput = typeof payload.output === "string" ? payload.output : "";
  const mergedOutput = appendAgentLiveTerminalPrompt(
    mergeTerminalResultOutput(state.output, resultOutput),
  );
  const outcome = resolveAgentRunOutcomeFromWriterOutput(resultOutput);
  const ended = {
    ...state,
    pendingInput: null,
    pendingCommandLine: null,
  };

  if (outcome !== null) {
    const banner = formatHardStopOutcomeTerminalBlock(outcome);
    return {
      ...ended,
      output: `${mergedOutput}\n${banner}\n`,
      status: "error",
    };
  }

  const exitCode =
    typeof payload.exitCode === "number" ? payload.exitCode : null;
  const failedExit =
    exitCode !== null &&
    exitCode !== 0 &&
    !isAgentRunUserStopped(mergedOutput, exitCode);

  return {
    ...ended,
    output: mergedOutput,
    status: failedExit ? "error" : "finished",
  };
};
