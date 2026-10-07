"use client";

import AwcHumanAwaitingApprovalRow from "@/features/projects/access/humanInvites/AwcHumanAwaitingApprovalRow";
import AwcHumanPendingInviteRow from "@/features/projects/access/humanInvites/AwcHumanPendingInviteRow";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type { HumanInviteListItem } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type AwcHumanPendingInvitesSectionProps = {
  readonly pendingInvites: readonly HumanInviteListItem[];
  readonly onRevokeInvite?: (inviteId: string) => void;
  /** 108: Wants to join (status accepted) — owner Approve / Deny. */
  readonly decidingId?: string | null;
  readonly onApproveRequest?: (inviteId: string, name: string) => void;
  readonly onDenyRequest?: (inviteId: string, name: string) => void;
};

/** Pending invites subsection for People list. */
export default function AwcHumanPendingInvitesSection({
  pendingInvites,
  onRevokeInvite,
  decidingId = null,
  onApproveRequest,
  onDenyRequest,
}: AwcHumanPendingInvitesSectionProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const awaiting = pendingInvites.filter(
    (invite) => invite.status === "accepted",
  );
  const waiting = pendingInvites.filter(
    (invite) => invite.status !== "accepted",
  );

  // DF-036 F5: "Waiting · {n}" only when someone is waiting.
  if (pendingInvites.length === 0) return null;

  return (
    <div data-people-waiting={pendingInvites.length}>
      <h4 className="text-xs font-semibold tracking-wide text-awc-fg-muted dark:text-gray-300">
        {copy.pendingSubhead(pendingInvites.length)}
      </h4>
      <ul className="mt-2 space-y-2">
        {awaiting.map((invite) => (
          <AwcHumanAwaitingApprovalRow
            key={invite.inviteId}
            invite={invite}
            busy={decidingId === invite.inviteId}
            onApprove={onApproveRequest}
            onDeny={onDenyRequest}
          />
        ))}
        {waiting.map((invite) => (
          <AwcHumanPendingInviteRow
            key={invite.inviteId}
            invite={invite}
            onRevokeInvite={onRevokeInvite}
          />
        ))}
      </ul>
    </div>
  );
}
