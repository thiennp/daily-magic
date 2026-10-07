"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import {
  APP_SURFACE_CTA_SECONDARY_SM_CLASS,
  APP_SURFACE_TEXT_LINK_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import {
  NOTIFICATIONS_BREADCRUMB_CLASS,
  NOTIFICATIONS_TIP_CLASS,
} from "@/features/notifications/notificationsClasses.constant";
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
import NotificationsLoadError from "@/features/notifications/NotificationsLoadError";
import NotificationsSignedOutView from "@/features/notifications/NotificationsSignedOutView";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";
import { PROJECT_V5_H1_CLASS } from "@/features/projects/projectPageV5ChromeClasses.constant";

type LoadState = "ready" | "loading" | "error";

export default function NotificationsPageClient() {
  const { data: session, status } = useSession();
  const [filter, setFilter] = useState<NotificationsFilterId>("all");
  const [items, setItems] = useState<NotificationItem[]>(() => [
    ...NOTIFICATIONS_DEMO_ITEMS,
  ]);
  const [loadState, setLoadState] = useState<LoadState>("ready");

  const visible = useMemo(
    () => filterNotificationItems(items, filter),
    [items, filter],
  );
  const unreadCount = useMemo(() => countUnread(items), [items]);

  const onDecide = useCallback(
    (id: string, decision: "approved" | "denied") => {
      setItems((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;
          if (item.kind !== "join" && item.kind !== "run") return item;
          return {
            ...item,
            state: decision,
            unread: false,
            doneAtLabel: "just now",
          };
        }),
      );
    },
    [],
  );

  const onMarkRead = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, unread: false } : item,
      ),
    );
  }, []);

  const onMarkAllRead = useCallback(() => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })));
  }, []);

  const onRetry = useCallback(() => {
    setLoadState("loading");
    window.setTimeout(() => {
      setItems([...NOTIFICATIONS_DEMO_ITEMS]);
      setLoadState("ready");
    }, 200);
  }, []);

  if (status === "loading") {
    return (
      <p
        className="text-sm text-awc-fg-muted dark:text-gray-400"
        role="status"
        aria-live="polite"
      >
        {NOTIFICATIONS_COPY.loading}
      </p>
    );
  }

  if (status === "unauthenticated" || !session?.user) {
    return <NotificationsSignedOutView />;
  }

  return (
    <div className={APP_PAGE_STACK_CLASS} data-testid="notifications-page">
      <nav aria-label="Breadcrumb" className={NOTIFICATIONS_BREADCRUMB_CLASS}>
        <span>{NOTIFICATIONS_COPY.breadcrumbRoot}</span>
        <span aria-hidden>›</span>
        <span>{NOTIFICATIONS_COPY.h1}</span>
      </nav>

      <header className="space-y-2">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className={PROJECT_V5_H1_CLASS}>{NOTIFICATIONS_COPY.h1}</h1>
            <p className={NOTIFICATIONS_TIP_CLASS}>{NOTIFICATIONS_COPY.tip}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
              disabled={unreadCount === 0 || loadState !== "ready"}
              onClick={onMarkAllRead}
            >
              {NOTIFICATIONS_COPY.markAllRead}
            </button>
            <Link
              href={NOTIFICATIONS_COPY.settingsHref}
              className={APP_SURFACE_TEXT_LINK_CLASS}
            >
              {NOTIFICATIONS_COPY.settingsLink}
              <span className="sr-only"> {NOTIFICATIONS_COPY.settingsSr}</span>
            </Link>
          </div>
        </div>
        <p className={NOTIFICATIONS_TIP_CLASS}>
          {NOTIFICATIONS_COPY.accessOrientation}
        </p>
      </header>

      <NotificationsFilterBar
        activeFilter={filter}
        onFilterChange={setFilter}
        idPrefix="notifications-page"
      />

      {loadState === "loading" ? (
        <p className="text-sm text-awc-fg-muted dark:text-gray-400" role="status">
          {NOTIFICATIONS_COPY.loading}
        </p>
      ) : null}

      {loadState === "error" ? (
        <NotificationsLoadError onRetry={onRetry} />
      ) : null}

      {loadState === "ready" && visible.length === 0 ? (
        <NotificationsEmptyState filter={filter} />
      ) : null}

      {loadState === "ready" && visible.length > 0 ? (
        <ul className="flex flex-col gap-3" aria-label={NOTIFICATIONS_COPY.h1}>
          {visible.map((item) => (
            <li key={item.id}>
              <NotificationsItemCard
                item={item}
                onDecide={onDecide}
                onMarkRead={onMarkRead}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
