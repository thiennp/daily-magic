"use client";

import Link from "next/link";

import {
  APP_SURFACE_CTA_SECONDARY_SM_CLASS,
  APP_SURFACE_TEXT_LINK_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { NOTIFICATIONS_TIP_CLASS } from "@/features/notifications/notificationsClasses.constant";
import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";
import NotificationsPageSubtitle from "@/features/notifications/NotificationsPageSubtitle";
import { PROJECT_V5_H1_CLASS } from "@/features/projects/projectPageV5ChromeClasses.constant";

interface NotificationsPageHeaderProps {
  readonly unread: number;
  readonly pending: number;
  readonly ready: boolean;
  readonly onMarkAllRead: () => void;
}

export default function NotificationsPageHeader({
  unread,
  pending,
  ready,
  onMarkAllRead,
}: NotificationsPageHeaderProps) {
  return (
    <header className="space-y-2">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className={PROJECT_V5_H1_CLASS}>{NOTIFICATIONS_COPY.h1}</h1>
          <NotificationsPageSubtitle
            unread={unread}
            pending={pending}
            ready={ready}
          />
          <p className={NOTIFICATIONS_TIP_CLASS}>{NOTIFICATIONS_COPY.tip}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
            disabled={unread === 0 || !ready}
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
  );
}
