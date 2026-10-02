"use client";

import { useState } from "react";

import EmptyStatePanel from "@/features/empty-states/EmptyStatePanel";
import EmptyStatePanelSkeleton from "@/features/empty-states/EmptyStatePanelSkeleton";
import AgentRunCard from "@/features/reports/AgentRunCard";
import AgentRunsFilters from "@/features/reports/AgentRunsFilters";
import AgentRunsListLoadErrorPanel from "@/features/reports/AgentRunsListLoadErrorPanel";
import { useAgentRunsList } from "@/features/reports/hooks/useAgentRunsList";
import { useDispatchTargets } from "@/features/dispatch/hooks/useDispatchTargets";
import { clearAgentRunHistory } from "@/features/reports/utils/deleteAgentRunHistory";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import { resolveReportsSignedInEmptyBody } from "@/lib/copy/resolveSoloTeamSurfaceCopy";
import {
  AgentRunScope,
  type AgentRunScopeValue,
} from "@/lib/dispatch/AgentRunScope.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

interface AgentRunsListSignedInContentProps {
  readonly teamNavEnabled: boolean;
}

export default function AgentRunsListSignedInContent({
  teamNavEnabled,
}: AgentRunsListSignedInContentProps) {
  const { groups } = useDispatchTargets();
  const [statusFilter, setStatusFilter] = useState<AgentRunStatusValue | "all">(
    "all",
  );
  const [scopeFilter, setScopeFilter] = useState<AgentRunScopeValue>(
    AgentRunScope.ALL,
  );
  const [groupFilter, setGroupFilter] = useState("");
  const [isClearing, setIsClearing] = useState(false);
  const { runs, isLoading, loadFailed, refresh } = useAgentRunsList({
    statusFilter,
    scopeFilter,
    groupFilter,
  });

  const handleClearAll = async (): Promise<void> => {
    if (isClearing) {
      return;
    }
    setIsClearing(true);
    try {
      await clearAgentRunHistory();
      refresh();
    } finally {
      setIsClearing(false);
    }
  };

  const listIsLoading = isLoading;
  const isEmpty = !listIsLoading && !loadFailed && runs.length === 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <AgentRunsFilters
          groups={groups}
          scopeFilter={scopeFilter}
          groupFilter={groupFilter}
          statusFilter={statusFilter}
          onScopeChange={setScopeFilter}
          onGroupChange={setGroupFilter}
          onStatusChange={setStatusFilter}
        />
        {runs.length > 0 ? (
          <button
            type="button"
            disabled={isClearing}
            onClick={() => {
              void handleClearAll();
            }}
            className="text-sm font-medium text-gray-500 transition hover:text-error-600 disabled:opacity-50 dark:text-gray-400 dark:hover:text-error-400"
          >
            {isClearing ? "Clearing…" : "Clear all history"}
          </button>
        ) : null}
      </div>

      {loadFailed ? (
        <AgentRunsListLoadErrorPanel onRetry={refresh} />
      ) : listIsLoading ? (
        <EmptyStatePanelSkeleton width="full" />
      ) : isEmpty ? (
        <EmptyStatePanel
          density="page"
          width="full"
          title="No reports yet"
          body={resolveReportsSignedInEmptyBody({ teamNavEnabled })}
          primaryCta={{
            label: "New task",
            href: buildAgentComposerHref({ customTask: true }),
          }}
          secondaryCta={{ label: "Browse Marketplace", href: "/marketplace" }}
        />
      ) : (
        runs.map((run) => <AgentRunCard key={run.id} run={run} />)
      )}
    </div>
  );
}
