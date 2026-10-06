"use client";

import type { OverviewPitfallsSummary } from "@/features/projects/overview/summarizeOverviewPitfalls";
import {
  OVERVIEW_CARD_CLASS,
  OVERVIEW_CTA_GHOST_SM_CLASS,
} from "@/features/projects/overview/overviewChrome.constant";
import { PROJECT_PAGE_OVERVIEW_COPY as C } from "@/features/projects/overview/projectPageOverviewCopy.constant";
import { PROJECT_PITFALL_MAX_ACTIVE } from "@agent-witch/shared/pitfalls";

interface Props {
  readonly summary: OverviewPitfallsSummary | null;
  readonly isLoading: boolean;
  readonly onView: () => void;
}

export default function AwcProjectOverviewPitfallsCard({
  summary,
  isLoading,
  onView,
}: Props) {
  const body = (() => {
    if (isLoading) {
      return C.safetyLoading;
    }
    if (summary === null || summary.active === 0) {
      return C.safetyEmpty;
    }
    const hits =
      summary.totalHits === 0
        ? C.safetyHitsNone
        : C.safetyHitsSome(summary.totalHits);
    return C.safetySummary(
      summary.important,
      summary.warning,
      summary.note,
      summary.active,
      PROJECT_PITFALL_MAX_ACTIVE,
      hits,
    );
  })();

  return (
    <section className={OVERVIEW_CARD_CLASS} aria-labelledby="overview-safety-h">
      <div className="flex items-center justify-between gap-2">
        <h3
          id="overview-safety-h"
          className="text-[15.5px] font-semibold text-awc-fg dark:text-white"
        >
          {C.safetyTitle}
        </h3>
        <button type="button" className={OVERVIEW_CTA_GHOST_SM_CLASS} onClick={onView}>
          {C.safetyView}
        </button>
      </div>
      <p className="text-[13px] text-awc-fg-muted dark:text-gray-400">{body}</p>
    </section>
  );
}
