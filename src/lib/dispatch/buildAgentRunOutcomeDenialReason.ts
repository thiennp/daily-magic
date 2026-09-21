import { AgentRunOutcomeCode } from "@agent-witch/shared/dispatch";
import type { ResolvedAgentRunOutcome } from "@agent-witch/shared/dispatch";

import { AGENT_RUN_SESSION_LIMIT_HIT_BODY } from "@/lib/dispatch/agentRunBudgetNoticeCopy.constant";

export const buildAgentRunOutcomeDenialReason = (
  outcome: ResolvedAgentRunOutcome,
): string => {
  if (outcome.code === AgentRunOutcomeCode.SESSION_LIMIT) {
    return AGENT_RUN_SESSION_LIMIT_HIT_BODY;
  }

  return "This run stopped at a provider usage limit. That is a hard stop — not a missed estimate.";
};
