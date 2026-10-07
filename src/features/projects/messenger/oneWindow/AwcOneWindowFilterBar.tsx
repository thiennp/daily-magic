import type { ReactNode } from "react";

"use client";

import {
  OW_FILTER_CHIP_ACTIVE_CLASS,
  OW_FILTER_CHIP_IDLE_CLASS,
} from "@/features/projects/messenger/oneWindow/awcOneWindowChrome.constant";
import { ONE_WINDOW_FEED_COPY } from "@/features/projects/messenger/oneWindow/oneWindowFeedCopy.constant";

export type OneWindowFeedFilter = "all" | "needs" | "approvals";

interface AwcOneWindowFilterBarProps {
  readonly filter: OneWindowFeedFilter;
  readonly needsCount?: number;
  readonly approvalsCount?: number;
  readonly onFilter: (next: OneWindowFeedFilter) => void;
  /** Owner Clear all control (archive fiction) — passed from live clear bar. */
  readonly clearAllSlot?: ReactNode;
}

/** Filter chips All · Needs you · Approvals (OW-H1). */
export default function AwcOneWindowFilterBar({
  filter,
  needsCount = 0,
  approvalsCount = 0,
  onFilter,
  clearAllSlot,
}: AwcOneWindowFilterBarProps) {
  const copy = ONE_WINDOW_FEED_COPY;
  const chip = (id: OneWindowFeedFilter, label: string, n?: number) => {
    const active = filter === id;
    return (
      <button
        type="button"
        className={active ? OW_FILTER_CHIP_ACTIVE_CLASS : OW_FILTER_CHIP_IDLE_CLASS}
        aria-pressed={active}
        onClick={() => {
          onFilter(id);
        }}
      >
        {label}
        {typeof n === "number" && n > 0 ? (
          <span className="rounded-full bg-awc-tile-2 px-1.5 text-[11px] font-semibold text-awc-fg">
            {n}
          </span>
        ) : null}
      </button>
    );
  };
  return (
    <div
      className="flex flex-wrap items-center gap-2 border-b border-awc-border bg-awc-surface-2 px-4 py-2.5"
      role="group"
      aria-label="Filter messages"
    >
      {chip("all", copy.filterAll)}
      {chip("needs", copy.filterNeedsYou, needsCount)}
      {chip("approvals", copy.filterApprovals, approvalsCount)}
      <span className="flex-1" />
      {clearAllSlot}
    </div>
  );
}
