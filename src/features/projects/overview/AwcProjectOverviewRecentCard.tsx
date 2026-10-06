"use client";

import type { OverviewRecentItem } from "@/features/projects/overview/buildOverviewRecentActivity";
import formatOverviewWhen from "@/features/projects/overview/formatOverviewWhen";
import {
  OVERVIEW_CARD_CLASS,
  OVERVIEW_CTA_GHOST_SM_CLASS,
  OVERVIEW_CTA_SECONDARY_SM_CLASS,
} from "@/features/projects/overview/overviewChrome.constant";
import { PROJECT_PAGE_OVERVIEW_COPY as C } from "@/features/projects/overview/projectPageOverviewCopy.constant";

interface Props {
  readonly items: readonly OverviewRecentItem[];
  readonly onViewAll: () => void;
  readonly onOpen: (id: string) => void;
}

export default function AwcProjectOverviewRecentCard({
  items,
  onViewAll,
  onOpen,
}: Props) {
  return (
    <section className={OVERVIEW_CARD_CLASS} aria-labelledby="overview-recent-h">
      <div className="flex items-center justify-between gap-2">
        <h3
          id="overview-recent-h"
          className="text-[15.5px] font-semibold text-awc-fg dark:text-white"
        >
          {C.recentTitle}
        </h3>
        <button type="button" className={OVERVIEW_CTA_GHOST_SM_CLASS} onClick={onViewAll}>
          {C.recentViewAll}
        </button>
      </div>
      {items.length === 0 ? (
        <p className="text-[13px] text-awc-fg-muted">{C.recentEmpty}</p>
      ) : (
        <ul className="flex flex-col">
          {items.map((item, index) => {
            const when = formatOverviewWhen(item.at, { lineStart: true });
            return (
              <li
                key={item.id}
                className={`flex items-start gap-3 py-2.5 ${
                  index === 0 ? "" : "border-t border-awc-border dark:border-gray-800"
                }`}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-awc-tile text-xs font-semibold text-awc-fg dark:bg-white/15">
                  {item.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-awc-fg dark:text-white">
                    {item.name}
                  </div>
                  <div className="truncate text-[12.5px] text-awc-fg-muted">{item.preview}</div>
                  {when ? (
                    <div className="text-[12px] text-awc-fg-subtle">{when}</div>
                  ) : null}
                </div>
                <button
                  type="button"
                  className={OVERVIEW_CTA_SECONDARY_SM_CLASS}
                  onClick={() => onOpen(item.id === "whole" ? "whole" : item.id)}
                >
                  {C.recentOpen}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
