"use client";

import { useCallback, useEffect, useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import GroupTeamActivityRunsList from "@/features/admin/components/GroupTeamActivityRunsList";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
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
    // Load company runs when selection/reload changes.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Soft Companies runs fetch-on-mount
    void loadRuns();
  }, [loadRuns, reloadKey]);

  const bumpReload = (): void => {
    setReloadKey((key) => key + 1);
  };

  return (
    <AppPanel aria-labelledby="run-h" aria-busy={isLoading}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="run-h" className="text-lg font-semibold text-awc-fg">
          {C.runsTitle}
        </h2>
        {!isLoading && !hasError && runs.length > 0 ? (
          <button
            type="button"
            onClick={bumpReload}
            aria-label={C.runsRefresh}
            title={C.runsRefresh}
            className="inline-flex size-9 items-center justify-center rounded-lg text-awc-fg-muted transition hover:bg-awc-tile hover:text-awc-fg"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 11a8 8 0 0 0-14-4L4 9M4 4v5h5M4 13a8 8 0 0 0 14 4l2-2M20 20v-5h-5" />
            </svg>
          </button>
        ) : null}
      </div>

      <GroupTeamActivityRunsList
        runs={runs}
        isLoading={isLoading}
        hasError={hasError}
        onRetry={bumpReload}
      />
    </AppPanel>
  );
}
