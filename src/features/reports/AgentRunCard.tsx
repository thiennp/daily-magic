"use client";

import Link from "next/link";
import { useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import AgentRunAgainButton from "@/features/reports/AgentRunAgainButton";
import { buildAgentRunContinueHref } from "@/features/reports/utils/buildAgentRunContinueHref";
import AgentRunStatusBadge from "@/features/reports/AgentRunStatusBadge";
import { deleteAgentRunHistory } from "@/features/reports/utils/deleteAgentRunHistory";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";

interface AgentRunCardProps {
  readonly run: EnrichedAgentRunRecord;
}

export default function AgentRunCard({ run }: AgentRunCardProps) {
  const canRunAgain = run.status === AgentRunStatus.COMPLETED;
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
        <AgentRunStatusBadge status={run.status} />
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(run.createdAt).toLocaleString()}
        </p>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Requester: {run.requesterEmail} · Executor: {run.executorEmail}
      </p>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Policy: {run.dispatchPolicy}
      </p>
      <pre className="mt-3 max-h-32 overflow-auto rounded-lg bg-gray-50 p-3 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {run.prompt}
      </pre>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Link
          href={`/reports/${run.id}`}
          className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          View full report
        </Link>
        {canRunAgain ? (
          <>
            <Link
              href={buildAgentRunContinueHref({ run })}
              className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
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
          className="text-sm font-medium text-gray-500 transition hover:text-error-600 disabled:opacity-50 dark:text-gray-400 dark:hover:text-error-400"
        >
          {isDeleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </AppPanel>
  );
}
