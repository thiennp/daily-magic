import {
  AgentRunOutcomeCode,
  type AgentRunOutcomeCodeValue,
} from "@agent-witch/shared/dispatch";

import {
  AGENT_RUN_SESSION_LIMIT_HIT_BODY,
  AGENT_RUN_SESSION_LIMIT_HIT_TITLE,
} from "@/lib/dispatch/agentRunBudgetNoticeCopy.constant";

export interface AgentRunOutcomePresentation {
  readonly reasonCode: "session_limit_hit" | "provider_quota_hit";
  readonly title: string;
  readonly body: string;
}

export const buildAgentRunOutcomePresentation = (
  code: AgentRunOutcomeCodeValue,
): AgentRunOutcomePresentation => {
  if (code === AgentRunOutcomeCode.SESSION_LIMIT) {
    return {
      reasonCode: "session_limit_hit",
      title: AGENT_RUN_SESSION_LIMIT_HIT_TITLE,
      body: AGENT_RUN_SESSION_LIMIT_HIT_BODY,
    };
  }

  return {
    reasonCode: "provider_quota_hit",
    title: "Provider quota reached",
    body: "This run stopped at a provider usage limit. That is a hard stop — not a missed estimate.",
  };
};
