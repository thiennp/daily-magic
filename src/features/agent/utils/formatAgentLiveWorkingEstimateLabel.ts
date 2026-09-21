import { buildAgentRunEstimateOkMeta } from "@/lib/dispatch/agentRunBudgetNoticeCopy.constant";
import { formatWorkingEstimateDurationLabel } from "@/lib/dispatch/formatWorkingEstimateDurationLabel";

/** Quiet meta while under WORKING_ESTIMATE (`estimate_ok`). */
export const formatAgentLiveWorkingEstimateLabel = (
  estimateSeconds: number,
): string =>
  buildAgentRunEstimateOkMeta(
    formatWorkingEstimateDurationLabel(estimateSeconds),
  );
