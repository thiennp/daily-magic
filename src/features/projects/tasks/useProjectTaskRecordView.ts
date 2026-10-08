"use client";

import { useCallback, useMemo, useState } from "react";

import {
  countProjectTaskRecordsByTab,
  filterProjectTaskRecordsByTab,
  PROJECT_TASK_RECORD_DEFAULT_DIR,
  sortProjectTaskRecords,
  type ProjectTaskRecordSortDir,
  type ProjectTaskRecordSortKey,
  type ProjectTaskRecordTab,
} from "@/features/projects/tasks/utils/projectTaskRecordView";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

/** Tabs + sort for the task-records list (client-side, meta only). */
export const useProjectTaskRecordView = (
  records: readonly ProjectTaskRecord[],
) => {
  const [tab, setTab] = useState<ProjectTaskRecordTab>("in_progress");
  const [sortKey, setSortKeyState] =
    useState<ProjectTaskRecordSortKey>("updated");
  const [sortDir, setSortDir] = useState<ProjectTaskRecordSortDir>("desc");
  const counts = useMemo(
    () => countProjectTaskRecordsByTab(records),
    [records],
  );
  const visible = useMemo(
    () =>
      sortProjectTaskRecords(
        filterProjectTaskRecordsByTab(records, tab),
        sortKey,
        sortDir,
      ),
    [records, tab, sortKey, sortDir],
  );
  const setSortKey = useCallback((key: ProjectTaskRecordSortKey) => {
    setSortKeyState(key);
    setSortDir(PROJECT_TASK_RECORD_DEFAULT_DIR[key]);
  }, []);
  const toggleSortDir = useCallback(() => {
    setSortDir((d) => (d === "asc" ? "desc" : "asc"));
  }, []);
  return {
    tab,
    setTab,
    sortKey,
    setSortKey,
    sortDir,
    toggleSortDir,
    counts,
    visible,
  };
};
