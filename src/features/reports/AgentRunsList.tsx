"use client";

import { useEffect, useState } from "react";

import AgentRunCard from "@/features/reports/AgentRunCard";
import { POLL_INTERVAL_MS } from "@/features/reports/agentRunsPolling.constant";
import { STATUS_FILTER_OPTIONS } from "@/features/reports/agentRunStatusFilterOptions.constant";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

export default function AgentRunsList() {
  const [runs, setRuns] = useState<readonly EnrichedAgentRunRecord[]>([]);
  const [statusFilter, setStatusFilter] = useState<AgentRunStatusValue | "all">(
    "all",
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRuns = async (): Promise<void> => {
      const query =
        statusFilter === "all"
          ? ""
          : `?status=${encodeURIComponent(statusFilter)}`;
      const response = await fetch(`/api/agent-runs${query}`);
      if (!response.ok) {
        return;
      }

      const data: unknown = await response.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "runs" in data &&
        Array.isArray((data as { runs: unknown }).runs)
      ) {
        setRuns((data as { runs: EnrichedAgentRunRecord[] }).runs);
      }
      setIsLoading(false);
    };

    void loadRuns();
    const timer = setInterval(() => {
      void loadRuns();
    }, POLL_INTERVAL_MS);

    return () => {
      clearInterval(timer);
    };
  }, [statusFilter]);

  return (
    <div className="space-y-4">
      <label className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        Filter by status
        <select
          value={statusFilter}
          onChange={(event) => {
            setStatusFilter(event.target.value as AgentRunStatusValue | "all");
            setIsLoading(true);
          }}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-950"
        >
          {STATUS_FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

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
