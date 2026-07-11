import Link from "next/link";

import AgentRunStatusBadge from "@/features/reports/AgentRunStatusBadge";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

interface AgentRunCardProps {
  readonly run: EnrichedAgentRunRecord;
}

export default function AgentRunCard({ run }: AgentRunCardProps) {
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
      <Link
        href={`/reports/${run.id}`}
        className="mt-4 inline-block text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
      >
        View full report
      </Link>
    </article>
  );
}
