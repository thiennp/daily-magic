import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { getPendingInputForRun } from "@/features/dispatch/agentRunInputStore";
import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";
import { resolveRunInputReopenRequest } from "@/features/dispatch/utils/resolveRunInputReopenRequest";

/**
 * afae8216: a re-attached floater for a run that is waiting on the user
 * shows "Waiting on you" and the question, not "In progress" plus Steer.
 * Ended runs never get a question seeded.
 */
export const seedRestoredAgentLivePendingInput = (input: {
  readonly runId: string;
  readonly status: AgentLiveTerminalState["status"];
  readonly reportSummary: string | null;
}): AgentRunInputRequest | null =>
  input.status === "streaming" || input.status === "starting"
    ? resolveRunInputReopenRequest({
        runId: input.runId,
        stored: getPendingInputForRun(input.runId),
        reportSummary: input.reportSummary,
      })
    : null;
