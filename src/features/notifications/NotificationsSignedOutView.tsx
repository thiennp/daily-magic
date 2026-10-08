"use client";

import Link from "next/link";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_CTA_PRIMARY_CLASS,
  APP_SURFACE_TEXT_LINK_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { AGENT_WITCH_LOCAL_DOWNLOAD_URL } from "@/lib/agentWitch/agentWitchLocalTooOld.constant";
import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";

export default function NotificationsSignedOutView() {
  const copy = NOTIFICATIONS_COPY.signedOut;
  return (
    <AppPanel className="mx-auto flex max-w-lg flex-col items-center gap-4 text-center">
      <h1 className="text-2xl font-bold tracking-tight text-awc-fg dark:text-white">
        {copy.title}
      </h1>
      <p className="text-sm text-awc-fg-muted dark:text-gray-400">
        {copy.body}
      </p>
      <Link href="/login" className={APP_SURFACE_CTA_PRIMARY_CLASS}>
        {copy.signIn}
      </Link>
      <a
        href={AGENT_WITCH_LOCAL_DOWNLOAD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={APP_SURFACE_TEXT_LINK_CLASS}
      >
        {copy.download}
        <span className="sr-only"> {NOTIFICATIONS_COPY.opensNewTab}</span>
      </a>
    </AppPanel>
  );
}
