"use client";

import Link from "next/link";

import Button from "@/components/ui/button/Button";
import GroupTeamActivityRunItem from "@/features/admin/components/GroupTeamActivityRunItem";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

interface GroupTeamActivityRunsListProps {
  readonly runs: readonly EnrichedAgentRunRecord[];
  readonly isLoading: boolean;
  readonly hasError: boolean;
  readonly onRetry: () => void;
}

const SKELETON_ROWS = [0, 1, 2, 3] as const;

export default function GroupTeamActivityRunsList({
  runs,
  isLoading,
  hasError,
  onRetry,
}: GroupTeamActivityRunsListProps) {
  if (isLoading) {
    return (
      <div role="status" aria-live="polite" className="mt-4 space-y-3">
        <span className="sr-only">{C.runsLoading}</span>
        {SKELETON_ROWS.map((row) => (
          <div
            key={row}
            aria-hidden="true"
            className="h-12 animate-pulse rounded-lg bg-awc-fill"
          />
        ))}
      </div>
    );
  }

  if (hasError) {
    return (
      <div
        role="alert"
        className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-awc-bad-dot/40 bg-awc-bad-soft px-4 py-3"
      >
        <p className="min-w-0 flex-1 text-sm text-awc-bad">{C.runsError}</p>
        <Button size="sm" variant="outline" onClick={onRetry}>
          {C.tryAgain}
        </Button>
      </div>
    );
  }

  if (runs.length === 0) {
    return (
      <div className="mt-4 flex flex-col items-center gap-3 rounded-lg border border-dashed border-awc-border-strong bg-awc-surface-2 px-4 py-6 text-center">
        <p className="text-base font-semibold text-awc-fg">
          {C.runsEmptyTitle}
        </p>
        <p className="text-sm text-awc-fg-muted">{C.runsEmptyBody}</p>
        <Link
          href="/"
          className="inline-flex items-center rounded-lg border border-awc-border px-3 py-1.5 text-sm font-medium text-awc-fg hover:bg-awc-tile"
        >
          {C.runsNewTask}
        </Link>
      </div>
    );
  }

  return (
    <ul aria-label={C.runsTitle} className="mt-4 space-y-3">
      {runs.map((run) => (
        <GroupTeamActivityRunItem key={run.id} run={run} />
      ))}
    </ul>
  );
}
