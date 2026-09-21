"use client";

import { formatAgentLiveWorkingEstimateLabel } from "@/features/agent/utils/formatAgentLiveWorkingEstimateLabel";

interface AgentLiveProgressEstimateBarProps {
  readonly estimateSeconds: number;
  readonly percent: number;
  readonly showEstimateOkMeta?: boolean;
}

export default function AgentLiveProgressEstimateBar({
  estimateSeconds,
  percent,
  showEstimateOkMeta = true,
}: AgentLiveProgressEstimateBarProps) {
  const label = showEstimateOkMeta
    ? formatAgentLiveWorkingEstimateLabel(estimateSeconds)
    : null;

  return (
    <div className="mt-3" role="status" aria-live="polite">
      <div className="flex items-center justify-between gap-3 text-xs text-gray-600 dark:text-gray-300">
        <span>{label ?? "Progress"}</span>
        <span>{percent}%</span>
      </div>
      <div
        className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-brand-100 dark:bg-brand-950/50"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-brand-500 transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
