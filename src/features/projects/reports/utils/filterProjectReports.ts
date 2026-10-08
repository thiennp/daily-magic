import { filterProjectReportRows } from "@/features/projects/reports/utils/buildProjectReportRows";
import type { ProjectReportRow } from "@/features/projects/reports/utils/buildProjectReportRows";
import {
  matchesStatusFilter,
  type ReportStatusFilter,
} from "@/features/projects/reports/utils/projectReportStatus";

export interface ProjectReportFilters {
  readonly query: string;
  readonly status: ReportStatusFilter;
  /** Writer agent id, or "" for every coding tool. */
  readonly tool: string;
}

export const NO_REPORT_FILTERS: ProjectReportFilters = {
  query: "",
  status: "all",
  tool: "",
};

export const hasActiveReportFilters = (f: ProjectReportFilters): boolean =>
  f.query.trim() !== "" || f.status !== "all" || f.tool !== "";

/** Status chip + coding tool + text search, all ANDed. */
export const applyProjectReportFilters = (
  rows: readonly ProjectReportRow[],
  filters: ProjectReportFilters,
): readonly ProjectReportRow[] =>
  filterProjectReportRows(
    rows.filter(
      (row) =>
        matchesStatusFilter(row.statusKind, filters.status) &&
        (filters.tool === "" || row.toolId === filters.tool),
    ),
    filters.query,
  );

/** Chip counts (respecting tool + search, not the status chip itself). */
export const countReportsByStatus = (
  rows: readonly ProjectReportRow[],
  filters: ProjectReportFilters,
): Readonly<Record<ReportStatusFilter, number>> => {
  const base = applyProjectReportFilters(rows, { ...filters, status: "all" });
  const count = (status: ReportStatusFilter): number =>
    base.filter((row) => matchesStatusFilter(row.statusKind, status)).length;
  return {
    all: base.length,
    done: count("done"),
    failed: count("failed"),
    running: count("running"),
    needs: count("needs"),
  };
};
