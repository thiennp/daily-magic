"use client";

import { useMemo, useState } from "react";

import type { ProjectReportRow } from "@/features/projects/reports/utils/buildProjectReportRows";
import {
  applyProjectReportFilters,
  countReportsByStatus,
  hasActiveReportFilters,
  NO_REPORT_FILTERS,
  type ProjectReportFilters,
} from "@/features/projects/reports/utils/filterProjectReports";
import { groupProjectReportsByDay } from "@/features/projects/reports/utils/groupProjectReportsByDay";

const PAGE_SIZE = 20;

/** Filter state, counts, tool options and day groups for the first N rows. */
const useProjectReportsListView = (rows: readonly ProjectReportRow[]) => {
  const [filters, setFilters] = useState(NO_REPORT_FILTERS);
  const [shown, setShown] = useState(PAGE_SIZE);
  const visible = useMemo(
    () => applyProjectReportFilters(rows, filters),
    [rows, filters],
  );
  const counts = useMemo(
    () => countReportsByStatus(rows, filters),
    [rows, filters],
  );
  const tools = useMemo(
    () =>
      [...new Map(rows.map((r) => [r.toolId, r.toolLabel])).entries()].sort(
        (a, b) => a[1].localeCompare(b[1]),
      ),
    [rows],
  );
  const groups = useMemo(
    () => groupProjectReportsByDay(visible.slice(0, shown)),
    [visible, shown],
  );
  const update = (next: ProjectReportFilters): void => {
    setFilters(next);
    setShown(PAGE_SIZE);
  };
  return {
    filters,
    visible,
    counts,
    tools,
    groups,
    remaining: Math.max(0, visible.length - shown),
    canClear: hasActiveReportFilters(filters),
    update,
    clear: (): void => {
      update(NO_REPORT_FILTERS);
    },
    showMore: (): void => {
      setShown((n) => n + PAGE_SIZE);
    },
  };
};

export default useProjectReportsListView;
