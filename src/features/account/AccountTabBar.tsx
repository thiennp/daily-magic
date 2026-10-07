"use client";

import {
  ACCOUNT_COPY,
  ACCOUNT_TABS,
  type AccountTabId,
} from "@/features/account/accountCopy.constant";
import {
  PROJECT_V5_TAB_ACTIVE_CLASS,
  PROJECT_V5_TAB_BASE_CLASS,
  PROJECT_V5_TAB_INACTIVE_CLASS,
  PROJECT_V5_TABLIST_CLASS,
} from "@/features/projects/projectPageV5ChromeClasses.constant";

interface AccountTabBarProps {
  readonly activeTab: AccountTabId;
  readonly onTabChange: (tab: AccountTabId) => void;
}

export default function AccountTabBar({
  activeTab,
  onTabChange,
}: AccountTabBarProps) {
  return (
    <div
      role="tablist"
      aria-label={ACCOUNT_COPY.h1}
      className={PROJECT_V5_TABLIST_CLASS}
    >
      {ACCOUNT_TABS.map((tab) => {
        const selected = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`account-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`account-tabpanel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            className={`${PROJECT_V5_TAB_BASE_CLASS} ${selected ? PROJECT_V5_TAB_ACTIVE_CLASS : PROJECT_V5_TAB_INACTIVE_CLASS}`}
            onClick={() => {
              onTabChange(tab.id);
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
