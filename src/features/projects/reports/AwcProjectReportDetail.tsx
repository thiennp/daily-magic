"use client";

import {
  PANEL_LINK_CLASS,
  PANEL_STATUS_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";
import AwcProjectReportDetailFields from "@/features/projects/reports/AwcProjectReportDetailFields";
import { PROJECT_PAGE_REPORTS_COPY as C } from "@/features/projects/reports/projectPageReportsCopy.constant";
import useAwcProjectReportDetail from "@/features/projects/reports/useAwcProjectReportDetail";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

interface AwcProjectReportDetailProps {
  readonly projectId: string;
  readonly runId: string;
  readonly listRun: EnrichedAgentRunRecord | null;
  readonly onBack: () => void;
}

/** Report detail: back link + fields; missing / loading / error soft states. */
export default function AwcProjectReportDetail({
  projectId,
  runId,
  listRun,
  onBack,
}: AwcProjectReportDetailProps) {
  const detail = useAwcProjectReportDetail({ projectId, runId, listRun });

  return (
    <div className="flex min-w-0 flex-col gap-3">
      <button
        type="button"
        className={`self-start px-1 ${PANEL_LINK_CLASS}`}
        onClick={onBack}
      >
        ← {C["reports.detail.back"]}
      </button>
      {detail.status === "loading" ? (
        <p className={PANEL_STATUS_CLASS}>{C["reports.detail.loading"]}</p>
      ) : detail.status === "missing" ? (
        <p className={PANEL_STATUS_CLASS}>{C["reports.detail.missing"]}</p>
      ) : detail.status === "error" ? (
        <p className={PANEL_STATUS_CLASS}>{C["reports.detail.error"]}</p>
      ) : (
        <AwcProjectReportDetailFields run={detail.run} />
      )}
    </div>
  );
}
