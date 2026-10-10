"use client";

import Link from "next/link";
import { useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import AgentRunAgainButton from "@/features/reports/AgentRunAgainButton";
import AgentRunEstimateComparison from "@/features/reports/AgentRunEstimateComparison";
import { buildAgentRunContinueHref } from "@/features/reports/utils/public-api/presentation";
import AgentRunStatusBadge from "@/features/reports/AgentRunStatusBadge";
import { formatAgentRunReportSummaryLine } from "@/features/reports/utils/public-api/presentation";
import { deleteAgentRunHistory } from "@/features/reports/utils/public-api/presentation";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { resolveAgentRunHistoryOutcomeBadge } from "@/features/reports/utils/public-api/presentation";

interface AgentRunCardProps {
  readonly run: EnrichedAgentRunRecord;
}

export default function AgentRunCard({ run }: AgentRunCardProps) {
  const canRunAgain = run.status === AgentRunStatus.COMPLETED;
  const reportSummaryLine = formatAgentRunReportSummaryLine(run.reportSummary);
  const outcomeBadge = resolveAgentRunHistoryOutcomeBadge(run);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (): Promise<void> => {
    if (isDeleting) {
      return;
    }
    setIsDeleting(true);
    try {
      await deleteAgentRunHistory(run.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AppPanel as="article" padding="compact">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <AgentRunStatusBadge
          status={run.status}
          labelOverride={outcomeBadge.label}
          classNameOverride={outcomeBadge.className}
        />
        <p className="text-xs text-awc-fg-muted dark:text-gray-400">
          {new Date(run.createdAt).toLocaleString()}
        </p>
      </div>
      <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-400">
        Requester: {run.requesterEmail} · Executor: {run.executorEmail}
      </p>
      <p className="mt-1 text-sm text-awc-fg-muted dark:text-gray-400">
        Policy: {run.dispatchPolicy}
      </p>
      {reportSummaryLine !== null ? (
        <p className="mt-2 text-sm text-awc-fg dark:text-white/90">
          {reportSummaryLine}
        </p>
      ) : null}
      <AgentRunEstimateComparison
        estimateSeconds={run.estimateSeconds}
        actualSeconds={run.actualSeconds}
      />
      <pre className="mt-3 max-h-32 overflow-auto rounded-lg bg-awc-surface-2 p-3 text-xs text-awc-fg dark:bg-gray-800 dark:text-gray-300">
        {run.prompt}
      </pre>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Link
          href={`/reports/${run.id}`}
          className="text-sm font-medium text-brand-600 hover:text-awc-blue-700 dark:text-brand-400"
        >
          View full report
        </Link>
        {canRunAgain ? (
          <>
            <Link
              href={buildAgentRunContinueHref({ run })}
              className="text-sm font-medium text-brand-600 hover:text-awc-blue-700 dark:text-brand-400"
            >
              Continue
            </Link>
            <AgentRunAgainButton prompt={run.prompt} />
          </>
        ) : null}
        <button
          type="button"
          disabled={isDeleting}
          onClick={() => {
            void handleDelete();
          }}
          className="text-sm font-medium text-awc-fg-muted transition hover:text-error-600 disabled:opacity-50 dark:text-gray-400 dark:hover:text-error-400"
        >
          {isDeleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </AppPanel>
  );
}
