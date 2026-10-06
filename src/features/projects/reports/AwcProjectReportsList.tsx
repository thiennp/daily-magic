"use client";

import { useId, useMemo, useState } from "react";

import {
  PITFALL_CHIP_ACTIVE_CLASS,
  PITFALL_SEARCH_INPUT_CLASS,
} from "@/features/projects/pitfalls/pitfallsChrome.constant";
import {
  PANEL_BUTTON_SECONDARY_CLASS,
  PANEL_LIST_CLASS,
  PANEL_STATUS_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";
import AwcProjectReportRow from "@/features/projects/reports/AwcProjectReportRow";
import { PROJECT_PAGE_REPORTS_COPY as C } from "@/features/projects/reports/projectPageReportsCopy.constant";
import type { AwcProjectReportsState } from "@/features/projects/reports/useAwcProjectReports";
import { filterProjectReportRows } from "@/features/projects/reports/utils/buildProjectReportRows";

interface AwcProjectReportsListProps {
  readonly reports: AwcProjectReportsState;
  readonly onOpen: (reportId: string) => void;
}

/** All chip + search + rows; loading / error / empty states. */
export default function AwcProjectReportsList({
  reports,
  onOpen,
}: AwcProjectReportsListProps) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const visible = useMemo(
    () => filterProjectReportRows(reports.rows, query),
    [reports.rows, query],
  );

  if (reports.loadFailed) {
    return (
      <div className="flex flex-col items-start gap-2 px-1">
        <p className={PANEL_STATUS_CLASS}>{C["reports.error"]}</p>
        <button
          type="button"
          className={PANEL_BUTTON_SECONDARY_CLASS}
          onClick={reports.refresh}
        >
          {C["reports.error.retry"]}
        </button>
      </div>
    );
  }
  if (reports.isLoading && reports.rows.length === 0) {
    return <p className={PANEL_STATUS_CLASS}>{C["reports.loading"]}</p>;
  }
  if (reports.rows.length === 0) {
    return <p className={PANEL_STATUS_CLASS}>{C["reports.empty"]}</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label={C["reports.filter.aria"]}>
          <button
            type="button"
            aria-pressed
            className={PITFALL_CHIP_ACTIVE_CLASS}
          >
            {C["reports.filter.all"]}
            <span className="tabular-nums opacity-70">
              {reports.rows.length}
            </span>
          </button>
        </div>
        <label htmlFor={searchId} className="sr-only">
          {C["reports.search.sr"]}
        </label>
        <input
          id={searchId}
          type="search"
          value={query}
          placeholder={C["reports.search.placeholder"]}
          className={PITFALL_SEARCH_INPUT_CLASS}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
      </div>
      {visible.length === 0 ? (
        <p className={PANEL_STATUS_CLASS}>{C["reports.filter.empty"]}</p>
      ) : (
        <ul className={PANEL_LIST_CLASS}>
          {visible.map((row) => (
            <AwcProjectReportRow key={row.id} row={row} onOpen={onOpen} />
          ))}
        </ul>
      )}
    </>
  );
}
