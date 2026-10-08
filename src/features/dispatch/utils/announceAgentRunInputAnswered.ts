import {
  getAgentRunLocalCache,
  upsertAgentRunLocalCache,
} from "@/features/reports/agentRunLocalCache";

export const AGENT_WITCH_RUN_INPUT_ANSWERED_EVENT =
  "agent-witch:run-input-answered";

const WAITING_SUMMARY = /^Waiting for your answer\b/i;

/**
 * a6053d1c: "Waiting for your answer" lingered 30–40 s after Send from the
 * floater's question modal. The answer is sent, so drop the cached waiting
 * summary and tell the live panel to clear its pending question now.
 */
export const announceAgentRunInputAnswered = (agentRunId: string): void => {
  if (typeof window === "undefined" || typeof CustomEvent === "undefined") {
    return;
  }
  const cached = getAgentRunLocalCache(agentRunId);
  if (cached !== null && WAITING_SUMMARY.test(cached.reportSummary ?? "")) {
    upsertAgentRunLocalCache({ ...cached, reportSummary: null });
  }
  window.dispatchEvent(
    new CustomEvent(AGENT_WITCH_RUN_INPUT_ANSWERED_EVENT, {
      detail: { agentRunId },
    }),
  );
};
