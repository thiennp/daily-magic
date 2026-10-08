import { parseAgentLiveProgressCheckpointExchanges } from "@/features/agent/utils/parseAgentLiveProgressCheckpointExchanges";

const COMPARE_CHARS = 40;

const normalizeQuestion = (text: string): string =>
  text
    .replace(/^(?:waiting for your answer|agent asked)\s*:\s*/i, "")
    .replace(/(?:\.\.\.|…)\s*$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/**
 * 2a17ba21 (4fe3657c follow-up A): an ask the user already answered in this
 * run (a "✓ Your answer" exchange is in the output) must not open again when
 * a reconnect, a late heartbeat or a cached "Waiting for your answer" replays
 * it. Matches on the start of the question, so a capped copy still counts.
 */
export const isAgentRunQuestionAlreadyAnswered = (
  output: string,
  question: string,
): boolean => {
  const asked = normalizeQuestion(question);
  if (asked.length === 0) {
    return false;
  }
  return parseAgentLiveProgressCheckpointExchanges(output).some((exchange) => {
    const answered = normalizeQuestion(exchange.question);
    const length = Math.min(COMPARE_CHARS, asked.length, answered.length);
    return length > 0 && asked.slice(0, length) === answered.slice(0, length);
  });
};
