"use client";

import {
  PANEL_BUTTON_SECONDARY_CLASS,
  PANEL_LIST_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";
import AwcProjectReportRow from "@/features/projects/reports/AwcProjectReportRow";
import AwcProjectReportsFilters from "@/features/projects/reports/AwcProjectReportsFilters";
import {
  AwcProjectReportsEmpty,
  AwcProjectReportsError,
  AwcProjectReportsNoMatch,
  AwcProjectReportsSkeleton,
} from "@/features/projects/reports/AwcProjectReportsStates";
import type { AwcProjectReportsState } from "@/features/projects/reports/useAwcProjectReports";
import useProjectReportsListView from "@/features/projects/reports/useProjectReportsListView";

interface AwcProjectReportsListProps {
  readonly reports: AwcProjectReportsState;
  readonly onOpen: (reportId: string) => void;
}

/** Filters + day-grouped report rows; loading / error / empty / no-match. */
export default function AwcProjectReportsList({
  reports,
  onOpen,
}: AwcProjectReportsListProps) {
  const { rows } = reports;
  const view = useProjectReportsListView(rows);

  if (reports.loadFailed) {
    return <AwcProjectReportsError onRetry={reports.refresh} />;
  }
  if (reports.isLoading && rows.length === 0) {
    return <AwcProjectReportsSkeleton />;
  }
  if (rows.length === 0) return <AwcProjectReportsEmpty />;

  return (
    <>
      <AwcProjectReportsFilters
        filters={view.filters}
        counts={view.counts}
        tools={view.tools}
        canClear={view.canClear}
        onChange={view.update}
        onClear={view.clear}
      />
      <p
        role="status"
        aria-live="polite"
        className="text-[13px] text-awc-fg-muted"
      >
        {view.visible.length} of {rows.length} reports
      </p>
      {view.visible.length === 0 ? (
        <AwcProjectReportsNoMatch onClear={view.clear} />
      ) : (
        view.groups.map((group) => (
          <section
            key={group.key}
            aria-label={group.label}
            className="flex flex-col gap-1.5"
          >
            <h3 className="sticky top-0 z-10 bg-awc-bg/95 px-1 py-1 text-xs font-semibold uppercase tracking-wide text-awc-fg-muted backdrop-blur">
              {group.label}
            </h3>
            <ul className={PANEL_LIST_CLASS}>
              {group.items.map((row) => (
                <AwcProjectReportRow key={row.id} row={row} onOpen={onOpen} />
              ))}
            </ul>
          </section>
        ))
      )}
      {view.remaining > 0 && (
        <button
          type="button"
          className={`${PANEL_BUTTON_SECONDARY_CLASS} self-center`}
          onClick={view.showMore}
        >
          Show more ({view.remaining} left)
        </button>
      )}
    </>
  );
}
