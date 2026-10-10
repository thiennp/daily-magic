import {
  PANEL_BUTTON_SECONDARY_CLASS,
  PANEL_LIST_CLASS,
} from "@/features/projects/public-api/types";
import { PROJECT_PAGE_REPORTS_COPY as C } from "@/features/projects/reports/projectPageReportsCopy.constant";

const BOX = "flex flex-col items-start gap-2 px-1 py-4 text-awc-fg-muted";

export function AwcProjectReportsSkeleton() {
  return (
    <ul
      className={PANEL_LIST_CLASS}
      aria-busy="true"
      aria-label={C["reports.loading"]}
    >
      {[0, 1, 2, 3].map((key) => (
        <li
          key={key}
          className="flex flex-col gap-2 border-t border-awc-border/80 px-3 py-3 first:border-t-0 motion-safe:animate-pulse"
        >
          <span className="h-4 w-4/5 rounded bg-awc-fill" />
          <span className="h-3 w-2/5 rounded bg-awc-fill" />
        </li>
      ))}
    </ul>
  );
}

export function AwcProjectReportsError({
  onRetry,
}: {
  readonly onRetry: () => void;
}) {
  return (
    <div role="alert" className={BOX}>
      <p className="text-[13px]">{C["reports.error"]}</p>
      <button
        type="button"
        className={PANEL_BUTTON_SECONDARY_CLASS}
        onClick={onRetry}
      >
        {C["reports.error.retry"]}
      </button>
    </div>
  );
}

export function AwcProjectReportsEmpty() {
  return (
    <div className={BOX}>
      <p className="text-[15px] font-semibold text-awc-fg">No reports yet</p>
      <p className="text-[13px]">{C["reports.empty"]}</p>
    </div>
  );
}

export function AwcProjectReportsNoMatch({
  onClear,
}: {
  readonly onClear: () => void;
}) {
  return (
    <div className={BOX}>
      <p className="text-[13px]">{C["reports.filter.empty"]}</p>
      <button
        type="button"
        className={PANEL_BUTTON_SECONDARY_CLASS}
        onClick={onClear}
      >
        Clear filters
      </button>
    </div>
  );
}
