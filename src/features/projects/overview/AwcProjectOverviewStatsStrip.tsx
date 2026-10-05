"use client";

import type { ProjectPageTabId } from "@/features/projects/projectPageTabs.constant";
import { PROJECT_PAGE_OVERVIEW_COPY as C } from "@/features/projects/overview/projectPageOverviewCopy.constant";

export type OverviewStats = {
  readonly memberCount: number;
  readonly unreadCount: number;
  readonly pitfallsActive: number;
  readonly pitfallsMax: number;
  readonly compositionTotal: number;
  readonly showComposition: boolean;
};

interface AwcProjectOverviewStatsStripProps {
  readonly stats: OverviewStats;
  readonly onGoto: (tab: ProjectPageTabId) => void;
}

const STAT_CELL =
  "flex flex-col gap-0.5 bg-white px-4 py-3.5 text-left dark:bg-gray-950";
const STAT_BUTTON = `${STAT_CELL} transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-400/40 dark:hover:bg-gray-900`;

export default function AwcProjectOverviewStatsStrip({
  stats,
  onGoto,
}: AwcProjectOverviewStatsStripProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(7.5rem,1fr))] gap-px overflow-hidden rounded-[14px] border border-gray-200 bg-gray-200 dark:border-gray-800 dark:bg-gray-800">
      <button
        type="button"
        className={STAT_BUTTON}
        onClick={() => {
          onGoto("team");
        }}
      >
        <b className="text-[26px] font-semibold tabular-nums leading-tight text-gray-900 dark:text-white">
          {stats.memberCount}
        </b>
        <span className="text-[12.5px] text-gray-500 dark:text-gray-400">
          {C.membersStat}
        </span>
      </button>
      <button
        type="button"
        className={STAT_BUTTON}
        onClick={() => {
          onGoto("activity");
        }}
      >
        <b className="text-[26px] font-semibold tabular-nums leading-tight text-gray-900 dark:text-white">
          {stats.unreadCount}
        </b>
        <span className="text-[12.5px] text-gray-500 dark:text-gray-400">
          {C.unreadStat}
        </span>
      </button>
      <button
        type="button"
        className={STAT_BUTTON}
        onClick={() => {
          onGoto("pitfalls");
        }}
      >
        <b className="text-[26px] font-semibold tabular-nums leading-tight text-gray-900 dark:text-white">
          {stats.pitfallsActive}
          <small className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {" "}
            / {stats.pitfallsMax}
          </small>
        </b>
        <span className="text-[12.5px] text-gray-500 dark:text-gray-400">
          {C.pitfallsStat}
        </span>
      </button>
      {stats.showComposition ? (
        <div className={STAT_CELL}>
          <b className="text-[26px] font-semibold tabular-nums leading-tight text-gray-900 dark:text-white">
            {stats.compositionTotal}
          </b>
          <span className="text-[12.5px] text-gray-500 dark:text-gray-400">
            {C.compositionStat}
          </span>
        </div>
      ) : null}
    </div>
  );
}
