import type { AgentLiveRunOutcomeKind } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";

export const AGENT_LIVE_RUN_OUTCOME_CHIP_CLASS: Record<
  AgentLiveRunOutcomeKind,
  string
> = {
  passed:
    "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100",
  degraded:
    "bg-amber-100 text-amber-950 dark:bg-amber-950/40 dark:text-amber-100",
  failed: "bg-rose-100 text-rose-950 dark:bg-rose-950/40 dark:text-rose-100",
  waiting_you:
    "bg-brand-100 text-brand-900 dark:bg-brand-950/40 dark:text-brand-100",
  running:
    "bg-brand-100 text-brand-900 dark:bg-brand-950/40 dark:text-brand-100",
  stopped: "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
  timed_out:
    "bg-orange-100 text-orange-950 dark:bg-orange-950/40 dark:text-orange-100",
};

export const resolveAgentLiveRunOutcomeChipClassName = (
  kind: AgentLiveRunOutcomeKind,
): string => AGENT_LIVE_RUN_OUTCOME_CHIP_CLASS[kind];
