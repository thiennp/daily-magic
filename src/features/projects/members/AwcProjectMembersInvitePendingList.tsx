"use client";

import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

interface AwcProjectMembersInvitePendingListProps {
  readonly invites: readonly AwcProjectAccessInvite[];
  readonly onRevoke: (inviteId: string) => void;
}

/** Pending assistant invites + compat footnotes (flat rows). */
export default function AwcProjectMembersInvitePendingList({
  invites,
  onRevoke,
}: AwcProjectMembersInvitePendingListProps) {
  return (
    <>
      <ul className="flex flex-col px-1">
        {invites.length === 0 ? (
          <li className="px-3.5 py-2 text-[13px] text-gray-500 dark:text-gray-400">
            {C.inviteEmpty}
          </li>
        ) : (
          invites.map((invite) => (
            <li
              key={invite.inviteId}
              className="flex items-center justify-between gap-2 rounded-xl px-3.5 py-2 text-sm"
            >
              <span className="min-w-0">
                <span className="block font-medium text-gray-800 dark:text-white/90">
                  {invite.inviteId.slice(0, 8)}…
                </span>
                <span className="block text-[12px] text-gray-500 dark:text-gray-400">
                  {C.invitePendingSub}
                </span>
              </span>
              <button
                type="button"
                className="shrink-0 text-[13px] font-medium text-error-600 dark:text-error-400"
                onClick={() => onRevoke(invite.inviteId)}
              >
                {C.invitePendingCancel}
              </button>
            </li>
          ))
        )}
      </ul>
      <ul className="space-y-1 px-3.5 text-[12px] text-gray-500 dark:text-gray-400">
        <li className="flex gap-1.5">
          <span className="text-emerald-600" aria-hidden>
            ●
          </span>
          <span>{C.compatGrok}</span>
        </li>
        <li className="flex gap-1.5">
          <span className="text-gray-400" aria-hidden>
            ○
          </span>
          <span>{C.compatOther}</span>
        </li>
      </ul>
    </>
  );
}
