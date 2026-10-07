"use client";

import { useState } from "react";

import {
  APP_SURFACE_CTA_PRIMARY_SM_CLASS,
  APP_SURFACE_CTA_SECONDARY_SM_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { AWC_PENDING_APPROVAL_CARD_COPY } from "@/features/projects/access/approvalCard/awcPendingApprovalCardCopy.constant";
import { NOTIFICATIONS_COPY } from "@/features/notifications/notificationsCopy.constant";
import type { NotificationItem } from "@/features/notifications/notificationsDemoItems.constant";

interface NotificationsApprovalActionsProps {
  readonly item: Extract<NotificationItem, { kind: "join" | "run" }>;
  readonly onDecide: (
    id: string,
    decision: "approved" | "denied",
  ) => void;
}

function denyCopy(
  item: Extract<NotificationItem, { kind: "join" | "run" }>,
): { title: string; body: string } {
  if (item.kind === "join") {
    return {
      title: NOTIFICATIONS_COPY.denyJoinTitle.replace("{who}", item.who),
      body: NOTIFICATIONS_COPY.denyJoinBody
        .replaceAll("{who}", item.who)
        .replace("{project}", item.project),
    };
  }
  return {
    title: NOTIFICATIONS_COPY.denyRunTitle,
    body: NOTIFICATIONS_COPY.denyRunBody
      .replace("{who}", item.who)
      .replace("{task}", item.task)
      .replace("{computer}", item.computerLabel),
  };
}

export default function NotificationsApprovalActions({
  item,
  onDecide,
}: NotificationsApprovalActionsProps) {
  const [confirmDeny, setConfirmDeny] = useState(false);
  const [busy, setBusy] = useState<"approve" | "deny" | null>(null);

  if (item.state !== "pending") {
    return null;
  }

  if (confirmDeny) {
    const copy = denyCopy(item);
    return (
      <div className="mt-3 space-y-2 rounded-xl border border-rose-200 bg-rose-50/80 p-3 dark:border-rose-900/50 dark:bg-rose-950/30">
        <p className="text-sm font-semibold text-rose-950 dark:text-rose-100">
          {copy.title}
        </p>
        <p className="text-sm text-rose-900/90 dark:text-rose-100/90">
          {copy.body}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={APP_SURFACE_CTA_PRIMARY_SM_CLASS}
            disabled={busy !== null}
            onClick={() => {
              setBusy("deny");
              onDecide(item.id, "denied");
            }}
          >
            {busy === "deny"
              ? NOTIFICATIONS_COPY.denying
              : AWC_PENDING_APPROVAL_CARD_COPY.deny}
          </button>
          <button
            type="button"
            className={APP_SURFACE_CTA_SECONDARY_SM_CLASS}
            disabled={busy !== null}
            onClick={() => {
              setConfirmDeny(false);
            }}
          >
            {NOTIFICATIONS_COPY.cancel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <button
        type="button"
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
        type="button"
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
