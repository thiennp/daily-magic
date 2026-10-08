"use client";

import { useEffect, useRef, useState } from "react";

import {
  APP_SURFACE_CTA_PRIMARY_SM_CLASS,
  APP_SURFACE_CTA_SECONDARY_SM_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { AWC_PENDING_APPROVAL_CARD_COPY } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";
import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";
import type { NotificationItem } from "@/features/notifications/notificationsDemoItems.constant";
import { notificationTitle } from "@/features/notifications/notificationsSelectors";
import { denyCopy } from "@/features/notifications/notificationsDenyCopy";
import NotificationsDenyConfirm from "@/features/notifications/NotificationsDenyConfirm";

type ApprovalItem = Extract<NotificationItem, { kind: "join" | "run" }>;

interface NotificationsApprovalActionsProps {
  readonly item: ApprovalItem;
  readonly onDecide: (id: string, decision: "approved" | "denied") => void;
}

export default function NotificationsApprovalActions({
  item,
  onDecide,
}: NotificationsApprovalActionsProps) {
  const [confirmDeny, setConfirmDeny] = useState(false);
  const [busy, setBusy] = useState<"approve" | "deny" | null>(null);
  const denyRef = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);

  useEffect(() => {
    if (!confirmDeny && restoreFocus.current) {
      restoreFocus.current = false;
      denyRef.current?.focus();
    }
  }, [confirmDeny]);

  if (item.state !== "pending") return null;
  const title = notificationTitle(item);

  if (confirmDeny) {
    const copy = denyCopy(item);
    return (
      <NotificationsDenyConfirm
        id={item.id}
        title={copy.title}
        body={copy.body}
        denying={busy === "deny"}
        busy={busy !== null}
        onDeny={() => {
          setBusy("deny");
          onDecide(item.id, "denied");
        }}
        onCancel={() => {
          restoreFocus.current = true;
          setConfirmDeny(false);
        }}
      />
    );
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <button
        type="button"
        aria-label={NOTIFICATIONS_COPY.approveAria.replace("{title}", title)}
        className={APP_SURFACE_CTA_PRIMARY_SM_CLASS}
        disabled={busy !== null}
        onClick={() => {
          setBusy("approve");
          onDecide(item.id, "approved");
        }}
      >
        {busy === "approve"
          ? NOTIFICATIONS_COPY.approving
          : AWC_PENDING_APPROVAL_CARD_COPY.approve}
      </button>
      <button
        ref={denyRef}
        type="button"
        aria-label={NOTIFICATIONS_COPY.denyAria.replace("{title}", title)}
        className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
        disabled={busy !== null}
        onClick={() => {
          setConfirmDeny(true);
        }}
      >
        {AWC_PENDING_APPROVAL_CARD_COPY.deny}
      </button>
    </div>
  );
}
