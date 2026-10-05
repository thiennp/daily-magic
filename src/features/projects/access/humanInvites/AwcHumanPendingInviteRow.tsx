"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
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
    <li className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-amber-200/80 bg-amber-50/60 px-3 py-2 text-sm dark:border-amber-900/50 dark:bg-amber-950/30">
      <div>
        <div className="font-medium text-gray-900 dark:text-white/90">
          {invite.email ?? "Invite link · no email"}
          {invite.requireEmailMatch ? (
            <span className="ml-2 inline-flex rounded-full bg-amber-200/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-900 dark:bg-amber-900/60 dark:text-amber-100">
              {copy.pendingEmailLocked}
            </span>
          ) : null}
        </div>
        <div className="text-xs text-gray-500">
          Role · {invite.role}
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
