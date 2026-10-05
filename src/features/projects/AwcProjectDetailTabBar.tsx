"use client";

import {
  PROJECT_PAGE_TAB_IDS,
  PROJECT_PAGE_TAB_LABELS,
  type ProjectPageTabId,
} from "@/features/projects/projectPageTabs.constant";

interface AwcProjectDetailTabBarProps {
  readonly activeTab: ProjectPageTabId;
  readonly onTabChange: (tab: ProjectPageTabId) => void;
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
}: AwcProjectDetailTabBarProps) {
  return (
    <div
      role="tablist"
      aria-label="Project sections"
      className="flex gap-1 overflow-x-auto border-b border-gray-200 [-ms-overflow-style:none] [scrollbar-width:none] dark:border-gray-800 [&::-webkit-scrollbar]:hidden"
    >
      {PROJECT_PAGE_TAB_IDS.map((tabId) => {
        const selected = tabId === activeTab;
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
            {PROJECT_PAGE_TAB_LABELS[tabId]}
          </button>
        );
      })}
    </div>
  );
}
