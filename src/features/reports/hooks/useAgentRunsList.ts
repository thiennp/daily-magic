"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT,
  listAgentRunsLocalCache,
} from "@/features/reports/agentRunLocalCache";
import { useAgentRunRecordSync } from "@/features/reports/hooks/useAgentRunRecordSync";
import { useAgentRunsActiveSse } from "@/features/reports/hooks/useAgentRunsActiveSse";
import { useAgentRunsRemoteSync } from "@/features/reports/hooks/useAgentRunsRemoteSync";
import { buildViewerAgentRunsList } from "@/features/reports/utils/buildViewerAgentRunsList";
import type { AgentRunScopeValue } from "@/lib/dispatch/AgentRunScope.constant";
import type { AgentRunStatusValue } from "@/lib/dispatch/AgentRunStatus.constant";

export function useAgentRunsList(input: {
  readonly statusFilter: AgentRunStatusValue | "all";
  readonly scopeFilter: AgentRunScopeValue;
  readonly groupFilter: string;
}): {
  readonly runs: ReturnType<typeof buildViewerAgentRunsList>;
  readonly isLoading: boolean;
  readonly refresh: () => void;
} {
  const { data: session } = useSession();
  const userId =
    typeof session?.user?.id === "string" ? session.user.id : undefined;
  const [cacheVersion, setCacheVersion] = useState(0);
  const bumpCache = useCallback(() => {
    setCacheVersion((current) => current + 1);
  }, []);
  const { apiRuns, isLoading, refresh } = useAgentRunsRemoteSync({
    enabled: true,
    statusFilter: input.statusFilter,
    scopeFilter: input.scopeFilter,
    groupFilter: input.groupFilter,
    onCacheUpdated: bumpCache,
  });

  useAgentRunsActiveSse({
    enabled: true,
    runs: apiRuns,
    onRunActivity: () => {
      refresh();
      bumpCache();
    },
  });

  const cachedRuns = useMemo(() => {
    void cacheVersion;
    return listAgentRunsLocalCache();
  }, [cacheVersion]);

  const runs = useMemo(
    () =>
      buildViewerAgentRunsList({
        userId,
        apiRuns,
        cachedRuns,
        statusFilter: input.statusFilter,
        scopeFilter: input.scopeFilter,
        groupFilter: input.groupFilter,
      }),
    [
      apiRuns,
      cachedRuns,
      input.groupFilter,
      input.scopeFilter,
      input.statusFilter,
      userId,
    ],
  );

  useAgentRunRecordSync(bumpCache);

  useEffect(() => {
    const handleCacheUpdated = (): void => {
      bumpCache();
    };

    window.addEventListener(
      AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT,
      handleCacheUpdated,
    );

    return () => {
      window.removeEventListener(
        AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT,
        handleCacheUpdated,
      );
    };
  }, [bumpCache]);

  return { runs, isLoading, refresh };
}
