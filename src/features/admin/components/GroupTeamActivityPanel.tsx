"use client";

import { useCallback, useEffect, useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";
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
    <AppPanel>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
          {C.runsTitle}
        </h3>
        <Button
          size="sm"
          variant="outline"
          onClick={bumpReload}
          aria-label={C.runsRefresh}
        >
          {C.runsRefresh}
        </Button>
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
