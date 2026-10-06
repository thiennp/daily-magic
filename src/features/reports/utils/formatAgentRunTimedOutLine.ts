import { AGENT_RUN_TIMED_OUT_COPY as C } from "@/features/reports/agentRunTimedOutCopy.constant";
import { DISPATCH_APPROVAL_TTL_MS } from "@/lib/dispatch/dispatchApprovalTtl.constant";

/** Pure: "No one approved this run in 15 minutes." from the approval TTL. */
export const formatAgentRunTimedOutLine = (
  ttlMs: number = DISPATCH_APPROVAL_TTL_MS,
): string => C.line.replace("{minutes}", String(Math.round(ttlMs / 60_000)));
