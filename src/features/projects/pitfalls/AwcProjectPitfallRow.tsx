import { AWC_PROJECT_PITFALLS_COPY } from "@/features/projects/pitfalls/awcProjectPitfallsCopy.constant";
import type { AwcProjectPitfallRow as Row } from "@/features/projects/pitfalls/buildAwcProjectPitfallRows";

const SEVERITY_BADGE_CLASS = {
  block:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300",
  warn: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300",
  info: "border-awc-border bg-awc-surface-2 text-awc-fg-muted dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300",
} as const;

const AwcProjectPitfallRow = ({ row }: { readonly row: Row }) => (
  <li className="space-y-1 rounded-lg border border-awc-border/70 bg-white/70 px-3 py-2 dark:border-gray-800/70 dark:bg-white/[0.03]">
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-medium">{row.title}</span>
      <span
        className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${SEVERITY_BADGE_CLASS[row.severity]}`}
      >
        {row.severityLabel}
      </span>
      <span className="text-xs text-awc-fg-muted dark:text-gray-400">
        {row.sourceLabel}
      </span>
    </div>
    <p className="text-sm text-awc-fg dark:text-gray-200">
      <span className="font-medium">{AWC_PROJECT_PITFALLS_COPY.fixLabel}:</span>{" "}
      {row.fix}
    </p>
    {row.triggers.length > 0 ? (
      <p className="text-xs text-awc-fg-muted dark:text-gray-400">
        {AWC_PROJECT_PITFALLS_COPY.triggersLabel}: {row.triggers.join(", ")}
      </p>
    ) : null}
    <p className="text-xs text-awc-fg-muted dark:text-gray-400">
      {row.lastHitLabel}
    </p>
    <p className="text-xs text-awc-fg-muted dark:text-gray-400">
      {row.updatedLabel}
    </p>
  </li>
);

export default AwcProjectPitfallRow;
