"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

import {
  APP_SURFACE_CTA_SECONDARY_SM_CLASS,
  APP_SURFACE_TEXT_LINK_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import {
  NOTIFICATIONS_COPY,
  type NotificationsFilterId,
} from "@/features/notifications/notificationsCopy.constant";
import {
  NOTIFICATIONS_DEMO_ITEMS,
  countUnread,
  filterNotificationItems,
  type NotificationItem,
} from "@/features/notifications/notificationsDemoItems.constant";
import NotificationsEmptyState from "@/features/notifications/NotificationsEmptyState";
import NotificationsFilterBar from "@/features/notifications/NotificationsFilterBar";
import NotificationsItemCard from "@/features/notifications/NotificationsItemCard";

interface NotificationDropdownPanelProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onToggle: () => void;
  readonly onUnreadChange?: (count: number) => void;
}

const POPOVER_PREVIEW_LIMIT = 6;

export default function NotificationDropdownPanel({
  isOpen,
  onClose,
  onToggle,
  onUnreadChange,
}: NotificationDropdownPanelProps) {
  const [filter, setFilter] = useState<NotificationsFilterId>("all");
  const [items, setItems] = useState<NotificationItem[]>(() => [
    ...NOTIFICATIONS_DEMO_ITEMS,
  ]);

  const visible = useMemo(() => {
    const filtered = filterNotificationItems(items, filter);
    return filtered.slice(0, POPOVER_PREVIEW_LIMIT);
  }, [items, filter]);

  const unreadCount = useMemo(() => countUnread(items), [items]);

  const notifyUnread = useCallback(
    (next: NotificationItem[]) => {
      onUnreadChange?.(countUnread(next));
    },
    [onUnreadChange],
  );

  const onDecide = useCallback(
    (id: string, decision: "approved" | "denied") => {
      setItems((prev) => {
        const next = prev.map((item) => {
          if (item.id !== id) return item;
          if (item.kind !== "join" && item.kind !== "run") return item;
          return {
            ...item,
            state: decision,
            unread: false,
            doneAtLabel: "just now",
          };
        });
        notifyUnread(next);
        return next;
      });
    },
    [notifyUnread],
  );

  const onMarkRead = useCallback(
    (id: string) => {
      setItems((prev) => {
        const next = prev.map((item) =>
          item.id === id ? { ...item, unread: false } : item,
        );
        notifyUnread(next);
        return next;
      });
    },
    [notifyUnread],
  );

  const onMarkAllRead = useCallback(() => {
    setItems((prev) => {
      const next = prev.map((item) => ({ ...item, unread: false }));
      notifyUnread(next);
      return next;
    });
  }, [notifyUnread]);

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={onClose}
      className="absolute -right-[240px] mt-[17px] flex max-h-[540px] w-[350px] flex-col rounded-2xl border border-awc-border bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[400px] lg:right-0"
    >
      <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-700">
        <h5 className="text-lg font-semibold text-awc-fg dark:text-gray-200">
          {NOTIFICATIONS_COPY.popoverTitle}
        </h5>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
            disabled={unreadCount === 0}
            onClick={onMarkAllRead}
          >
            {NOTIFICATIONS_COPY.markAllRead}
          </button>
          <button
            type="button"
            aria-label="Close notifications"
            onClick={onToggle}
            className="text-gray-500 transition dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-3">
        <NotificationsFilterBar
          activeFilter={filter}
          onFilterChange={setFilter}
          idPrefix="notifications-popover"
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
              compact
            />
          ))
        )}
      </div>

      <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
        <Link
          href={NOTIFICATIONS_COPY.seeAllHref}
          onClick={onClose}
          className="block rounded-lg border border-awc-border bg-white px-4 py-2 text-center text-sm font-medium text-awc-fg hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
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
