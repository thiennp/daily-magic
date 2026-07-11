"use client";

import { useState } from "react";

import AgentRunCard from "@/features/reports/AgentRunCard";
import AgentRunsFilters from "@/features/reports/AgentRunsFilters";
import { useAgentRunsList } from "@/features/reports/hooks/useAgentRunsList";
import { useDispatchTargets } from "@/features/dispatch/hooks/useDispatchTargets";
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
  const { runs, isLoading } = useAgentRunsList({
    statusFilter,
    scopeFilter,
    groupFilter,
  });

  return (
    <div className="space-y-4">
      <AgentRunsFilters
        groups={groups}
        scopeFilter={scopeFilter}
        groupFilter={groupFilter}
        statusFilter={statusFilter}
        onScopeChange={setScopeFilter}
        onGroupChange={setGroupFilter}
        onStatusChange={setStatusFilter}
      />

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
