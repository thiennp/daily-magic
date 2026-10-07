"use client";

import Link from "next/link";

import Button from "@/components/ui/button/Button";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import AgentRunStatusBadge from "@/features/reports/AgentRunStatusBadge";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

interface GroupTeamActivityRunsListProps {
  readonly runs: readonly EnrichedAgentRunRecord[];
  readonly isLoading: boolean;
  readonly hasError: boolean;
  readonly onRetry: () => void;
}

export default function GroupTeamActivityRunsList({
  runs,
  isLoading,
  hasError,
  onRetry,
}: GroupTeamActivityRunsListProps) {
  if (isLoading) {
    return (
      <p className="mt-4 text-sm text-awc-fg-muted">
        {C.runsLoading}
      </p>
    );
  }

  if (hasError) {
    return (
      <div className="mt-4 space-y-3">
        <p className="text-sm text-error-600 dark:text-error-400">
          {C.runsError}
        </p>
        <Button size="sm" onClick={onRetry}>
          {C.tryAgain}
        </Button>
      </div>
    );
  }

  if (runs.length === 0) {
    return (
      <div className="mt-4">
        <p className="text-sm font-medium text-awc-fg">
          {C.runsEmptyTitle}
        </p>
        <p className="mt-1 text-sm text-awc-fg-muted">
          {C.runsEmptyBody}
        </p>
      </div>
    );
  }

  return (
    <ul className="mt-4 space-y-3">
      {runs.map((run) => (
        <li
          key={run.id}
          className="rounded-lg border border-awc-border px-4 py-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <AgentRunStatusBadge status={run.status} />
            <p className="text-xs text-awc-fg-muted">
              {new Date(run.createdAt).toLocaleString()}
            </p>
          </div>
          <p className="mt-2 text-sm text-awc-fg-muted">
            {run.requesterEmail} → {run.executorEmail}
          </p>
          <Link
            href={`/reports/${run.id}`}
            className="mt-2 inline-block text-sm font-medium text-brand-600 hover:text-awc-blue-700 dark:text-brand-400"
          >
            View report
          </Link>
        </li>
      ))}
    </ul>
  );
}
