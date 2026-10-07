"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import AgentRunStatusBadge from "@/features/reports/AgentRunStatusBadge";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

interface GroupTeamActivityPanelProps {
  readonly groupId: string;
}

export default function GroupTeamActivityPanel({
  groupId,
}: GroupTeamActivityPanelProps) {
  const [runs, setRuns] = useState<readonly EnrichedAgentRunRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const loadRuns = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await fetch(`/api/admin/groups/${groupId}/agent-runs`);
      if (!response.ok) {
        setRuns([]);
        setHasError(true);
        setIsLoading(false);
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
      } else {
        setRuns([]);
      }
      setIsLoading(false);
    } catch {
      setRuns([]);
      setHasError(true);
      setIsLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    void loadRuns();
  }, [loadRuns, reloadKey]);

  return (
    <AppPanel>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
          {C.runsTitle}
        </h3>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setReloadKey((key) => key + 1);
          }}
          aria-label={C.runsRefresh}
        >
          {C.runsRefresh}
        </Button>
      </div>

      {isLoading ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {C.runsLoading}
        </p>
      ) : hasError ? (
        <div className="mt-4 space-y-3">
          <p className="text-sm text-error-600 dark:text-error-400">
            {C.runsError}
          </p>
          <Button
            size="sm"
            onClick={() => {
              setReloadKey((key) => key + 1);
            }}
          >
            {C.tryAgain}
          </Button>
        </div>
      ) : runs.length === 0 ? (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            {C.runsEmptyTitle}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {C.runsEmptyBody}
          </p>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {runs.map((run) => (
            <li
              key={run.id}
              className="rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <AgentRunStatusBadge status={run.status} />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(run.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {run.requesterEmail} → {run.executorEmail}
              </p>
              <Link
                href={`/reports/${run.id}`}
                className="mt-2 inline-block text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
              >
                View report
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AppPanel>
  );
}
