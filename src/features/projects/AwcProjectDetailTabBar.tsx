"use client";

import {
  PROJECT_PAGE_TAB_IDS,
  type ProjectPageTabId,
} from "@/features/projects/projectPageTabs.constant";
import { PROJECT_PAGE_LAYOUT_V2_COPY } from "@/features/projects/projectPageLayoutV2Copy.constant";
import {
  PROJECT_V5_TABLIST_CLASS,
  PROJECT_V5_TAB_ACTIVE_CLASS,
  PROJECT_V5_TAB_BASE_CLASS,
  PROJECT_V5_TAB_COUNT_CHIP_CLASS,
  PROJECT_V5_TAB_OPEN_COUNT_CLASS,
  PROJECT_V5_TAB_INACTIVE_CLASS,
} from "@/features/projects/projectPageV5ChromeClasses.constant";
import { PROJECT_PAGE_V5_CHROME_COPY } from "@/features/projects/projectPageV5ChromeCopy.constant";
import { PROJECT_PAGE_V5_TAB_LABELS } from "@/features/projects/projectPageV5Tabs.constant";

interface AwcProjectDetailTabBarProps {
  readonly activeTab: ProjectPageTabId;
  readonly onTabChange: (tab: ProjectPageTabId) => void;
  /** Safety rules: active Important rules — "{n} Important" (hidden at 0). */
  readonly rulesImportantCount?: number;
  /** Tasks tab: queued, running and stalled tasks (hidden at 0). */
  readonly openTasksCount?: number;
}

/** HN-H3 underline tabs; selected = Pine text + bar. Safety rules = amber count. */
export default function AwcProjectDetailTabBar({
  activeTab,
  onTabChange,
  rulesImportantCount = 0,
  openTasksCount = 0,
}: AwcProjectDetailTabBarProps) {
  const copy = PROJECT_PAGE_LAYOUT_V2_COPY;
  return (
    <div
      role="tablist"
      aria-label={copy.tablistLabel}
      className={PROJECT_V5_TABLIST_CLASS}
    >
      {PROJECT_PAGE_TAB_IDS.map((tabId) => {
        const selected = tabId === activeTab;
        const showImportant = tabId === "pitfalls" && rulesImportantCount > 0;
        return (
          <button
            key={tabId}
            type="button"
            role="tab"
            id={`project-tab-${tabId}`}
            aria-selected={selected}
            aria-controls={`project-tabpanel-${tabId}`}
            tabIndex={selected ? 0 : -1}
            className={`${PROJECT_V5_TAB_BASE_CLASS} ${selected ? PROJECT_V5_TAB_ACTIVE_CLASS : PROJECT_V5_TAB_INACTIVE_CLASS}`}
            onClick={() => {
              onTabChange(tabId);
            }}
          >
            {PROJECT_PAGE_V5_TAB_LABELS[tabId]}
            {showImportant ? (
              <span
                className={PROJECT_V5_TAB_COUNT_CHIP_CLASS}
                aria-label={PROJECT_PAGE_V5_CHROME_COPY[
                  "tabs.importantCountAria"
                ](rulesImportantCount)}
              >
                {PROJECT_PAGE_V5_CHROME_COPY["tabs.importantCount"](
                  rulesImportantCount,
                )}
              </span>
            ) : null}
            {tabId === "tasks" && openTasksCount > 0 ? (
              <span
                className={PROJECT_V5_TAB_OPEN_COUNT_CLASS}
                aria-label={PROJECT_PAGE_V5_CHROME_COPY[
                  "tabs.openTasksCountAria"
                ](openTasksCount)}
              >
                {PROJECT_PAGE_V5_CHROME_COPY["tabs.openTasksCount"](
                  openTasksCount,
                )}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
