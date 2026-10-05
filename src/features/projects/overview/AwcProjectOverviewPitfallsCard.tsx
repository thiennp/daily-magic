"use client";

import type { OverviewPitfallsSummary } from "@/features/projects/overview/summarizeOverviewPitfalls";
import {
  OVERVIEW_CARD_CLASS,
  OVERVIEW_CTA_SECONDARY_SM_CLASS,
  OVERVIEW_PILL_NEUTRAL_CLASS,
  OVERVIEW_SEVERITY_BLOCK_CLASS,
  OVERVIEW_SEVERITY_WARN_CLASS,
} from "@/features/projects/overview/overviewChrome.constant";
import { PROJECT_PAGE_OVERVIEW_COPY as C } from "@/features/projects/overview/projectPageOverviewCopy.constant";

interface AwcProjectOverviewPitfallsCardProps {
  readonly summary: OverviewPitfallsSummary | null;
  readonly isLoading: boolean;
  readonly onView: () => void;
}

export default function AwcProjectOverviewPitfallsCard({
  summary,
  isLoading,
  onView,
}: AwcProjectOverviewPitfallsCardProps) {
  return (
    <section className={OVERVIEW_CARD_CLASS} aria-labelledby="overview-pits-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2
          id="overview-pits-title"
          className="text-[17px] font-semibold tracking-tight text-gray-900 dark:text-white"
        >
          {C.pitfallsTitle}
        </h2>
        <button
          type="button"
          className={OVERVIEW_CTA_SECONDARY_SM_CLASS}
          onClick={onView}
        >
          {C.pitfallsView}
        </button>
      </div>
      {isLoading ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">{C.pitfallsLoading}</p>
      ) : summary === null || summary.active === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">{C.pitfallsEmpty}</p>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-2">
            {summary.mustFix > 0 ? (
              <span className={OVERVIEW_SEVERITY_BLOCK_CLASS}>
                {C.pitfallsMust(summary.mustFix)}
              </span>
            ) : null}
            {summary.warning > 0 ? (
              <span className={OVERVIEW_SEVERITY_WARN_CLASS}>
                {C.pitfallsWarn(summary.warning)}
              </span>
            ) : null}
            <span className={OVERVIEW_PILL_NEUTRAL_CLASS}>
              {summary.totalHits === 0
                ? C.pitfallsNeverHit
                : C.pitfallsHit(summary.totalHits)}
            </span>
          </div>
          <p className="text-[13px] text-gray-500 dark:text-gray-400">{C.pitfallsBlurb}</p>
        </>
      )}
    </section>
  );
}
