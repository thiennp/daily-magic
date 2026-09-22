import type { AgentLiveRunOutcomeKind } from "@/features/agent/utils/agentLiveRunOutcomeKind.type";
import { AGENT_RUN_HONESTY_CHIP_CHROME } from "@/lib/dispatch/agentRunHonestyChipChrome.constant";

const AGENT_LIVE_RUN_OUTCOME_CHIP_CHROME_CLASS: Record<
  (typeof AGENT_RUN_HONESTY_CHIP_CHROME)[AgentLiveRunOutcomeKind],
  string
> = {
  progress:
    "bg-brand-100 text-brand-900 dark:bg-brand-950/40 dark:text-brand-100",
  attention: "bg-sky-100 text-sky-950 dark:bg-sky-950/40 dark:text-sky-100",
  success:
    "bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-100",
  warning:
    "bg-amber-100 text-amber-950 dark:bg-amber-950/40 dark:text-amber-100",
  error: "bg-rose-100 text-rose-950 dark:bg-rose-950/40 dark:text-rose-100",
  stop: "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100",
};

export const AGENT_LIVE_RUN_OUTCOME_CHIP_CLASS: Record<
  AgentLiveRunOutcomeKind,
  string
> = {
  connecting:
    AGENT_LIVE_RUN_OUTCOME_CHIP_CHROME_CLASS[
      AGENT_RUN_HONESTY_CHIP_CHROME.connecting
    ],
  running:
    AGENT_LIVE_RUN_OUTCOME_CHIP_CHROME_CLASS[
      AGENT_RUN_HONESTY_CHIP_CHROME.running
    ],
  waiting_you:
    AGENT_LIVE_RUN_OUTCOME_CHIP_CHROME_CLASS[
      AGENT_RUN_HONESTY_CHIP_CHROME.waiting_you
    ],
  passed:
    AGENT_LIVE_RUN_OUTCOME_CHIP_CHROME_CLASS[
      AGENT_RUN_HONESTY_CHIP_CHROME.passed
    ],
  degraded:
    AGENT_LIVE_RUN_OUTCOME_CHIP_CHROME_CLASS[
      AGENT_RUN_HONESTY_CHIP_CHROME.degraded
    ],
  failed:
    AGENT_LIVE_RUN_OUTCOME_CHIP_CHROME_CLASS[
      AGENT_RUN_HONESTY_CHIP_CHROME.failed
    ],
  stopped:
    AGENT_LIVE_RUN_OUTCOME_CHIP_CHROME_CLASS[
      AGENT_RUN_HONESTY_CHIP_CHROME.stopped
    ],
  timed_out:
    AGENT_LIVE_RUN_OUTCOME_CHIP_CHROME_CLASS[
      AGENT_RUN_HONESTY_CHIP_CHROME.timed_out
    ],
};

export const resolveAgentLiveRunOutcomeChipClassName = (
  kind: AgentLiveRunOutcomeKind,
): string => AGENT_LIVE_RUN_OUTCOME_CHIP_CLASS[kind];
