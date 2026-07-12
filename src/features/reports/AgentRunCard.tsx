"use client";

import Link from "next/link";

import { useAppPath } from "@/features/demo/DemoPreviewContext";
import AgentRunAgainButton from "@/features/reports/AgentRunAgainButton";
import AgentRunStatusBadge from "@/features/reports/AgentRunStatusBadge";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";

interface AgentRunCardProps {
  readonly run: EnrichedAgentRunRecord;
}

export default function AgentRunCard({ run }: AgentRunCardProps) {
  const appPath = useAppPath();
  const canRunAgain = run.status === AgentRunStatus.COMPLETED;

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
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
      <pre className="mt-3 max-h-32 overflow-auto rounded-lg bg-gray-50 p-3 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-300">
        {run.prompt}
      </pre>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Link
          href={appPath(`/reports/${run.id}`)}
          className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          View full report
        </Link>
        {canRunAgain ? <AgentRunAgainButton prompt={run.prompt} /> : null}
      </div>
    </article>
  );
}
