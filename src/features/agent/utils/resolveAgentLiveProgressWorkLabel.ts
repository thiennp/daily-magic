import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { AGENT_LIVE_PROGRESS_ACTIVITY_PATTERNS } from "@/features/agent/utils/agentLiveProgressPatterns.constant";

export const resolveAgentLiveProgressActivityLabel = (
  cleanedOutput: string,
): string => {
  for (const activity of AGENT_LIVE_PROGRESS_ACTIVITY_PATTERNS) {
    if (activity.pattern.test(cleanedOutput)) {
      return activity.label;
    }
  }
  return "Working on your request";
};

export const hasAgentLiveProgressStartedUserTask = (input: {
  readonly cleanedOutput: string;
  readonly pendingCommandLine?: string | null;
  readonly status: AgentLiveTerminalStatus;
}): boolean => {
  if ((input.pendingCommandLine ?? "").trim().length > 0) {
    return true;
  }
  if (
    input.status === "streaming" ||
    input.status === "waiting_approval" ||
    input.status === "finished"
  ) {
    return true;
  }
  return input.cleanedOutput.length > 0;
};

export const resolveAgentLiveProgressFallbackWorkLabel = (input: {
  readonly needsInput: boolean;
  readonly status: AgentLiveTerminalStatus;
  readonly started: boolean;
  readonly isFinished: boolean;
  readonly cleaned: string;
}): string => {
  if (input.needsInput) {
    return "Waiting for your answer";
  }
  if (input.status === "waiting_approval") {
    return "Waiting for your approval";
  }
  if (input.started && !input.isFinished) {
    return resolveAgentLiveProgressActivityLabel(input.cleaned);
  }
  return "Working on your request";
};
