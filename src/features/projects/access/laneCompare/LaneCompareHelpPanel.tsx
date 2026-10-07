"use client";

import { LANE_COMPARE_COPY } from "@/features/projects/access/laneCompare/laneCompareCopy.constant";

/** Presentational compare help: title + two path cards + diffs. */
export default function LaneCompareHelpPanel() {
  const copy = LANE_COMPARE_COPY;
  return (
    <div className="space-y-4" data-testid="lane-compare-help-panel">
      <h2 className="text-lg font-semibold tracking-tight text-awc-fg dark:text-white">
        {copy.title}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <PathCard
          label={copy.codingTools.label}
          when={copy.codingTools.when}
          where={copy.codingTools.where}
        />
        <PathCard
          label={copy.assistant.label}
          when={copy.assistant.when}
          where={copy.assistant.where}
        />
      </div>
      <div className="space-y-2 rounded-xl border border-awc-border bg-awc-tile/50 p-3 text-sm text-awc-fg-muted dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-300">
        <p>{copy.diff.results}</p>
        <p>{copy.diff.approvals}</p>
      </div>
    </div>
  );
}

function PathCard(props: {
  readonly label: string;
  readonly when: string;
  readonly where: string;
}) {
  return (
    <article className="rounded-xl border border-awc-border bg-awc-surface p-3 shadow-awc-lift dark:border-gray-700 dark:bg-gray-900/60">
      <h3 className="text-sm font-semibold text-awc-fg dark:text-white">
        {props.label}
      </h3>
      <p className="mt-1 text-sm text-awc-fg-muted dark:text-gray-400">
        {props.when}
      </p>
      <p className="mt-2 text-xs font-medium text-awc-blue-700 dark:text-brand-300">
        {props.where}
      </p>
    </article>
  );
}
