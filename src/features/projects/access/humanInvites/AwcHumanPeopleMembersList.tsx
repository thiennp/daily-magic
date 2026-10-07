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
  readonly pendingIdsHidden?: ReadonlySet<string>;
  readonly removedIdsHidden?: ReadonlySet<string>;
  readonly onInvitePerson?: () => void;
  /** One-click Revoke → 10s Undo (schedules DELETE). */
  readonly onRevokeInvite?: (inviteId: string) => void;
  /** One-click Remove → 10s Undo (schedules POST remove). */
  readonly onRemoveMember?: (membershipId: string) => void;
  /** Assistants + pending requests + invites (DF-036: not "Just you" when > 0). */
  readonly othersCount?: number;
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
  pendingIdsHidden,
  removedIdsHidden,
  onInvitePerson,
  onRevokeInvite,
  onRemoveMember,
  othersCount = 0,
}: AwcHumanPeopleMembersListProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const visiblePending = pendingInvites.filter(
    (invite) => !pendingIdsHidden?.has(invite.inviteId),
  );
  const visibleJoined = joinedHumans.filter(
    (member) => !removedIdsHidden?.has(member.membershipId),
  );
  const ownerLabel =
    ownerDisplayName?.trim() || ownerEmail?.trim() || "you";

  return (
    <section className="space-y-4">
      {/* DF-036: heading + hint come from the wrapping People section. */}
      <header className="flex justify-end">
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.primary}
          onClick={onInvitePerson}
        >
          {copy.invitePersonTitle}
        </button>
      </header>

      <AwcHumanPendingInvitesSection
        pendingInvites={visiblePending}
        onRevokeInvite={onRevokeInvite}
      />
      <AwcHumanJoinedMembersSection
        joinedHumans={visibleJoined}
        ownerLabel={ownerLabel}
        othersCount={othersCount}
        onRemoveMember={onRemoveMember}
      />
    </section>
  );
}
