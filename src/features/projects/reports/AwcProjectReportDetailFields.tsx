"use client";

import {
  PANEL_HEADING_CLASS,
  PANEL_LIST_CLASS,
  PANEL_ROW_META_CLASS,
} from "@/features/projects/projectPagePanelChrome.constant";
import { PROJECT_PAGE_REPORTS_COPY as C } from "@/features/projects/reports/projectPageReportsCopy.constant";
import {
  resolveProjectReportFrom,
  resolveProjectReportTitle,
} from "@/features/projects/reports/utils/buildProjectReportRows";
import { formatAgentRunReportSummaryLine } from "@/features/reports/utils/formatAgentRunReportSummaryLine";
import { resolveAgentRunDetailResultOutputForHonesty } from "@/features/reports/utils/resolveAgentRunDetailResultOutputForHonesty";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

const LABEL_CLASS =
  "text-[12px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400";

/**
 * Title · From · Date + "What happened" (report summary, else run output).
 * Status pill waits on the Product status set (open Q2).
 */
export default function AwcProjectReportDetailFields({
  run,
}: {
  readonly run: EnrichedAgentRunRecord;
}) {
  const body =
    formatAgentRunReportSummaryLine(run.reportSummary) ??
    resolveAgentRunDetailResultOutputForHonesty(run.id, run.resultOutput);

  return (
    <article className="flex min-w-0 flex-col gap-3 px-1">
      <h4 className={PANEL_HEADING_CLASS}>
        {resolveProjectReportTitle(run) || C["reports.detail.heading"]}
      </h4>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
        <dt className={LABEL_CLASS}>{C["reports.detail.from"]}</dt>
        <dd className={PANEL_ROW_META_CLASS}>
          {resolveProjectReportFrom(run)}
        </dd>
        <dt className={LABEL_CLASS}>{C["reports.detail.date"]}</dt>
        <dd className={PANEL_ROW_META_CLASS}>
          <time dateTime={run.createdAt}>
            {new Date(run.createdAt).toLocaleString()}
          </time>
        </dd>
      </dl>
      {body.length > 0 ? (
        <section className="flex flex-col gap-1">
          <h5 className={LABEL_CLASS}>{C["reports.detail.body"]}</h5>
          <pre
            className={`${PANEL_LIST_CLASS} max-h-96 overflow-auto whitespace-pre-wrap p-3 text-[13px] text-gray-800 dark:text-gray-200`}
          >
            {body}
          </pre>
        </section>
      ) : null}
    </article>
  );
}
