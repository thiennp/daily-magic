import { AgentRunOutcomeCode } from "@agent-witch/shared/dispatch";
import type { ResolvedAgentRunOutcome } from "@agent-witch/shared/dispatch";

import { AGENT_LIVE_HARD_STOP_SESSION_LIMIT_LABEL } from "@/lib/dispatch/agentRunBudgetLabels.constant";

export const buildAgentRunOutcomeDenialReason = (
  outcome: ResolvedAgentRunOutcome,
): string => {
  if (outcome.code === AgentRunOutcomeCode.SESSION_LIMIT) {
    const resetSuffix =
      outcome.resetHint !== null && outcome.resetHint.length > 0
        ? ` Session resets ${outcome.resetHint}.`
        : "";
    return `${AGENT_LIVE_HARD_STOP_SESSION_LIMIT_LABEL}. Stopped reason: Claude session limit on your Mac.${resetSuffix} This run cannot continue until the session resets.`;
  }

  return "Hard stop: provider quota. Stopped reason: provider usage or rate limit. This run cannot continue until the limit resets.";
};
