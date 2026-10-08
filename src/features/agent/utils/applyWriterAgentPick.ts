import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

/**
 * 37874fdc: an open session's writer used to override the pick. A different
 * writer ends that session first, so the pick sticks and the next task starts
 * fresh on it; the same writer keeps the session.
 */
export const applyWriterAgentPick = (input: {
  readonly value: HarnessWriterAgent;
  readonly sessionWriterAgent: HarnessWriterAgent | null;
  readonly finishSession: () => void;
  readonly setWriterAgent: (value: HarnessWriterAgent) => void;
}): void => {
  if (
    input.sessionWriterAgent !== null &&
    input.sessionWriterAgent !== input.value
  ) {
    input.finishSession();
  }
  input.setWriterAgent(input.value);
};
