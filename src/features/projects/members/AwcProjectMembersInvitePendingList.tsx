"use client";

import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

interface AwcProjectMembersInvitePendingListProps {
  readonly invites: readonly AwcProjectAccessInvite[];
  readonly onRevoke: (inviteId: string) => void;
  readonly onTurnOffAutoApprove?: (inviteId: string) => void;
}

const ROW =
  "flex items-center gap-2.5 rounded-[10px] border border-awc-line bg-awc-surface-2 px-2.5 py-2.5 text-sm";
const AV =
  "grid size-8 shrink-0 place-items-center rounded-full border-[1.5px] border-dashed border-awc-border-strong bg-transparent text-[13px] font-semibold text-awc-fg-muted";
const GHOST =
  "awc-focus-ring shrink-0 rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-[13px] font-semibold text-awc-fg-muted transition hover:bg-awc-fill";
const CHIP =
  "inline-flex items-center rounded-full bg-awc-tile-2 px-2 py-px text-[11.5px] font-semibold text-awc-fg-muted";

/** Pending assistant invites — Invite sent / Auto-approve chip / Cancel (+ Turn off). */
export default function AwcProjectMembersInvitePendingList({
  invites,
  onRevoke,
  onTurnOffAutoApprove,
}: AwcProjectMembersInvitePendingListProps) {
  return (
    <>
      <ul className="flex flex-col gap-2 px-1">
        {invites.length === 0 ? (
          <li className="px-3.5 py-2 text-[13px] text-awc-fg-muted">{C.inviteEmpty}</li>
        ) : (
          invites.map((invite) => (
            <li key={invite.inviteId} className={ROW}>
              <span className={AV} aria-hidden>
                +
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold text-awc-fg">
                  {C.invitePendingTitle}
                </span>
                <span className="mt-0.5 flex items-center gap-1.5 text-[12.5px] text-awc-fg-subtle">
                  {invite.autoApprove ? (
                    <span className={CHIP}>{C.invitePendingSubOn}</span>
                  ) : (
                    C.invitePendingSubOff
                  )}
                </span>
              </span>
              <span className="flex shrink-0 gap-1.5">
                {invite.autoApprove && onTurnOffAutoApprove ? (
                  <button
                    type="button"
                    className={GHOST}
                    aria-label="Turn off auto-approve"
                    onClick={() => onTurnOffAutoApprove(invite.inviteId)}
                  >
                    {C.invitePendingTurnOff}
                  </button>
                ) : null}
                <button
                  type="button"
                  className={GHOST}
                  aria-label="Cancel invite"
                  onClick={() => onRevoke(invite.inviteId)}
                >
                  {C.invitePendingCancel}
                </button>
              </span>
            </li>
          ))
        )}
      </ul>
      <ul className="space-y-1 px-3.5 text-[12px] text-awc-fg-muted">
        <li className="flex gap-1.5">
          <span className="text-awc-ok-dot" aria-hidden>
            ●
          </span>
          <span>{C.compatGrok}</span>
        </li>
        <li className="flex gap-1.5">
          <span className="text-awc-fg-subtle" aria-hidden>
            ○
          </span>
          <span>{C.compatOther}</span>
        </li>
      </ul>
    </>
  );
}
