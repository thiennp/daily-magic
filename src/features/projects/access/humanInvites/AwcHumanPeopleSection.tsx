"use client";

import { useEffect } from "react";

import AwcHumanPeopleSectionBody from "@/features/projects/access/humanInvites/AwcHumanPeopleSectionBody";
import { useHumanPeopleInvites } from "@/features/projects/access/humanInvites/hooks/useHumanPeopleInvites";
import { countActiveAssistantMembers } from "@/features/projects/access/humanInvites/utils/countActiveAssistantMembers";
import type { AccessMemberForHumanFilter } from "@/features/projects/access/humanInvites/utils/filterJoinedHumanMembers";
import AwcProjectAccessSection from "@/features/projects/access/AwcProjectAccessSection";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";

export type AwcHumanPeopleSectionProps = {
  readonly projectId: string;
  readonly projectName: string | null;
  readonly ownerEmail?: string | null;
  readonly ownerDisplayName?: string | null;
  readonly accessMembers: readonly AccessMemberForHumanFilter[];
  /** Owner Access loaded — enable human invite APIs. */
  readonly enabled: boolean;
  /** Open join requests (DF-036: counted so the rail never says "Just you"). */
  readonly pendingRequestCount?: number;
  /** Unused assistant invites (DF-036 F6: an outstanding invite is pending too). */
  readonly assistantInviteCount?: number;
  /** DF-036 F5: waiting person invites, for the rail's "{k} waiting" pill. */
  readonly onWaitingCountChange?: (count: number) => void;
  /** Members rail: show the hint as an (i) tip. */
  readonly hintAsTip?: boolean;
};

/**
 * People + Invite person. DF-036 F5: the badge is everyone who can open the
 * project now (you + joined people); waiting invites get "Waiting · {n}".
 */
export default function AwcHumanPeopleSection({
  projectId,
  projectName,
  ownerEmail = null,
  ownerDisplayName = null,
  accessMembers,
  enabled,
  pendingRequestCount = 0,
  assistantInviteCount = 0,
  onWaitingCountChange,
  hintAsTip = false,
}: AwcHumanPeopleSectionProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const people = useHumanPeopleInvites({
    projectId,
    enabled,
    accessMembers,
  });

  const pendingCount = people.invites.filter(
    (invite) => !people.hiddenPending.has(invite.inviteId),
  ).length;
  useEffect(() => {
    onWaitingCountChange?.(enabled ? pendingCount : 0);
  }, [enabled, onWaitingCountChange, pendingCount]);

  if (!enabled) {
    return null;
  }

  const joinedCount = people.joinedHumans.filter(
    (member) => !people.hiddenRemoved.has(member.membershipId),
  ).length;

  return (
    <AwcProjectAccessSection
      id="project-access-human-people"
      title={copy.peopleHeading}
      hint={copy.peopleHint}
      hintAsTip={hintAsTip}
      count={joinedCount + 1}
      alertCount={pendingCount > 0}
    >
      <AwcHumanPeopleSectionBody
        projectName={projectName ?? "this project"}
        ownerEmail={ownerEmail}
        ownerDisplayName={ownerDisplayName}
        people={people}
        othersCount={
          countActiveAssistantMembers(accessMembers) +
          pendingRequestCount +
          pendingCount +
          assistantInviteCount
        }
      />
    </AwcProjectAccessSection>
  );
}
