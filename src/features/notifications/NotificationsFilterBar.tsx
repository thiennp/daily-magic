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

export type NotificationsFilterCounts = Readonly<
  Record<NotificationsFilterId, number>
>;

interface NotificationsFilterBarProps {
  readonly activeFilter: NotificationsFilterId;
  readonly onFilterChange: (filter: NotificationsFilterId) => void;
  readonly counts: NotificationsFilterCounts;
  readonly idPrefix?: string;
  readonly popover?: boolean;
}

export default function NotificationsFilterBar({
  activeFilter,
  onFilterChange,
  counts,
  idPrefix = "notifications",
  popover = false,
}: NotificationsFilterBarProps) {
  return (
    <div
      role="group"
      aria-label={
        popover
          ? NOTIFICATIONS_COPY.filterGroupLabelPopover
          : NOTIFICATIONS_COPY.filterGroupLabel
      }
      className={PROJECT_V5_TABLIST_CLASS}
    >
      {NOTIFICATIONS_FILTERS.map((filter) => {
        const selected = filter.id === activeFilter;
        const count = counts[filter.id];
        const warn = filter.id === "approvals" && count > 0;
        return (
          <button
            key={filter.id}
            type="button"
            id={`${idPrefix}-filter-${filter.id}`}
            aria-pressed={selected}
            className={`${PROJECT_V5_TAB_BASE_CLASS} ${selected ? PROJECT_V5_TAB_ACTIVE_CLASS : PROJECT_V5_TAB_INACTIVE_CLASS}`}
            onClick={() => {
              onFilterChange(filter.id);
            }}
          >
            {filter.label}{" "}
            <span
              aria-hidden="true"
              className={
                warn ? "font-semibold text-awc-warn dark:text-amber-200" : ""
              }
              data-warn={warn ? "true" : undefined}
            >
              {count}
            </span>
            <span className="sr-only"> ({count})</span>
          </button>
        );
      })}
    </div>
  );
}
