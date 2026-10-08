"use client";

import type { AwcProjectAccessInvite } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import type { PendingInviteCopyPromptResult } from "@/features/projects/access/invites/fetchPendingInviteCopyPrompt";
import AwcProjectMembersInvitePendingRow from "@/features/projects/members/AwcProjectMembersInvitePendingRow";
import { useInviteRowCopy } from "@/features/projects/members/hooks/useInviteRowCopy";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

interface AwcProjectMembersInvitePendingListProps {
  readonly invites: readonly AwcProjectAccessInvite[];
  readonly onRevoke: (inviteId: string) => void;
  readonly onTurnOffAutoApprove?: (inviteId: string) => void;
  /** Setup-steps label this tab remembers for an invite (D4 "Invite for {type}"); null = unknown. */
  readonly typeLabelFor?: (inviteId: string) => string | null;
  /** Short Copy prompt for an invite this tab created; null = cannot re-copy. */
  readonly copyPromptFor?: (inviteId: string) => string | null;
  /**
   * 107: fetch the prompt from the server on click (any device) for rows with
   * copyAvailable. Rows without it show the lost-copy line instead of Copy again.
   */
  readonly fetchCopyPrompt?: (
    inviteId: string,
  ) => Promise<PendingInviteCopyPromptResult>;
}

/** DF-036 D4: unused assistant invites, the Pending note and one (i) tip (F1: no "routine", no Muse). */
export default function AwcProjectMembersInvitePendingList({
  invites,
  onRevoke,
  onTurnOffAutoApprove,
  typeLabelFor,
  copyPromptFor,
  fetchCopyPrompt,
}: AwcProjectMembersInvitePendingListProps) {
  const copy = useInviteRowCopy(fetchCopyPrompt);
  return (
    <>
      <ul className="flex flex-col divide-y divide-awc-line">
        {invites.length === 0 ? (
          <li className="py-2 text-[13px] text-awc-fg-muted">
            {C.inviteEmpty}
          </li>
        ) : (
          invites.map((invite) => {
            const prompt = copyPromptFor?.(invite.inviteId) ?? null;
            // Called as a function (pure row, no hooks) so the rendered tree stays walkable in tests.
            return AwcProjectMembersInvitePendingRow({
              invite,
              typeLabel: typeLabelFor?.(invite.inviteId) ?? null,
              canCopy:
                prompt !== null ||
                (fetchCopyPrompt !== undefined &&
                  invite.copyAvailable === true),
              rowState: copy.stateFor(invite.inviteId),
              onCopy: () => void copy.copyPrompt(invite.inviteId, prompt),
              onRevoke: () => onRevoke(invite.inviteId),
              onTurnOffAutoApprove: onTurnOffAutoApprove
                ? () => onTurnOffAutoApprove(invite.inviteId)
                : undefined,
            });
          })
        )}
      </ul>
    </>
  );
}
