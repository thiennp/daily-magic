"use client";

import {
  NOTIFICATIONS_COPY,
  NOTIFICATIONS_FILTERS,
  type NotificationsFilterId,
} from "@/features/notifications/notificationsCopy.constant";
import {
  PROJECT_V5_TAB_ACTIVE_CLASS,
  PROJECT_V5_TAB_BASE_CLASS,
  PROJECT_V5_TAB_INACTIVE_CLASS,
  PROJECT_V5_TABLIST_CLASS,
} from "@/features/projects/projectPageV5ChromeClasses.constant";

interface NotificationsFilterBarProps {
  readonly activeFilter: NotificationsFilterId;
  readonly onFilterChange: (filter: NotificationsFilterId) => void;
  readonly idPrefix?: string;
}

export default function NotificationsFilterBar({
  activeFilter,
  onFilterChange,
  idPrefix = "notifications",
}: NotificationsFilterBarProps) {
  return (
    <div
      role="tablist"
      aria-label={NOTIFICATIONS_COPY.h1}
      className={PROJECT_V5_TABLIST_CLASS}
    >
      {NOTIFICATIONS_FILTERS.map((filter) => {
        const selected = filter.id === activeFilter;
        return (
          <button
            key={filter.id}
            type="button"
            role="tab"
            id={`${idPrefix}-filter-${filter.id}`}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            className={`${PROJECT_V5_TAB_BASE_CLASS} ${selected ? PROJECT_V5_TAB_ACTIVE_CLASS : PROJECT_V5_TAB_INACTIVE_CLASS}`}
            onClick={() => {
              onFilterChange(filter.id);
            }}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
