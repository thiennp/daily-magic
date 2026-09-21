import {
  AgentRunOutcomeCode,
  type AgentRunOutcomeCodeValue,
} from "@agent-witch/shared/dispatch";

import { AGENT_LIVE_HARD_STOP_SESSION_LIMIT_LABEL } from "@/lib/dispatch/agentRunBudgetLabels.constant";

export interface AgentRunOutcomePresentation {
  readonly title: string;
  readonly detail: string;
  readonly nextStep: string;
}

export const buildAgentRunOutcomePresentation = (
  code: AgentRunOutcomeCodeValue,
  resetHint: string | null = null,
): AgentRunOutcomePresentation => {
  if (code === AgentRunOutcomeCode.SESSION_LIMIT) {
    const resetDetail =
      resetHint !== null && resetHint.length > 0
        ? ` Your Claude session resets ${resetHint}.`
        : "";
    return {
      title: AGENT_LIVE_HARD_STOP_SESSION_LIMIT_LABEL,
      detail: `Hard stop — Claude hit its session limit on your Mac. This run cannot continue.${resetDetail}`,
      nextStep:
        "Wait for the session reset (or start a fresh Claude session on the Mac), then use Run again or Continue in a new session.",
    };
  }

  return {
    title: "Hard stop: provider quota",
    detail:
      "Hard stop — the writer reported a provider usage or rate limit. This run cannot continue.",
    nextStep:
      "Wait for the limit to reset or adjust writer API settings on your Mac, then run the task again.",
  };
};
