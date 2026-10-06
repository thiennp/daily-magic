import { AGENT_RUN_TIMED_OUT_COPY } from "@/features/reports/agentRunTimedOutCopy.constant";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

/**
 * Pure: badge text for a run status. Expired approvals read "Timed out"
 * (sentence case, shown as-is); other statuses keep the raw words.
 */
export const formatAgentRunStatusLabel = (
  status: AgentRunStatusValue,
): { readonly label: string; readonly isFinalCase: boolean } =>
  status === AgentRunStatus.EXPIRED
    ? { label: AGENT_RUN_TIMED_OUT_COPY.statusLabel, isFinalCase: true }
    : { label: status.replaceAll("_", " "), isFinalCase: false };
