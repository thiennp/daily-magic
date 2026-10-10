import type { AgentLiveTerminalState } from "@/features/agent/utils/agentLiveTerminalState.type";
import { getPendingInputForRun } from "@/features/dispatch/public-api/presentation";
import type { AgentRunInputRequest } from "@/features/dispatch/public-api/types";
import { isAgentRunQuestionAlreadyAnswered } from "@/features/agent/utils/isAgentRunQuestionAlreadyAnswered";
import { resolveRunInputReopenRequest } from "@/features/dispatch/public-api/presentation";

/**
 * afae8216: a re-attached floater for a run that is waiting on the user
 * shows "Waiting on you" and the question, not "In progress" plus Steer.
 * Ended runs never get a question seeded.
 */
export const seedRestoredAgentLivePendingInput = (input: {
  readonly runId: string;
  readonly status: AgentLiveTerminalState["status"];
  readonly reportSummary: string | null;
  /** 2a17ba21: restored output; an ask answered in it is not re-seeded. */
  readonly output?: string;
}): AgentRunInputRequest | null => {
  if (input.status !== "streaming" && input.status !== "starting") {
    return null;
  }
  const request = resolveRunInputReopenRequest({
    runId: input.runId,
    stored: getPendingInputForRun(input.runId),
    reportSummary: input.reportSummary,
  });
  return request !== null &&
    isAgentRunQuestionAlreadyAnswered(input.output ?? "", request.question)
    ? null
    : request;
};
