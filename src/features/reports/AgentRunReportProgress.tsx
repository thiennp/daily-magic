"use client";

import { resolveAgentRunReportProgressView } from "@/features/reports/utils/resolveAgentRunReportProgressView";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

interface AgentRunReportProgressProps {
  readonly run: Pick<
    EnrichedAgentRunRecord,
    | "status"
    | "reportSummary"
    | "reportStatus"
    | "denialReason"
    | "resultOutput"
    | "resultExitCode"
  >;
}

export default function AgentRunReportProgress({
  run,
}: AgentRunReportProgressProps) {
  const { summaryLine, statusLabel, reasonLine } =
    resolveAgentRunReportProgressView({ ...run, runStatus: run.status });

  if (summaryLine === null && statusLabel === null && reasonLine === null) {
    return null;
  }

  return (
    <div className="mt-4 rounded-lg border border-brand-200/60 bg-brand-50/40 px-3 py-2.5 dark:border-brand-500/30 dark:bg-brand-500/5">
      <p className="text-xs font-medium uppercase tracking-wide text-brand-700 dark:text-brand-300">
        Run status
      </p>
      {summaryLine !== null ? (
        <p className="mt-1 text-sm text-awc-fg dark:text-white/90">
          {summaryLine}
        </p>
      ) : null}
      {reasonLine !== null ? (
        <p className="mt-1 text-sm text-awc-fg dark:text-white/90">
          {reasonLine}
        </p>
      ) : null}
      {statusLabel !== null ? (
        <p className="mt-0.5 text-xs capitalize text-awc-fg-muted dark:text-gray-400">
          Report: {statusLabel}
        </p>
      ) : null}
    </div>
  );
}
