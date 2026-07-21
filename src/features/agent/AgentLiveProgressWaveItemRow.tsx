"use client";

import { formatAgentLiveWorkingEstimateLabel } from "@/features/agent/utils/formatAgentLiveWorkingEstimateLabel";
import type { AgentLiveWavePlanViewItem } from "@/features/agent/utils/agentLiveWavePlan.type";
import { resolveAgentLiveWorkingEstimateProgress } from "@/features/agent/utils/resolveAgentLiveWorkingEstimateProgress";

interface AgentLiveProgressWaveItemRowProps {
  readonly item: AgentLiveWavePlanViewItem;
  readonly workedMs: number | null;
}

const statusLabel = (status: AgentLiveWavePlanViewItem["status"]): string => {
  if (status === "done") {
    return "Done";
  }
  if (status === "working") {
    return "Working";
  }
  return "Pending";
};

const rowClassName = (item: AgentLiveWavePlanViewItem): string => {
  const indent =
    item.kind === "agent"
      ? "ml-4 border-gray-100 dark:border-gray-800"
      : "border-gray-200 dark:border-gray-700";
  const tone =
    item.status === "working"
      ? "bg-brand-50/50 dark:bg-brand-950/20"
      : "bg-white dark:bg-transparent";
  return `rounded-lg border px-3 py-2 ${indent} ${tone}`;
};

export default function AgentLiveProgressWaveItemRow({
  item,
  workedMs,
}: AgentLiveProgressWaveItemRowProps) {
  const isAgent = item.kind === "agent";
  const estimateLabel = formatAgentLiveWorkingEstimateLabel(
    item.estimateSeconds,
  );
  const progress =
    item.status === "working" && workedMs !== null
      ? resolveAgentLiveWorkingEstimateProgress({
          estimateSeconds: item.estimateSeconds,
          workedMs,
        })
      : null;

  return (
    <li className={rowClassName(item)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white/90">
            {isAgent ? "Agent" : "Wave"} {item.id}: {item.title}
          </p>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            {statusLabel(item.status)} · {estimateLabel}
          </p>
        </div>
        {item.status === "done" ? (
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            ✓
          </span>
        ) : null}
      </div>
      {progress !== null ? (
        <div className="mt-2" aria-hidden="true">
          <div className="h-1 overflow-hidden rounded-full bg-brand-100 dark:bg-brand-950/50">
            <div
              className="h-full rounded-full bg-brand-500 transition-[width] duration-500"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
          <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
            {progress.percent}% of estimate
          </p>
        </div>
      ) : null}
    </li>
  );
}
