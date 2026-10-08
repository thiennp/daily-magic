import type { AgentRunInputRequest } from "@/features/dispatch/utils/agentRunInputSocket";

const WAITING_SUMMARY = /^Waiting for your answer:\s*(.+)$/;

/**
 * afae8216: the question to reopen for a run, from the request this tab saw,
 * else from the host's "Waiting for your answer: …" summary. Null otherwise.
 */
export const resolveRunInputReopenRequest = (input: {
  readonly runId: string;
  readonly stored: AgentRunInputRequest | null | undefined;
  readonly reportSummary: string | null;
}): AgentRunInputRequest | null => {
  if (input.stored !== null && input.stored !== undefined) {
    return input.stored;
  }
  const match = WAITING_SUMMARY.exec((input.reportSummary ?? "").trim());
  const question = match?.[1]?.trim() ?? "";
  return question.length > 0
    ? { agentRunId: input.runId, question, partialOutput: "" }
    : null;
};
