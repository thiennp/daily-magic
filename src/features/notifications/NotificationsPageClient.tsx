"use client";

import { useCallback, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

import { NOTIFICATIONS_BREADCRUMB_CLASS } from "@/features/notifications/notificationsClasses.constant";
import {
  NOTIFICATIONS_COPY,
  type NotificationsFilterId,
} from "@/features/notifications/notificationsCopy.constant";
import { filterNotificationItems } from "@/features/notifications/notificationsDemoItems.constant";
import { readDemoFail } from "@/features/notifications/notificationsDemoLoader";
import NotificationsApprovalCallout from "@/features/notifications/NotificationsApprovalCallout";
import NotificationsEmptyState from "@/features/notifications/NotificationsEmptyState";
import NotificationsFilterBar from "@/features/notifications/NotificationsFilterBar";
import NotificationsList from "@/features/notifications/NotificationsList";
import NotificationsLoadError from "@/features/notifications/NotificationsLoadError";
import NotificationsOlderSection from "@/features/notifications/NotificationsOlderSection";
import NotificationsPageFooter from "@/features/notifications/NotificationsPageFooter";
import NotificationsPageHeader from "@/features/notifications/NotificationsPageHeader";
import NotificationsSignedOutView from "@/features/notifications/NotificationsSignedOutView";
import NotificationsSkeleton from "@/features/notifications/NotificationsSkeleton";
import { useNotificationsItems } from "@/features/notifications/useNotificationsItems";
import { useNotificationsOlder } from "@/features/notifications/useNotificationsOlder";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";

type LoadState = "ready" | "loading" | "error";

export default function NotificationsPageClient() {
  const { data: session, status } = useSession();
  const [filter, setFilter] = useState<NotificationsFilterId>("all");
  const [loadState, setLoadState] = useState<LoadState>(() =>
    readDemoFail() === "load" ? "error" : "ready",
  );
  const list = useNotificationsItems();
  const older = useNotificationsOlder(list.append);
  const { items, counts } = list;
  const visible = useMemo(
    () => filterNotificationItems(items, filter),
    [items, filter],
  );
  const ready = loadState === "ready";

  const onRetry = useCallback(() => {
    setLoadState("loading");
    window.setTimeout(() => {
      list.reset();
      setLoadState("ready");
    }, 200);
  }, [list]);

  if (status === "loading") return <NotificationsSkeleton />;
  if (status === "unauthenticated" || !session?.user)
    return <NotificationsSignedOutView />;

  const filterCounts = {
    all: items.length,
    unread: counts.unread,
    approvals: counts.pending,
  };
  return (
    <div className={APP_PAGE_STACK_CLASS} data-testid="notifications-page">
      <nav aria-label="Breadcrumb" className={NOTIFICATIONS_BREADCRUMB_CLASS}>
        <span>{NOTIFICATIONS_COPY.breadcrumbRoot}</span>
        <span aria-hidden>›</span>
        <span>{NOTIFICATIONS_COPY.h1}</span>
      </nav>
      <NotificationsPageHeader
        unread={counts.unread}
        pending={counts.pending}
        ready={ready}
        onMarkAllRead={list.onMarkAllRead}
      />
      <NotificationsFilterBar
        activeFilter={filter}
        onFilterChange={setFilter}
        counts={filterCounts}
        idPrefix="notifications-page"
      />
      {ready && filter !== "approvals" && counts.pending > 0 ? (
        <NotificationsApprovalCallout
          pending={counts.pending}
          onShow={() => setFilter("approvals")}
        />
      ) : null}
      {loadState === "loading" ? <NotificationsSkeleton /> : null}
      {loadState === "error" ? (
        <NotificationsLoadError onRetry={onRetry} />
      ) : null}
      {ready && visible.length === 0 ? (
        <NotificationsEmptyState filter={filter} />
      ) : null}
      {ready && visible.length > 0 ? (
        <NotificationsList
          items={visible}
          onDecide={list.onDecide}
          onMarkRead={list.onMarkRead}
        />
      ) : null}
      {ready && filter === "all" ? (
        <NotificationsOlderSection state={older.state} onLoad={older.load} />
      ) : null}
      <NotificationsPageFooter />
    </div>
  );
}
