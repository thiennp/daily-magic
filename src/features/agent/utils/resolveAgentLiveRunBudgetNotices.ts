import {
  AGENT_LIVE_SESSION_LIMIT_PREWARN_LABEL,
  AGENT_LIVE_SOFT_ESTIMATE_LABEL,
} from "@/lib/dispatch/agentRunBudgetLabels.constant";
import type { AgentLiveWorkingEstimateProgress } from "@/features/agent/utils/resolveAgentLiveWorkingEstimateProgress";

export interface AgentLiveRunBudgetNotice {
  readonly label: string;
  readonly body: string;
  readonly tone: "soft" | "hard_prewarn";
}

export const AGENT_LIVE_SESSION_LIMIT_PREWARN_PERCENT = 85;

export const resolveAgentLiveRunBudgetNotices = (input: {
  readonly isWorking: boolean;
  readonly estimateProgress: AgentLiveWorkingEstimateProgress | null;
}): readonly AgentLiveRunBudgetNotice[] => {
  if (!input.isWorking || input.estimateProgress === null) {
    return [];
  }

  const { estimateProgress } = input;
  const notices: AgentLiveRunBudgetNotice[] = [];

  if (estimateProgress.isPastSoftEstimate) {
    notices.push({
      label: AGENT_LIVE_SOFT_ESTIMATE_LABEL,
      tone: "soft",
      body: "Past the soft time estimate (about this much). This is guidance only — your Mac may keep working.",
    });
  }

  const shouldPreWarnSessionLimit =
    estimateProgress.isExceeded ||
    estimateProgress.percent >= AGENT_LIVE_SESSION_LIMIT_PREWARN_PERCENT;

  if (shouldPreWarnSessionLimit) {
    notices.push({
      label: AGENT_LIVE_SESSION_LIMIT_PREWARN_LABEL,
      tone: "hard_prewarn",
      body: "Long runs can hit a hard Claude session limit on your Mac. If that happens, the run will stop immediately and cannot continue until the session resets.",
    });
  }

  return notices;
};
