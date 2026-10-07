"use client";

import Link from "next/link";

import {
  NOTIFICATIONS_CHIP_OUTLINE_CLASS,
  NOTIFICATIONS_ROW_CLASS,
  NOTIFICATIONS_ROW_DANGER_CLASS,
  NOTIFICATIONS_ROW_UNREAD_CLASS,
} from "@/features/notifications/notificationsClasses.constant";
import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";
import NotificationsApprovalActions from "@/features/notifications/NotificationsApprovalActions";
import NotificationsApprovalStatus from "@/features/notifications/NotificationsApprovalStatus";
import type { NotificationItem } from "@/features/notifications/notificationsDemoItems.constant";
import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface NotificationsItemCardProps {
  readonly item: NotificationItem;
  readonly onDecide: (
    id: string,
    decision: "approved" | "denied",
  ) => void;
  readonly onMarkRead: (id: string) => void;
  readonly compact?: boolean;
}

function rowClass(item: NotificationItem): string {
  const base = NOTIFICATIONS_ROW_CLASS;
  if (item.kind === "billpay" || item.kind === "fail") {
    return `${base} ${NOTIFICATIONS_ROW_DANGER_CLASS}`;
  }
  if (item.unread) {
    return `${base} ${NOTIFICATIONS_ROW_UNREAD_CLASS}`;
  }
  return base;
}

function metaLine(parts: readonly (string | undefined)[]): string {
  return parts.filter(Boolean).join(" · ");
}

export default function NotificationsItemCard({
  item,
  onDecide,
  onMarkRead,
  compact = false,
}: NotificationsItemCardProps) {
  const markReadButton =
    item.unread ? (
      <button
        type="button"
        className="text-[length:var(--awc-fs-sm)] font-medium text-awc-fg-muted underline-offset-2 hover:text-awc-fg hover:underline dark:text-gray-400 dark:hover:text-gray-200"
        onClick={() => {
          onMarkRead(item.id);
        }}
      >
        {NOTIFICATIONS_COPY.markRead}
      </button>
    ) : null;

  if (item.kind === "join") {
    const whoLine =
      item.whoKind === "assistant"
        ? metaLine([
            item.who,
            item.runs,
            item.role,
            item.delivery === "demand"
              ? NOTIFICATIONS_COPY.checksOnDemand
              : undefined,
          ])
        : metaLine([item.who, item.email, item.role]);
    return (
      <article
        className={rowClass(item)}
        data-testid={`notifications-item-${item.id}`}
        data-unread={item.unread ? "true" : "false"}
      >
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0 space-y-1">
              {item.unread ? (
                <span className="sr-only">{NOTIFICATIONS_COPY.unreadSr}</span>
              ) : null}
              <h3 className="text-sm font-semibold text-awc-fg dark:text-white">
                {item.who} asked to join {item.project}
              </h3>
              <p className="text-sm text-awc-fg-muted dark:text-gray-400">
                {whoLine}
              </p>
              {item.note ? (
                <p className="text-sm text-awc-fg dark:text-gray-200">
                  {item.note}
                </p>
              ) : null}
              {item.owner ? (
                <p className="text-sm text-awc-fg-muted dark:text-gray-400">
                  Owner: {item.owner}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col items-end gap-1">
              <NotificationsApprovalStatus state={item.state} />
              <time className="text-[length:var(--awc-fs-sm)] text-awc-fg-muted dark:text-gray-400">
                {item.atLabel}
              </time>
            </div>
          </div>
          {item.state === "approved" && item.doneAtLabel ? (
            <p className="text-sm text-awc-fg-muted dark:text-gray-400">
              {NOTIFICATIONS_COPY.approvedByYou.replace(
                "{when}",
                item.doneAtLabel,
              )}
            </p>
          ) : null}
          {item.state === "denied" && item.doneAtLabel ? (
            <p className="text-sm text-awc-fg-muted dark:text-gray-400">
              {NOTIFICATIONS_COPY.deniedByYou.replace(
                "{when}",
                item.doneAtLabel,
              )}
            </p>
          ) : null}
          <NotificationsApprovalActions item={item} onDecide={onDecide} />
          <div className="flex flex-wrap items-center gap-3">
            <span className={NOTIFICATIONS_CHIP_OUTLINE_CLASS}>
              {item.project}
            </span>
            {markReadButton}
          </div>
        </div>
      </article>
    );
  }

  if (item.kind === "run") {
    return (
      <article
        className={rowClass(item)}
        data-testid={`notifications-item-${item.id}`}
        data-unread={item.unread ? "true" : "false"}
      >
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0 space-y-1">
              {item.unread ? (
                <span className="sr-only">{NOTIFICATIONS_COPY.unreadSr}</span>
              ) : null}
              <h3 className="text-sm font-semibold text-awc-fg dark:text-white">
                {item.who} wants to run a task on {item.computerLabel}
              </h3>
              <p className="text-sm text-awc-fg dark:text-gray-200">
                “{item.task}”
              </p>
              {item.rule ? (
                <p className="text-sm text-awc-fg-muted dark:text-gray-400">
                  {item.rule}
                </p>
              ) : null}
              {item.files && item.files.length > 0 ? (
                <p className="text-sm text-awc-fg-muted dark:text-gray-400">
                  Files: {item.files.join(", ")}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col items-end gap-1">
              <NotificationsApprovalStatus
                state={item.state}
                minsLeft={item.minsLeft}
              />
              <time className="text-[length:var(--awc-fs-sm)] text-awc-fg-muted dark:text-gray-400">
                {item.atLabel}
              </time>
            </div>
          </div>
          {item.state === "timeout" && item.expiredAtLabel ? (
            <p className="text-sm text-awc-fg-muted dark:text-gray-400">
              {NOTIFICATIONS_COPY.timedOutLine.replace(
                "{when}",
                item.expiredAtLabel,
              )}
            </p>
          ) : null}
          <NotificationsApprovalActions item={item} onDecide={onDecide} />
          <div className="flex flex-wrap items-center gap-3">
            <span className={NOTIFICATIONS_CHIP_OUTLINE_CLASS}>
              {item.project}
            </span>
            <span className={NOTIFICATIONS_CHIP_OUTLINE_CLASS}>
              {item.computerLabel}
            </span>
            {markReadButton}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={rowClass(item)}
      data-testid={`notifications-item-${item.id}`}
      data-unread={item.unread ? "true" : "false"}
    >
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0 space-y-1">
            {item.unread ? (
              <span className="sr-only">{NOTIFICATIONS_COPY.unreadSr}</span>
            ) : null}
            <h3 className="text-sm font-semibold text-awc-fg dark:text-white">
              {item.title}
            </h3>
            <p className="text-sm text-awc-fg-muted dark:text-gray-400">
              {item.text}
            </p>
          </div>
          <time className="text-[length:var(--awc-fs-sm)] text-awc-fg-muted dark:text-gray-400">
            {item.atLabel}
          </time>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {item.project ? (
            <span className={NOTIFICATIONS_CHIP_OUTLINE_CLASS}>
              {item.project}
            </span>
          ) : null}
          {item.href && item.linkLabel ? (
            <Link href={item.href} className={APP_SURFACE_TEXT_LINK_CLASS}>
              {item.linkLabel}
            </Link>
          ) : null}
          {markReadButton}
          {compact ? null : null}
        </div>
      </div>
    </article>
  );
}
