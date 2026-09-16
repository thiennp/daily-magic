"use client";

import { useState } from "react";

import EmptyStatePanel from "@/features/empty-states/EmptyStatePanel";
import EmptyStatePanelSkeleton from "@/features/empty-states/EmptyStatePanelSkeleton";
import {
  CREATE_FREE_ACCOUNT_HREF,
  FIRST_TASK_SHOWCASE_HREF,
  buildSignInHref,
} from "@/features/empty-states/buildGuestAuthHrefs";
import { REPORTS_GUEST_EMPTY_COPY } from "@/features/empty-states/signedOutPageEmptyCopy.constant";
import { useGuestSessionState } from "@/features/empty-states/useGuestSessionState";
import AgentRunCard from "@/features/reports/AgentRunCard";
import AgentRunsFilters from "@/features/reports/AgentRunsFilters";
import { useAgentRunsList } from "@/features/reports/hooks/useAgentRunsList";
import { useDispatchTargets } from "@/features/dispatch/hooks/useDispatchTargets";
import { clearAgentRunHistory } from "@/features/reports/utils/deleteAgentRunHistory";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import {
  AgentRunScope,
  type AgentRunScopeValue,
} from "@/lib/dispatch/AgentRunScope.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

export default function AgentRunsList() {
  const { sessionState } = useGuestSessionState();
  const { groups } = useDispatchTargets();
  const [statusFilter, setStatusFilter] = useState<AgentRunStatusValue | "all">(
    "all",
  );
  const [scopeFilter, setScopeFilter] = useState<AgentRunScopeValue>(
    AgentRunScope.ALL,
  );
  const [groupFilter, setGroupFilter] = useState("");
  const [isClearing, setIsClearing] = useState(false);
  const { runs, isLoading, refresh } = useAgentRunsList({
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

  if (sessionState === "loading") {
    return <EmptyStatePanelSkeleton />;
  }

  if (sessionState === "guest") {
    return (
      <EmptyStatePanel
        density="page"
        title={REPORTS_GUEST_EMPTY_COPY.title}
        body="After you connect a Mac and send a task, every job shows up here."
        primaryCta={{
          label: REPORTS_GUEST_EMPTY_COPY.primaryCtaLabel,
          href: CREATE_FREE_ACCOUNT_HREF,
        }}
        secondaryCta={{
          label: REPORTS_GUEST_EMPTY_COPY.secondaryCtaLabel,
          href: buildSignInHref("/reports"),
        }}
        tertiaryLink={{
          label: "Your first task in 5 minutes",
          href: FIRST_TASK_SHOWCASE_HREF,
        }}
      />
    );
  }

  const listIsLoading = isLoading;
  const isEmpty = !listIsLoading && runs.length === 0;

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

      {listIsLoading ? (
        <EmptyStatePanelSkeleton />
      ) : isEmpty ? (
        <EmptyStatePanel
          density="page"
          title="No reports yet"
          body="Send a task to your Mac — finished jobs and approvals will land here."
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
