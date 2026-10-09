"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import AwcHumanJoinedMembersSection from "@/features/projects/access/humanInvites/AwcHumanJoinedMembersSection";
import AwcHumanPendingInvitesSection from "@/features/projects/access/humanInvites/AwcHumanPendingInvitesSection";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type {
  HumanInviteListItem,
  HumanJoinedMemberRow,
} from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type AwcHumanPeopleMembersListProps = {
  readonly pendingInvites: readonly HumanInviteListItem[];
  readonly joinedHumans: readonly HumanJoinedMemberRow[];
  /** Owner row shown first (M2). */
  readonly ownerEmail?: string | null;
  readonly ownerDisplayName?: string | null;
  /** False for a member viewing the project (owner row names the owner; no remove/revoke). */
  readonly viewerIsOwner?: boolean;
  readonly pendingIdsHidden?: ReadonlySet<string>;
  readonly removedIdsHidden?: ReadonlySet<string>;
  readonly invitePersonOpen?: boolean;
  readonly onInvitePerson?: () => void;
  /** One-click Revoke → 10s Undo (schedules DELETE). */
  readonly onRevokeInvite?: (inviteId: string) => void;
  /** One-click Remove → 10s Undo (schedules POST remove). */
  readonly onRemoveMember?: (membershipId: string) => void;
  /** Assistants + pending requests + invites (DF-036: not "Just you" when > 0). */
  readonly othersCount?: number;
  /** 108: Wants to join rows (email invites that need owner Approve). */
  readonly decidingId?: string | null;
  readonly onApproveRequest?: (inviteId: string, name: string) => void;
  readonly onDenyRequest?: (inviteId: string, name: string) => void;
};

/**
 * Owner People list in Bots & people: pending (GET human-invites) + joined humans.
 * Copy link is NOT on pending rows (token only on create success).
 */
export default function AwcHumanPeopleMembersList({
  pendingInvites,
  joinedHumans,
  ownerEmail = null,
  ownerDisplayName = null,
  viewerIsOwner = true,
  pendingIdsHidden,
  removedIdsHidden,
  invitePersonOpen = false,
  onInvitePerson,
  onRevokeInvite,
  onRemoveMember,
  othersCount = 0,
  decidingId = null,
  onApproveRequest,
  onDenyRequest,
}: AwcHumanPeopleMembersListProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const visiblePending = pendingInvites.filter(
    (invite) => !pendingIdsHidden?.has(invite.inviteId),
  );
  const visibleJoined = joinedHumans.filter(
    (member) => !removedIdsHidden?.has(member.membershipId),
  );
  const ownerLabel = ownerDisplayName?.trim() || ownerEmail?.trim() || "you";

  return (
    <section className="space-y-4">
      {/* DF-036: heading + hint come from the wrapping People section. */}
      <header className="flex justify-end">
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.primary}
          aria-expanded={invitePersonOpen}
          aria-controls="inv-person-card"
          onClick={onInvitePerson}
        >
          {copy.invitePersonTitle}
        </button>
      </header>

      <AwcHumanPendingInvitesSection
        pendingInvites={visiblePending}
        onRevokeInvite={viewerIsOwner ? onRevokeInvite : undefined}
        decidingId={decidingId}
        onApproveRequest={onApproveRequest}
        onDenyRequest={onDenyRequest}
      />
      <AwcHumanJoinedMembersSection
        joinedHumans={visibleJoined}
        ownerLabel={ownerLabel}
        viewerIsOwner={viewerIsOwner}
        othersCount={othersCount}
        onRemoveMember={viewerIsOwner ? onRemoveMember : undefined}
      />
    </section>
  );
}
