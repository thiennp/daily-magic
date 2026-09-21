import { AgentRunOutcomeCode } from "@agent-witch/shared/dispatch";
import type { ResolvedAgentRunOutcome } from "@agent-witch/shared/dispatch";

export const buildAgentRunOutcomeDenialReason = (
  outcome: ResolvedAgentRunOutcome,
): string => {
  if (outcome.code === AgentRunOutcomeCode.SESSION_LIMIT) {
    const resetSuffix =
      outcome.resetHint !== null && outcome.resetHint.length > 0
        ? ` Session resets ${outcome.resetHint}.`
        : "";
    return `Claude session limit reached on your Mac.${resetSuffix} Wait for the reset, then run the task again or continue in a new session.`;
  }

  return "The writer hit a provider usage or quota limit. Wait for the limit to reset or switch writer settings, then try again.";
};
