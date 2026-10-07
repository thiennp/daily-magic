"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import {
  HUMAN_INVITE_EMAIL_COPY,
  fillHumanInviteEmailCopy,
} from "@/features/projects/access/humanInvites/humanInviteEmailCopy.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type { HumanInviteListItem } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type AwcHumanPendingInviteRowProps = {
  readonly invite: HumanInviteListItem;
  readonly onRevokeInvite?: (inviteId: string) => void;
};

/** Pending human invite row — Revoke only (no Copy link; token only on create). */
export default function AwcHumanPendingInviteRow({
  invite,
  onRevokeInvite,
}: AwcHumanPendingInviteRowProps) {
  const copy = HUMAN_INVITE_UI_COPY;

  return (
    <li className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-awc-line bg-awc-surface-2 px-3 py-2 text-sm">
      <div>
        <div className="font-medium text-awc-fg dark:text-white/90">
          {invite.delivery === "email" && invite.email
            ? fillHumanInviteEmailCopy(HUMAN_INVITE_EMAIL_COPY.inviteSentTo, {
                email: invite.email,
              })
            : (invite.email ?? "Invite link · no email")}
          {invite.requireEmailMatch ? (
            <span className="ml-2 inline-flex rounded-full bg-awc-tile-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-awc-fg-muted">
              {copy.pendingEmailLocked}
            </span>
          ) : null}
        </div>
        <div className="text-xs text-awc-fg-muted">
          Role · {invite.role}
          {invite.requiresApproval
            ? ` · ${HUMAN_INVITE_EMAIL_COPY.approvalCheckbox}`
            : ""}
          {" · exp "}
          {new Date(invite.expiresAt).toLocaleDateString()}
        </div>
      </div>
      <button
        type="button"
        className={AWC_PROJECT_ACCESS_CTA.danger}
        onClick={() => onRevokeInvite?.(invite.inviteId)}
      >
        {copy.revoke}
      </button>
    </li>
  );
}
