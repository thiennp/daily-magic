import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

export const canSubmitFeedbackForRunStatus = (
  status: AgentRunStatusValue,
): boolean =>
  status === AgentRunStatus.COMPLETED || status === AgentRunStatus.FAILED;
