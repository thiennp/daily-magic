import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const resolveIsWriterSessionContinuation = (input: {
  readonly continueFromQuery: boolean;
  readonly sessionWriterAgent: HarnessWriterAgent | null;
  readonly hasSentUserPrompt: boolean;
  readonly threadAlreadyStarted: boolean;
}): boolean => {
  if (input.continueFromQuery) {
    return true;
  }
  if (input.sessionWriterAgent === null) {
    return false;
  }
  return input.hasSentUserPrompt || input.threadAlreadyStarted;
};
