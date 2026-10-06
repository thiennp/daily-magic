"use client";

import { useMemo } from "react";

import {
  buildProjectReportRows,
  type ProjectReportRow,
} from "@/features/projects/reports/utils/buildProjectReportRows";
import { useAgentRunsList } from "@/features/reports/hooks/useAgentRunsList";
import { AgentRunScope } from "@/lib/dispatch/AgentRunScope.constant";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

export interface AwcProjectReportsState {
  readonly runs: readonly EnrichedAgentRunRecord[];
  readonly rows: readonly ProjectReportRow[];
  readonly isLoading: boolean;
  readonly loadFailed: boolean;
  readonly refresh: () => void;
}

/**
 * Reports for one project: the live `/api/agent-runs` list + local cache
 * (same source as /reports), kept to runs whose `projectId` is this project.
 */
const useAwcProjectReports = (projectId: string): AwcProjectReportsState => {
  const { runs, isLoading, loadFailed, refresh } = useAgentRunsList({
    statusFilter: "all",
    scopeFilter: AgentRunScope.ALL,
    groupFilter: "",
  });
  const projectRuns = useMemo(
    () => runs.filter((run) => run.projectId === projectId),
    [runs, projectId],
  );
  const rows = useMemo(
    () => buildProjectReportRows(projectRuns, projectId),
    [projectRuns, projectId],
  );
  return { runs: projectRuns, rows, isLoading, loadFailed, refresh };
};

export default useAwcProjectReports;
