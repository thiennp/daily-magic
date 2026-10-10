"use client";

import {
  PANEL_HEADING_CLASS,
  PANEL_LIST_CLASS,
  PANEL_ROW_META_CLASS,
} from "@/features/projects/public-api/types";
import { PROJECT_PAGE_REPORTS_COPY as C } from "@/features/projects/reports/projectPageReportsCopy.constant";
import {
  resolveProjectReportFrom,
  resolveProjectReportTitle,
} from "@/features/projects/reports/utils/buildProjectReportRows";
import { resolveProjectReportDetailView } from "@/features/projects/reports/utils/resolveProjectReportDetailView";
import { resolveAgentRunDetailResultOutputForHonesty } from "@/features/reports/utils/public-api/presentation";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";
import { getAgentRunLocalCache } from "@/features/reports/public-api/presentation";

const LABEL_CLASS =
  "text-[12px] font-semibold uppercase tracking-wide text-awc-fg-muted dark:text-gray-400";

/**
 * Title · From · Date · Status + "What happened" (report summary, else the
 * run output without progress / wave markers).
 */
export default function AwcProjectReportDetailFields({
  run,
}: {
  readonly run: EnrichedAgentRunRecord;
}) {
  const { statusLabel, reasonLine, body, details } =
    resolveProjectReportDetailView({
      run,
      fallbackOutput: resolveAgentRunDetailResultOutputForHonesty(
        run.id,
        run.resultOutput,
      ),
      cached: getAgentRunLocalCache(run.id),
    });

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
        {statusLabel !== null ? (
          <>
            <dt className={LABEL_CLASS}>{C["reports.detail.status"]}</dt>
            <dd className={PANEL_ROW_META_CLASS}>
              {reasonLine !== null
                ? `${statusLabel} · ${reasonLine}`
                : statusLabel}
            </dd>
          </>
        ) : null}
      </dl>
      {body.length > 0 ? (
        <section className="flex flex-col gap-1">
          <h5 className={LABEL_CLASS}>{C["reports.detail.body"]}</h5>
          <pre
            className={`${PANEL_LIST_CLASS} max-h-96 overflow-auto whitespace-pre-wrap p-3 text-[13px] text-awc-fg dark:text-gray-200`}
          >
            {body}
          </pre>
          {details !== null ? (
            <details className="text-[13px] text-awc-fg-muted dark:text-gray-400">
              <summary className="cursor-pointer">
                {C["reports.detail.rawError"]}
              </summary>
              <pre
                className={`${PANEL_LIST_CLASS} mt-1 max-h-64 overflow-auto whitespace-pre-wrap p-3 text-[12px]`}
              >
                {details}
              </pre>
            </details>
          ) : null}
        </section>
      ) : null}
    </article>
  );
}
