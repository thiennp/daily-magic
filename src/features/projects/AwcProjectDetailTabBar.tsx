"use client";

import {
  PROJECT_PAGE_TAB_IDS,
  PROJECT_PAGE_TAB_LABELS,
  type ProjectPageTabId,
} from "@/features/projects/projectPageTabs.constant";

interface AwcProjectDetailTabBarProps {
  readonly activeTab: ProjectPageTabId;
  readonly onTabChange: (tab: ProjectPageTabId) => void;
  /** Real messenger unread total for Activity alert badge (hidden at 0). */
  readonly activityUnreadCount?: number;
}

/** Active tab uses existing black/gray chrome — no new accent palette. */
const TAB_BASE =
  "shrink-0 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40 dark:focus-visible:ring-gray-500/40";
const TAB_ACTIVE =
  "border-gray-900 text-gray-900 dark:border-white dark:text-white";
const TAB_INACTIVE =
  "border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200";

export default function AwcProjectDetailTabBar({
  activeTab,
  onTabChange,
  activityUnreadCount = 0,
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
                <span className="inline-flex min-w-[1.15rem] items-center justify-center rounded-full bg-gray-900 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white dark:bg-white dark:text-gray-900">
                  {activityUnreadCount}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
