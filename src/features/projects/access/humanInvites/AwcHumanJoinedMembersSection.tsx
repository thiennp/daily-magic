"use client";

import AwcHumanJoinedMemberRow from "@/features/projects/access/humanInvites/AwcHumanJoinedMemberRow";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type { HumanJoinedMemberRow } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type AwcHumanJoinedMembersSectionProps = {
  readonly joinedHumans: readonly HumanJoinedMemberRow[];
  readonly ownerLabel: string;
  readonly onRemoveMember?: (membershipId: string) => void;
  /** Assistants + pending requests + invites (DF-036: "Just you" only at 0). */
  readonly othersCount?: number;
};

/** Joined humans subsection — owner row first, then members. */
export default function AwcHumanJoinedMembersSection({
  joinedHumans,
  ownerLabel,
  onRemoveMember,
  othersCount = 0,
}: AwcHumanJoinedMembersSectionProps) {
  const copy = HUMAN_INVITE_UI_COPY;

  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wide text-awc-fg-muted dark:text-gray-300">
        {copy.joinedSubhead}
      </h4>
      <ul className="mt-2 space-y-2">
        <li className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-awc-border/70 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-transparent">
          <div>
            <div className="font-medium text-awc-fg dark:text-white/90">
              {copy.youOwner}
            </div>
            <div className="text-xs text-awc-fg-muted">Owner · {ownerLabel}</div>
          </div>
        </li>
        {joinedHumans.length === 0 ? (
          <li className="text-sm text-awc-fg-muted">
            {othersCount > 0 ? copy.joinedNoOtherPeople : copy.joinedOwnerOnly}
          </li>
        ) : (
          joinedHumans.map((member) => (
            <AwcHumanJoinedMemberRow
              key={member.membershipId}
              member={member}
              onRemoveMember={onRemoveMember}
            />
          ))
        )}
      </ul>
    </div>
  );
}
