import {
  AgentRunOutcomeCode,
  type AgentRunOutcomeCodeValue,
} from "@agent-witch/shared/dispatch";

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
      title: "Session limit reached",
      detail: `The writer stopped because Claude hit its session cap on your Mac.${resetDetail}`,
      nextStep:
        "Wait for the reset (or start a fresh Claude session on the Mac), then use Run again or Continue to pick up where you left off.",
    };
  }

  return {
    title: "Provider quota reached",
    detail:
      "The writer stopped because the AI provider reported a usage or rate limit.",
    nextStep:
      "Wait for the limit to reset or adjust writer API settings on your Mac, then run the task again.",
  };
};
