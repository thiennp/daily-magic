"use client";

import { useEffect, useRef } from "react";

import {
  APP_SURFACE_CTA_PRIMARY_SM_CLASS,
  APP_SURFACE_CTA_SECONDARY_SM_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { AWC_PENDING_APPROVAL_CARD_COPY } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";
import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";

interface NotificationsDenyConfirmProps {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly denying: boolean;
  readonly busy: boolean;
  readonly onDeny: () => void;
  readonly onCancel: () => void;
}

export default function NotificationsDenyConfirm({
  id,
  title,
  body,
  denying,
  busy,
  onDeny,
  onCancel,
}: NotificationsDenyConfirmProps) {
  const titleRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    titleRef.current?.focus();
  }, []);
  return (
    <div
      role="alertdialog"
      aria-labelledby={`${id}-deny-title`}
      aria-describedby={`${id}-deny-body`}
      className="mt-3 space-y-2 rounded-xl border border-rose-200 bg-rose-50/80 p-3 dark:border-rose-900/50 dark:bg-rose-950/30"
    >
      <p
        ref={titleRef}
        id={`${id}-deny-title`}
        tabIndex={-1}
        className="text-sm font-semibold text-rose-950 outline-none dark:text-rose-100"
      >
        {title}
      </p>
      <p
        id={`${id}-deny-body`}
        className="text-sm text-rose-900/90 dark:text-rose-100/90"
      >
        {body}
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={APP_SURFACE_CTA_PRIMARY_SM_CLASS}
          disabled={busy}
          onClick={onDeny}
        >
          {denying
            ? NOTIFICATIONS_COPY.denying
            : AWC_PENDING_APPROVAL_CARD_COPY.deny}
        </button>
        <button
          type="button"
          className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
          disabled={busy}
          onClick={onCancel}
        >
          {NOTIFICATIONS_COPY.cancel}
        </button>
      </div>
    </div>
  );
}
