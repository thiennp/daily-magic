"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  buildProjectReportRows,
  type ProjectReportRow,
} from "@/features/projects/reports/utils/buildProjectReportRows";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

export interface AwcProjectReportsState {
  readonly runs: readonly EnrichedAgentRunRecord[];
  readonly rows: readonly ProjectReportRow[];
  readonly isLoading: boolean;
  readonly loadFailed: boolean;
  readonly refresh: () => void;
}

/** Project-scoped reports via `/api/projects/:id/reports`. */
const useAwcProjectReports = (projectId: string): AwcProjectReportsState => {
  const [runs, setRuns] = useState<readonly EnrichedAgentRunRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [reloadNonce, setReloadNonce] = useState(0);
  const refresh = useCallback((): void => {
    setReloadNonce((nonce) => nonce + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const load = async (): Promise<void> => {
      setIsLoading(true);
      setLoadFailed(false);
      try {
        const response = await fetch(
          `/api/projects/${encodeURIComponent(projectId)}/reports`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          setLoadFailed(true);
          return;
        }
        const data: unknown = await response.json();
        const list =
          typeof data === "object" &&
          data !== null &&
          "runs" in data &&
          Array.isArray((data as { runs: unknown }).runs)
            ? (data as { runs: EnrichedAgentRunRecord[] }).runs
            : null;
        if (list === null) {
          setLoadFailed(true);
          return;
        }
        setRuns(list);
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setLoadFailed(true);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };
    void load();
    return () => {
      controller.abort();
    };
  }, [projectId, reloadNonce]);

  const rows = useMemo(
    () => buildProjectReportRows(runs, projectId),
    [runs, projectId],
  );
  return { runs, rows, isLoading, loadFailed, refresh };
};

export default useAwcProjectReports;
