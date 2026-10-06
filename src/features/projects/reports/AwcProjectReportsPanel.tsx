"use client";

import useAwcProjectHashDeepLink from "@/features/projects/hooks/useAwcProjectHashDeepLink";
import {
  PANEL_HEADING_CLASS,
  PANEL_INTRO_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";
import AwcProjectReportDetail from "@/features/projects/reports/AwcProjectReportDetail";
import AwcProjectReportsList from "@/features/projects/reports/AwcProjectReportsList";
import { PROJECT_PAGE_REPORTS_COPY as C } from "@/features/projects/reports/projectPageReportsCopy.constant";
import useAwcProjectReports from "@/features/projects/reports/useAwcProjectReports";

interface AwcProjectReportsPanelProps {
  readonly projectId: string;
}

/**
 * Reports tab (layout v2 L6): this project's reports, newest first, with a
 * detail view. `#reports?report=<id>` (legacy `/reports/<id>`) opens detail.
 * No delete / New report here (Product open Qs 3 + 5).
 */
export default function AwcProjectReportsPanel({
  projectId,
}: AwcProjectReportsPanelProps) {
  const reports = useAwcProjectReports(projectId);
  const [reportId, setReportId] = useAwcProjectHashDeepLink(
    "reports",
    "report",
  );
  const listRun =
    reportId === null
      ? null
      : (reports.runs.find((run) => run.id === reportId) ?? null);

  return (
    <section
      aria-label={C["reports.aria"]}
      className="flex min-w-0 flex-col gap-3"
    >
      <header className="space-y-0.5 px-1">
        <h3 className={PANEL_HEADING_CLASS}>{C["reports.heading"]}</h3>
        <p className={PANEL_INTRO_CLASS}>{C["reports.intro"]}</p>
      </header>
      {reportId !== null ? (
        <AwcProjectReportDetail
          projectId={projectId}
          runId={reportId}
          listRun={listRun}
          onBack={() => {
            setReportId(null);
          }}
        />
      ) : (
        <AwcProjectReportsList reports={reports} onOpen={setReportId} />
      )}
    </section>
  );
}
