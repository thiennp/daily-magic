import { isAgentRunOutcomeCode } from "@agent-witch/shared/dispatch";

import { AGENT_LIVE_HARD_STOP_SESSION_LIMIT_LABEL } from "@/lib/dispatch/agentRunBudgetLabels.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

export const resolveAgentRunStatusBadgeLabel = (
  run: Pick<AgentRunRecord, "status" | "resultOutcomeCode">,
): string | null => {
  if (
    run.status === AgentRunStatus.FAILED &&
    run.resultOutcomeCode !== null &&
    isAgentRunOutcomeCode(run.resultOutcomeCode)
  ) {
    if (run.resultOutcomeCode === "session_limit") {
      return AGENT_LIVE_HARD_STOP_SESSION_LIMIT_LABEL;
    }

    return "Hard stop: provider quota";
  }

  return null;
};

export const formatAgentRunStatusLabel = (
  status: AgentRunStatusValue,
): string => status.replaceAll("_", " ");
