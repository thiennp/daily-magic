import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import {
  AGENT_LIVE_BASH_PROMPT,
  appendAgentLiveTerminalPrompt,
  buildAgentLiveTerminalCommandEntry,
  buildAgentLiveTerminalIdleLine,
} from "@/features/agent/utils/agentLiveTerminalPrompt.constant";
import { stripNextActionsFromTerminalOutput } from "@/features/agent/utils/splitAgentLiveTerminalOutput";

export const buildAgentLiveTerminalDisplay = (input: {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly pendingCommandLine?: string | null;
}): string => {
  const visibleOutput = stripNextActionsFromTerminalOutput(input.output);

  if (visibleOutput.length === 0) {
    const pendingCommandLine = input.pendingCommandLine?.trim() ?? "";
    if (
      pendingCommandLine.length > 0 &&
      (input.status === "starting" ||
        input.status === "waiting_approval" ||
        input.status === "streaming")
    ) {
      return buildAgentLiveTerminalCommandEntry(pendingCommandLine);
    }

    return buildAgentLiveTerminalIdleLine();
  }

  if (
    input.status === "finished" &&
    !visibleOutput.endsWith(AGENT_LIVE_BASH_PROMPT)
  ) {
    return appendAgentLiveTerminalPrompt(visibleOutput);
  }

  return visibleOutput;
};

export const shouldShowAgentLiveTerminalCursor = (
  status: AgentLiveTerminalStatus,
): boolean => status === "idle" || status === "finished" || status === "error";

export const shouldShowAgentLiveTerminalLoadingIndicator = (
  status: AgentLiveTerminalStatus,
): boolean =>
  status === "starting" ||
  status === "waiting_approval" ||
  status === "streaming";

export const buildAgentLiveTerminalLoadingLine = (dotCount: number): string =>
  ".".repeat(Math.max(1, Math.min(dotCount, 3)));
