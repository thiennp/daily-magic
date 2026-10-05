"use client";

import type { OverviewRecentItem } from "@/features/projects/overview/buildOverviewRecentActivity";
import {
  OVERVIEW_CARD_CLASS,
  OVERVIEW_CTA_SECONDARY_SM_CLASS,
} from "@/features/projects/overview/overviewChrome.constant";
import { PROJECT_PAGE_OVERVIEW_COPY as C } from "@/features/projects/overview/projectPageOverviewCopy.constant";
import { formatRelativeTimeAgo } from "@/lib/time/formatRelativeTimeAgo";

interface AwcProjectOverviewRecentCardProps {
  readonly items: readonly OverviewRecentItem[];
  readonly onViewAll: () => void;
}

export default function AwcProjectOverviewRecentCard({
  items,
  onViewAll,
}: AwcProjectOverviewRecentCardProps) {
  return (
    <section className={OVERVIEW_CARD_CLASS} aria-labelledby="overview-recent-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2
          id="overview-recent-title"
          className="text-[17px] font-semibold tracking-tight text-gray-900 dark:text-white"
        >
          {C.recentTitle}
        </h2>
        <button
          type="button"
          className={OVERVIEW_CTA_SECONDARY_SM_CLASS}
          onClick={onViewAll}
        >
          {C.recentViewAll}
        </button>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">{C.recentEmpty}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => {
            const when = formatRelativeTimeAgo(item.at);
            return (
              <li key={item.id} className="flex items-start gap-3">
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gray-100 text-[11px] font-semibold text-gray-700 dark:bg-white/10 dark:text-gray-200"
                  aria-hidden
                >
                  {item.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <b className="block text-sm font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </b>
                  <small className="block truncate text-[12.5px] text-gray-500 dark:text-gray-400">
                    {item.preview}
                  </small>
                </div>
                {when ? (
                  <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400">
                    {when}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
