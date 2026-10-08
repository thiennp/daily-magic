import type { AgentLiveRunOutcomeKind } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";

/**
 * 73820cb1 (Testi run 4 @298): a Failed or Timed-out floater had no way to
 * start the same task again. Retry shows only once the run has ended that
 * way (not on Success, a user Stop, or while it still runs).
 */
export const shouldShowAgentLiveRetry = (input: {
  readonly outcomeKind: AgentLiveRunOutcomeKind | null | undefined;
  readonly isWorking: boolean;
  readonly isStopping: boolean;
}): boolean =>
  !input.isWorking &&
  !input.isStopping &&
  (input.outcomeKind === "failed" || input.outcomeKind === "timed_out");
