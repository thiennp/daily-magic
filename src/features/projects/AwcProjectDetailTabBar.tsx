"use client";

import {
  PROJECT_PAGE_TAB_IDS,
  PROJECT_PAGE_TAB_LABELS,
  type ProjectPageTabId,
} from "@/features/projects/projectPageTabs.constant";
import { ACTIVITY_UNREAD_BADGE_CLASS } from "@/features/projects/messenger/activityChrome.constant";

interface AwcProjectDetailTabBarProps {
  readonly activeTab: ProjectPageTabId;
  readonly onTabChange: (tab: ProjectPageTabId) => void;
  /** Soft badge: Activity unread from messenger threads (hidden at 0). */
  readonly activityUnreadCount?: number;
  /** Neutral badge: active pitfalls (hidden at 0 / while loading). */
  readonly pitfallsCount?: number;
}

/** Active tab uses existing black/gray chrome — no new accent palette. */
const TAB_BASE =
  "shrink-0 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40 dark:focus-visible:ring-gray-500/40";
const TAB_ACTIVE =
  "border-gray-900 text-gray-900 dark:border-white dark:text-white";
const TAB_COUNT_BADGE =
  "inline-grid h-[18px] min-w-[18px] place-items-center rounded-full bg-gray-100 px-1.5 text-[11px] font-medium text-gray-600 dark:bg-white/10 dark:text-gray-300";
const TAB_INACTIVE =
  "border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200";

export default function AwcProjectDetailTabBar({
  activeTab,
  onTabChange,
  activityUnreadCount = 0,
  pitfallsCount = 0,
}: AwcProjectDetailTabBarProps) {
  return (
    <div
      role="tablist"
      aria-label="Project sections"
      className="flex gap-1 overflow-x-auto border-b border-gray-200 [-ms-overflow-style:none] [scrollbar-width:none] dark:border-gray-800 [&::-webkit-scrollbar]:hidden"
    >
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
            <span className="inline-flex items-center gap-1.5">
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
