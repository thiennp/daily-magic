"use client";

import { APP_SURFACE_CTA_SECONDARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";

interface NotificationsApprovalCalloutProps {
  readonly pending: number;
  readonly onShow: () => void;
}

export default function NotificationsApprovalCallout({
  pending,
  onShow,
}: NotificationsApprovalCalloutProps) {
  const text =
    pending === 1
      ? NOTIFICATIONS_COPY.calloutOne
      : NOTIFICATIONS_COPY.calloutMany.replace("{m}", String(pending));
  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-awc-warn-soft px-4 py-3 dark:border-amber-900/50 dark:bg-amber-950/30"
      data-testid="notifications-approval-callout"
    >
      <p className="text-sm font-semibold text-awc-warn dark:text-amber-100">
        {text}
      </p>
      <button
        type="button"
        className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
        onClick={onShow}
      >
        {NOTIFICATIONS_COPY.showApprovals}
      </button>
    </div>
  );
}
