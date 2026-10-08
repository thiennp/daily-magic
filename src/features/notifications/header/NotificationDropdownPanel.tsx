import Link from "next/link";
import { useMemo, useState } from "react";

import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import {
  NOTIFICATIONS_COPY,
  type NotificationsFilterId,
} from "@/features/notifications/notificationsCopy.constant";
import { filterNotificationItems } from "@/features/notifications/notificationsDemoItems.constant";
import NotificationDropdownHeader from "@/features/notifications/header/NotificationDropdownHeader";
import NotificationsEmptyState from "@/features/notifications/NotificationsEmptyState";
import NotificationsFilterBar from "@/features/notifications/NotificationsFilterBar";
import NotificationsItemCard from "@/features/notifications/NotificationsItemCard";
import {
  useNotificationsItems,
  type NotificationCounts,
} from "@/features/notifications/useNotificationsItems";

interface NotificationDropdownPanelProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onToggle: () => void;
  readonly onCountsChange?: (counts: NotificationCounts) => void;
}

const POPOVER_PREVIEW_LIMIT = 6;

export default function NotificationDropdownPanel({
  isOpen,
  onClose,
  onToggle,
  onCountsChange,
}: NotificationDropdownPanelProps) {
  const [filter, setFilter] = useState<NotificationsFilterId>("all");
  const { items, counts, onDecide, onMarkRead, onMarkAllRead } =
    useNotificationsItems(onCountsChange);
  const unreadCount = counts.unread;
  const filterCounts = {
    all: items.length,
    unread: counts.unread,
    approvals: counts.pending,
  };

  const visible = useMemo(
    () =>
      filterNotificationItems(items, filter).slice(0, POPOVER_PREVIEW_LIMIT),
    [items, filter],
  );

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={onClose}
      className="absolute right-0 mt-[17px] flex max-h-[540px] w-[350px] max-w-[calc(100vw-1rem)] flex-col rounded-2xl border border-awc-border bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[400px]"
    >
      <NotificationDropdownHeader
        canMarkAll={unreadCount > 0}
        onMarkAllRead={onMarkAllRead}
        onToggle={onToggle}
      />

      <div className="mb-3">
        <NotificationsFilterBar
          activeFilter={filter}
          onFilterChange={setFilter}
          counts={filterCounts}
          idPrefix="notifications-popover"
          popover
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto custom-scrollbar">
        {visible.length === 0 ? (
          <NotificationsEmptyState filter={filter} />
        ) : (
          visible.map((item) => (
            <NotificationsItemCard
              key={item.id}
              item={item}
              onDecide={onDecide}
              onMarkRead={onMarkRead}
            />
          ))
        )}
      </div>

      <div className="mt-3 flex flex-col gap-2 border-t border-awc-border pt-3 dark:border-gray-700">
        <Link
          href={NOTIFICATIONS_COPY.seeAllHref}
          onClick={onClose}
          className="block rounded-lg border border-awc-border bg-white px-4 py-2 text-center text-sm font-medium text-awc-fg hover:bg-awc-surface-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          {NOTIFICATIONS_COPY.seeAll}
        </Link>
        <Link
          href={NOTIFICATIONS_COPY.settingsHref}
          onClick={onClose}
          className={`${APP_SURFACE_TEXT_LINK_CLASS} text-center text-sm`}
        >
          {NOTIFICATIONS_COPY.settingsLink}
          <span className="sr-only"> {NOTIFICATIONS_COPY.settingsSr}</span>
        </Link>
      </div>
    </Dropdown>
  );
}
