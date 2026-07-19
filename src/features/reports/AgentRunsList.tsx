"use client";

import { useState } from "react";

import AgentRunCard from "@/features/reports/AgentRunCard";
import AgentRunsFilters from "@/features/reports/AgentRunsFilters";
import { useAgentRunsList } from "@/features/reports/hooks/useAgentRunsList";
import { useDispatchTargets } from "@/features/dispatch/hooks/useDispatchTargets";
import { clearAgentRunHistory } from "@/features/reports/utils/deleteAgentRunHistory";
import {
  AgentRunScope,
  type AgentRunScopeValue,
} from "@/lib/dispatch/AgentRunScope.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

export default function AgentRunsList() {
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

      {isLoading ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading agent runs…
        </p>
      ) : runs.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No agent runs match this filter yet.
        </p>
      ) : (
        runs.map((run) => <AgentRunCard key={run.id} run={run} />)
      )}
    </div>
  );
}
