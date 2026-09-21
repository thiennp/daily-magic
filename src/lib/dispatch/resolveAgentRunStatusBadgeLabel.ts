import { isAgentRunOutcomeCode } from "@agent-witch/shared/dispatch";

import { AGENT_RUN_SESSION_LIMIT_CHIP_LABEL } from "@/lib/dispatch/agentRunBudgetNoticeCopy.constant";
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
      return AGENT_RUN_SESSION_LIMIT_CHIP_LABEL;
    }

    return "Provider quota";
  }

  return null;
};

export const formatAgentRunStatusLabel = (
  status: AgentRunStatusValue,
): string => status.replaceAll("_", " ");
