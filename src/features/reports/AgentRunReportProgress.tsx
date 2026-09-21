"use client";

import { formatAgentRunReportSummaryLine } from "@/features/reports/utils/formatAgentRunReportSummaryLine";

interface AgentRunReportProgressProps {
  readonly reportSummary: string | null | undefined;
  readonly reportStatus?: string | null;
}

export default function AgentRunReportProgress({
  reportSummary,
  reportStatus,
}: AgentRunReportProgressProps) {
  const summaryLine = formatAgentRunReportSummaryLine(reportSummary);
  const statusLabel =
    typeof reportStatus === "string" && reportStatus.trim().length > 0
      ? reportStatus.trim().replaceAll("_", " ")
      : null;

  if (summaryLine === null && statusLabel === null) {
    return null;
  }

  return (
    <div className="mt-4 rounded-lg border border-brand-200/60 bg-brand-50/40 px-3 py-2.5 dark:border-brand-500/30 dark:bg-brand-500/5">
      <p className="text-xs font-medium uppercase tracking-wide text-brand-700 dark:text-brand-300">
        Run status
      </p>
      {summaryLine !== null ? (
        <p className="mt-1 text-sm text-gray-800 dark:text-white/90">
          {summaryLine}
        </p>
      ) : null}
      {statusLabel !== null ? (
        <p className="mt-0.5 text-xs capitalize text-gray-500 dark:text-gray-400">
          Report: {statusLabel}
        </p>
      ) : null}
    </div>
  );
}
