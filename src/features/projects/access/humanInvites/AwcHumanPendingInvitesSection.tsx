"use client";

import AwcHumanPendingInviteRow from "@/features/projects/access/humanInvites/AwcHumanPendingInviteRow";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type { HumanInviteListItem } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type AwcHumanPendingInvitesSectionProps = {
  readonly pendingInvites: readonly HumanInviteListItem[];
  readonly onRevokeInvite?: (inviteId: string) => void;
};

/** Pending invites subsection for People list. */
export default function AwcHumanPendingInvitesSection({
  pendingInvites,
  onRevokeInvite,
}: AwcHumanPendingInvitesSectionProps) {
  const copy = HUMAN_INVITE_UI_COPY;

  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wide text-awc-fg-muted dark:text-gray-300">
        {copy.pendingSubhead}
      </h4>
      {pendingInvites.length === 0 ? (
        <p className="mt-1 text-sm text-awc-fg-muted">{copy.pendingEmpty}</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {pendingInvites.map((invite) => (
            <AwcHumanPendingInviteRow
              key={invite.inviteId}
              invite={invite}
              onRevokeInvite={onRevokeInvite}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
