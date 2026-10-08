import AwcProjectConnectionsSummary from "@/features/projects/settings/connections/AwcProjectConnectionsSummary";
import type { ProjectConnectionItem } from "@/features/projects/settings/connections/projectConnection.types";
import { PROJECT_CONNECTIONS_COPY as C } from "@/features/projects/settings/connections/projectConnectionsCopy.constant";

/** Heading + (i) tip + lede + summary pill. */
export default function AwcProjectConnectionsHeading({
  rows,
  showSummary,
}: {
  readonly rows: readonly ProjectConnectionItem[];
  readonly showSummary: boolean;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <h3
          id="p-set-conn-h"
          className="flex items-center gap-2 text-base font-semibold text-awc-fg dark:text-white/90"
        >
          {C.heading}
          <span className="group relative inline-flex">
            <button
              type="button"
              aria-label={C.aboutAria}
              aria-describedby="p-set-conn-tip"
              className="awc-focus-ring inline-grid size-[18px] cursor-help place-items-center rounded-full border border-awc-fg-subtle text-[11px] font-bold leading-none text-awc-fg-muted"
            >
              i
            </button>
            <span
              id="p-set-conn-tip"
              role="tooltip"
              className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max max-w-[16rem] -translate-x-1/2 rounded-awc-chip bg-awc-fg px-2.5 py-1.5 text-[13px] font-medium text-awc-surface opacity-0 shadow-awc-overlay transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
            >
              {C.vsConnectHint}
            </span>
          </span>
        </h3>
        <p className="mt-1 max-w-[60ch] text-[13px] text-awc-fg-muted dark:text-gray-400">
          {C.intro}
        </p>
        {rows.some((row) => !row.connectEnabled) ? (
          <p className="mt-1 text-[13px] font-medium text-awc-fg-muted dark:text-gray-400">
            {C.comingSoonNote}
          </p>
        ) : null}
      </div>
      {showSummary ? <AwcProjectConnectionsSummary rows={rows} /> : null}
    </div>
  );
}
