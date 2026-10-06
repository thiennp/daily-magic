"use client";

import {
  PANEL_ROW_CLASS,
  PANEL_ROW_META_CLASS,
  PANEL_ROW_TITLE_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";
import { PROJECT_PAGE_REPORTS_COPY as C } from "@/features/projects/reports/projectPageReportsCopy.constant";
import type { ProjectReportRow } from "@/features/projects/reports/utils/buildProjectReportRows";

interface AwcProjectReportRowProps {
  readonly row: ProjectReportRow;
  readonly onOpen: (reportId: string) => void;
}

/** One report row: title · from · date; whole row opens the report. */
export default function AwcProjectReportRow({
  row,
  onOpen,
}: AwcProjectReportRowProps) {
  return (
    <li className="border-t border-gray-200/80 first:border-t-0 dark:border-gray-800/80">
      <button
        type="button"
        aria-label={`${C["reports.row.open"]}: ${row.title}`}
        className={PANEL_ROW_CLASS}
        onClick={() => {
          onOpen(row.id);
        }}
      >
        <span className="min-w-0">
          <span className={`block ${PANEL_ROW_TITLE_CLASS}`}>{row.title}</span>
          <span className={`block ${PANEL_ROW_META_CLASS}`}>{row.from}</span>
        </span>
        <time
          dateTime={row.createdAt}
          className={`shrink-0 tabular-nums ${PANEL_ROW_META_CLASS}`}
        >
          {new Date(row.createdAt).toLocaleString()}
        </time>
      </button>
    </li>
  );
}
