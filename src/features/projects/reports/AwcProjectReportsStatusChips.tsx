"use client";

import {
  PITFALL_CHIP_ACTIVE_CLASS,
  PITFALL_CHIP_IDLE_CLASS,
} from "@/features/projects/pitfalls/pitfallsChrome.constant";
import { PROJECT_PAGE_REPORTS_COPY as C } from "@/features/projects/reports/projectPageReportsCopy.constant";
import type { ReportStatusFilter } from "@/features/projects/reports/utils/projectReportStatus";

const CHIPS: readonly (readonly [ReportStatusFilter, string])[] = [
  ["all", C["reports.filter.all"]],
  ["done", "Done"],
  ["failed", "Failed"],
  ["running", "Running"],
  ["needs", "Needs you"],
];

interface Props {
  readonly value: ReportStatusFilter;
  readonly counts: Readonly<Record<ReportStatusFilter, number>>;
  readonly onSelect: (status: ReportStatusFilter) => void;
}

/** Status filter chips with live counts. */
export default function AwcProjectReportsStatusChips({
  value,
  counts,
  onSelect,
}: Props) {
  return (
    <div
      role="group"
      aria-label={C["reports.filter.aria"]}
      className="flex flex-wrap gap-2"
    >
      {CHIPS.map(([chip, label]) => (
        <button
          key={chip}
          type="button"
          aria-pressed={value === chip}
          className={
            value === chip ? PITFALL_CHIP_ACTIVE_CLASS : PITFALL_CHIP_IDLE_CLASS
          }
          onClick={() => {
            onSelect(chip);
          }}
        >
          {label}
          <span className="tabular-nums opacity-70">{counts[chip]}</span>
        </button>
      ))}
    </div>
  );
}
