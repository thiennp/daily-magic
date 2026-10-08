"use client";

import AwcProjectReportStatusPill from "@/features/projects/reports/AwcProjectReportStatusPill";
import { PROJECT_PAGE_REPORTS_COPY as C } from "@/features/projects/reports/projectPageReportsCopy.constant";
import type { ProjectReportRow } from "@/features/projects/reports/utils/buildProjectReportRows";
import { formatReportDuration } from "@/features/projects/reports/utils/formatReportDuration";
import { formatRelativeTimeAgo } from "@/lib/time/formatRelativeTimeAgo";

interface AwcProjectReportRowProps {
  readonly row: ProjectReportRow;
  readonly onOpen: (reportId: string) => void;
}

const initials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "?";

/** One report: status, 2-line title, tool · who · duration · time; opens it. */
export default function AwcProjectReportRow({
  row,
  onOpen,
}: AwcProjectReportRowProps) {
  const duration = formatReportDuration(row.durationSeconds);
  const absolute = new Date(row.createdAt).toLocaleString();
  return (
    <li className="border-t border-awc-border/80 first:border-t-0 dark:border-gray-800/80">
      <button
        type="button"
        aria-label={`${C["reports.row.open"]}: ${row.title}`}
        className="awc-focus-ring group flex w-full items-start gap-3 px-3 py-3 text-left hover:bg-awc-tile/70 dark:hover:bg-white/[0.05]"
        onClick={() => {
          onOpen(row.id);
        }}
      >
        <span className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span
            title={row.fullTitle}
            className="line-clamp-2 break-words text-[15px] font-medium text-awc-fg dark:text-gray-100"
          >
            {row.fullTitle}
          </span>
          {row.failureReason !== null && (
            <span className="truncate text-[13px] text-awc-bad">
              {row.failureReason}
            </span>
          )}
          <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[12.5px] text-awc-fg-muted dark:text-gray-400">
            <AwcProjectReportStatusPill kind={row.statusKind} />
            <span className="rounded-md bg-awc-fill px-1.5 py-0.5 font-medium text-awc-fg dark:bg-white/10 dark:text-gray-300">
              {row.toolLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="flex h-5 w-5 items-center justify-center rounded-full bg-awc-accent-soft text-[10px] font-semibold text-awc-fg"
              >
                {initials(row.from)}
              </span>
              {row.from}
            </span>
            {duration !== null && (
              <span className="tabular-nums">{duration}</span>
            )}
            <time dateTime={row.createdAt} title={absolute}>
              {formatRelativeTimeAgo(row.createdAt) ?? absolute}
            </time>
          </span>
        </span>
        <svg
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="mt-1 shrink-0 text-awc-fg-subtle transition-transform group-hover:translate-x-0.5"
        >
          <path d="M6 3l5 5-5 5" />
        </svg>
      </button>
    </li>
  );
}
