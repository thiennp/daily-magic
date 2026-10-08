import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";

/**
 * d7110873: once a run panel is on screen it already shows the outcome
 * (Waiting on you / Why it failed) in full, so the top-of-dialog red line,
 * often the 120-char-capped server copy ending in "…", would be a duplicate.
 */
export const resolveStatusSectionSessionError = (input: {
  readonly sessionErrorMessage: string | null;
  readonly liveTerminalRunId: string | null;
  readonly liveTerminalStatus: AgentLiveTerminalStatus;
}): string | null => {
  const hasRunPanel =
    input.liveTerminalRunId !== null || input.liveTerminalStatus !== "idle";
  return hasRunPanel ? null : input.sessionErrorMessage;
};
