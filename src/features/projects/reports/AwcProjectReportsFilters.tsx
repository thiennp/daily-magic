"use client";

import { useId } from "react";

import { PITFALL_SEARCH_INPUT_CLASS } from "@/features/projects/pitfalls/public-api/types";
import AwcProjectReportsStatusChips from "@/features/projects/reports/AwcProjectReportsStatusChips";
import { PROJECT_PAGE_REPORTS_COPY as C } from "@/features/projects/reports/projectPageReportsCopy.constant";
import type { ProjectReportFilters } from "@/features/projects/reports/utils/filterProjectReports";
import type { ReportStatusFilter } from "@/features/projects/reports/utils/projectReportStatus";

interface Props {
  readonly filters: ProjectReportFilters;
  readonly counts: Readonly<Record<ReportStatusFilter, number>>;
  readonly tools: readonly (readonly [string, string])[];
  readonly canClear: boolean;
  readonly onChange: (next: ProjectReportFilters) => void;
  readonly onClear: () => void;
}

/** Status chips with counts, coding-tool select, search, Clear filters. */
export default function AwcProjectReportsFilters({
  filters,
  counts,
  tools,
  canClear,
  onChange,
  onClear,
}: Props) {
  const searchId = useId();
  const toolId = useId();
  return (
    <div className="flex flex-col gap-3">
      <AwcProjectReportsStatusChips
        value={filters.status}
        counts={counts}
        onSelect={(status) => {
          onChange({ ...filters, status });
        }}
      />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <label htmlFor={toolId} className="sr-only">
          Coding tool
        </label>
        <select
          id={toolId}
          value={filters.tool}
          className="awc-focus-ring rounded-full border border-awc-border bg-awc-surface-2 px-3.5 py-1.5 text-sm text-awc-fg dark:border-gray-700 dark:bg-white/[0.04] dark:text-white"
          onChange={(event) => {
            onChange({ ...filters, tool: event.target.value });
          }}
        >
          <option value="">All coding tools</option>
          {tools.map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
        <label htmlFor={searchId} className="sr-only">
          {C["reports.search.sr"]}
        </label>
        <input
          id={searchId}
          type="search"
          value={filters.query}
          placeholder={C["reports.search.placeholder"]}
          className={`${PITFALL_SEARCH_INPUT_CLASS} sm:ml-auto`}
          onChange={(event) => {
            onChange({ ...filters, query: event.target.value });
          }}
        />
        {canClear && (
          <button
            type="button"
            className="awc-focus-ring rounded-full px-3 py-1.5 text-sm font-medium text-awc-fg-muted underline-offset-2 hover:underline"
            onClick={onClear}
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
