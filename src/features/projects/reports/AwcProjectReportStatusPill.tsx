import {
  REPORT_STATUS_LABEL,
  type ReportStatusKind,
} from "@/features/projects/reports/utils/projectReportStatus";

const PILL_CLASS: Readonly<Record<ReportStatusKind, string>> = {
  done: "bg-awc-ok-soft text-awc-ok",
  failed: "bg-awc-bad-soft text-awc-bad",
  running: "bg-awc-info-soft text-awc-info",
  waiting: "bg-awc-warn-soft text-awc-warn",
  denied: "bg-awc-bad-soft text-awc-bad",
  timed_out: "bg-awc-fill text-awc-fg-muted",
};

const ICON_PATH: Readonly<Record<ReportStatusKind, string>> = {
  done: "M3.5 8.5l3 3 6-7",
  failed: "M4.5 4.5l7 7M11.5 4.5l-7 7",
  running: "M8 3v5l3 2",
  waiting: "M8 4v5M8 11.5v.5",
  denied: "M4 8h8",
  timed_out: "M8 3v5l3 2",
};

/** Status pill: icon + label (never color alone). */
export default function AwcProjectReportStatusPill({
  kind,
}: {
  readonly kind: ReportStatusKind;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11.5px] font-semibold ${PILL_CLASS[kind]}`}
    >
      <svg
        viewBox="0 0 16 16"
        width="12"
        height="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={kind === "running" ? "motion-safe:animate-pulse" : ""}
      >
        <path d={ICON_PATH[kind]} />
      </svg>
      {REPORT_STATUS_LABEL[kind]}
    </span>
  );
}
