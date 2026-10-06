"use client";

import {
  PROJECT_PAGE_TAB_IDS,
  PROJECT_PAGE_TAB_LABELS,
  type ProjectPageTabId,
} from "@/features/projects/projectPageTabs.constant";
import { PROJECT_PAGE_LAYOUT_V2_COPY } from "@/features/projects/projectPageLayoutV2Copy.constant";
import { ACTIVITY_UNREAD_BADGE_CLASS } from "@/features/projects/messenger/activityChrome.constant";

interface AwcProjectDetailTabBarProps {
  readonly activeTab: ProjectPageTabId;
  readonly onTabChange: (tab: ProjectPageTabId) => void;
  /** Soft badge: Activity unread from messenger threads (hidden at 0). */
  readonly activityUnreadCount?: number;
  /** Neutral badge: active safety rules (hidden at 0 / while loading). */
  readonly pitfallsCount?: number;
}

/** iOS segmented control — gray fill track, white/black selected (no Apple blue). */
const TABLIST_CLASS =
  "flex max-w-full gap-0.5 self-start overflow-x-auto rounded-xl bg-gray-100 p-[3px] [-ms-overflow-style:none] [scrollbar-width:none] dark:bg-white/10 [&::-webkit-scrollbar]:hidden";
const TAB_BASE =
  "inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-[9px] border-0 px-4 py-[7px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40 dark:focus-visible:ring-gray-500/40";
const TAB_ACTIVE =
  "bg-white text-gray-900 shadow-sm dark:bg-gray-950 dark:text-white dark:shadow-[0_1px_2px_rgba(0,0,0,0.45)]";
const TAB_INACTIVE =
  "bg-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200";
const TAB_COUNT_BADGE =
  "inline-grid h-[18px] min-w-[20px] place-items-center rounded-full bg-gray-200/90 px-1.5 text-[11px] font-medium tabular-nums text-gray-600 dark:bg-white/10 dark:text-gray-300";

export default function AwcProjectDetailTabBar({
  activeTab,
  onTabChange,
  activityUnreadCount = 0,
  pitfallsCount = 0,
}: AwcProjectDetailTabBarProps) {
  const copy = PROJECT_PAGE_LAYOUT_V2_COPY;
  return (
    <div role="tablist" aria-label={copy.tablistLabel} className={TABLIST_CLASS}>
      {PROJECT_PAGE_TAB_IDS.map((tabId) => {
        const selected = tabId === activeTab;
        const showUnread = tabId === "activity" && activityUnreadCount > 0;
        const showPitfallsCount = tabId === "pitfalls" && pitfallsCount > 0;
        return (
          <button
            key={tabId}
            type="button"
            role="tab"
            id={`project-tab-${tabId}`}
            aria-selected={selected}
            aria-controls={`project-tabpanel-${tabId}`}
            tabIndex={selected ? 0 : -1}
            className={`${TAB_BASE} ${selected ? TAB_ACTIVE : TAB_INACTIVE}`}
            onClick={() => {
              onTabChange(tabId);
            }}
          >
            <span className="inline-flex items-center gap-2">
              {PROJECT_PAGE_TAB_LABELS[tabId]}
              {showUnread ? (
                <span
                  className={ACTIVITY_UNREAD_BADGE_CLASS}
                  aria-label={`${activityUnreadCount} unread`}
                >
                  {activityUnreadCount}
                </span>
              ) : null}
              {showPitfallsCount ? (
                <span className={TAB_COUNT_BADGE}>{pitfallsCount}</span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
