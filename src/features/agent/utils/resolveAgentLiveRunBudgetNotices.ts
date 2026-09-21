import {
  AgentRunBudgetReasonCode,
  type AgentRunBudgetReasonCodeValue,
  AGENT_RUN_ESTIMATE_PAST_TITLE,
  AGENT_RUN_SESSION_LIMIT_APPROACHING_TITLE,
  buildAgentRunEstimatePastBody,
  buildAgentRunSessionLimitApproachingBody,
  buildAgentRunSessionLimitApproachingSecondary,
} from "@/lib/dispatch/agentRunBudgetNoticeCopy.constant";
import { formatWorkingEstimateDurationLabel } from "@/lib/dispatch/formatWorkingEstimateDurationLabel";
import type { AgentLiveWorkingEstimateProgress } from "@/features/agent/utils/resolveAgentLiveWorkingEstimateProgress";

export type AgentLiveRunBudgetNoticeSeverity = "info" | "warning";

export interface AgentLiveRunBudgetNotice {
  readonly reasonCode: AgentRunBudgetReasonCodeValue;
  readonly title: string;
  readonly body: string;
  readonly secondary?: string;
  readonly severity: AgentLiveRunBudgetNoticeSeverity;
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
  const workingEstimateLabel = formatWorkingEstimateDurationLabel(
    estimateProgress.estimateSeconds,
  );
  const notices: AgentLiveRunBudgetNotice[] = [];

  if (estimateProgress.isPastSoftEstimate) {
    notices.push({
      reasonCode: AgentRunBudgetReasonCode.ESTIMATE_PAST,
      title: AGENT_RUN_ESTIMATE_PAST_TITLE,
      severity: "info",
      body: buildAgentRunEstimatePastBody(workingEstimateLabel),
    });
  }

  const shouldPreWarnSessionLimit =
    estimateProgress.isExceeded ||
    estimateProgress.percent >= AGENT_LIVE_SESSION_LIMIT_PREWARN_PERCENT;

  if (shouldPreWarnSessionLimit) {
    notices.push({
      reasonCode: AgentRunBudgetReasonCode.SESSION_LIMIT_APPROACHING,
      title: AGENT_RUN_SESSION_LIMIT_APPROACHING_TITLE,
      severity: "warning",
      body: buildAgentRunSessionLimitApproachingBody(),
      secondary:
        buildAgentRunSessionLimitApproachingSecondary(workingEstimateLabel),
    });
  }

  return notices;
};
