"use client";

import {
  ACCOUNT_TABS,
  type AccountTabId,
} from "@/features/account/accountCopy.constant";
import {
  PROJECT_V5_TAB_ACTIVE_CLASS,
  PROJECT_V5_TAB_BASE_CLASS,
  PROJECT_V5_TAB_INACTIVE_CLASS,
  PROJECT_V5_TABLIST_CLASS,
} from "@/features/projects/public-api/types";

interface AccountTabBarProps {
  readonly activeTab: AccountTabId;
  readonly onTabChange: (tab: AccountTabId) => void;
}

const KEY_STEP: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };

export default function AccountTabBar({
  activeTab,
  onTabChange,
}: AccountTabBarProps) {
  const handleKeyDown = (event: React.KeyboardEvent): void => {
    const last = ACCOUNT_TABS.length - 1;
    const index = ACCOUNT_TABS.findIndex((tab) => tab.id === activeTab);
    const step = KEY_STEP[event.key];
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? last
          : step === undefined
            ? -1
            : (index + step + last + 1) % (last + 1);
    if (next < 0) {
      return;
    }
    event.preventDefault();
    const nextId = ACCOUNT_TABS[next].id;
    onTabChange(nextId);
    requestAnimationFrame(() => {
      document.getElementById(`account-tab-${nextId}`)?.focus();
    });
  };

  return (
    <div
      role="tablist"
      aria-label="Account sections"
      onKeyDown={handleKeyDown}
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
