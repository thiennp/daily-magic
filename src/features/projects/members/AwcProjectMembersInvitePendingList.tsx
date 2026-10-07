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
  /** Short Copy prompt for an invite this tab created; null = cannot re-copy. */
  readonly copyPromptFor?: (inviteId: string) => string | null;
  /**
   * 107: fetch the prompt from the server on click (any device) for rows with
   * copyAvailable. Rows without it show Copy disabled with a short hint.
   */
  readonly fetchCopyPrompt?: (inviteId: string) => Promise<PendingInviteCopyPromptResult>;
}

/** Unused assistant invites + one (i) tip (DF-036 F1: no "routine", no Muse footnote). */
export default function AwcProjectMembersInvitePendingList({
  invites,
  onRevoke,
  onTurnOffAutoApprove,
  copyPromptFor,
  fetchCopyPrompt,
}: AwcProjectMembersInvitePendingListProps) {
  const copy = useInviteRowCopy(fetchCopyPrompt);
  return (
    <>
      <ul className="flex flex-col gap-2 px-1">
        {invites.length === 0 ? (
          <li className="px-3.5 py-2 text-[13px] text-awc-fg-muted">{C.inviteEmpty}</li>
        ) : (
          invites.map((invite) => {
            const prompt = copyPromptFor?.(invite.inviteId) ?? null;
            // Called as a function (pure row, no hooks) so the rendered tree stays walkable in tests.
            return AwcProjectMembersInvitePendingRow({
              invite,
              prompt,
              canFetch: fetchCopyPrompt !== undefined && invite.copyAvailable === true,
              fetchable: fetchCopyPrompt !== undefined,
              rowState: copy.stateFor(invite.inviteId),
              onCopy: () => void copy.copyPrompt(invite.inviteId, prompt),
              onRevoke: () => onRevoke(invite.inviteId),
              onTurnOffAutoApprove: onTurnOffAutoApprove ? () => onTurnOffAutoApprove(invite.inviteId) : undefined,
            });
          })
        )}
      </ul>
      <p className="flex gap-1.5 px-3.5 text-[12px] text-awc-fg-muted" data-invite-tip>
        <span className="text-awc-fg-subtle" aria-hidden>ⓘ</span>
        <span>{C.compatGrok}</span>
      </p>
    </>
  );
}
