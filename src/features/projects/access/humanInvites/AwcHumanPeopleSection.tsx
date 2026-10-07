"use client";

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
};

/** People + Invite person inside Assistants & people (improve in place). */
export default function AwcHumanPeopleSection({
  projectId,
  projectName,
  ownerEmail = null,
  ownerDisplayName = null,
  accessMembers,
  enabled,
  pendingRequestCount = 0,
}: AwcHumanPeopleSectionProps) {
  const copy = HUMAN_INVITE_UI_COPY;
  const people = useHumanPeopleInvites({
    projectId,
    enabled,
    accessMembers,
  });

  if (!enabled) {
    return null;
  }

  const pendingCount = people.invites.filter(
    (invite) => !people.hiddenPending.has(invite.inviteId),
  ).length;
  const joinedCount = people.joinedHumans.filter(
    (member) => !people.hiddenRemoved.has(member.membershipId),
  ).length;

  return (
    <AwcProjectAccessSection
      id="project-access-human-people"
      title={copy.peopleHeading}
      hint={copy.peopleHint}
      count={pendingCount + joinedCount + 1}
      alertCount={pendingCount > 0}
    >
      <AwcHumanPeopleSectionBody
        projectName={projectName ?? "this project"}
        ownerEmail={ownerEmail}
        ownerDisplayName={ownerDisplayName}
        people={people}
        othersCount={
          countActiveAssistantMembers(accessMembers) + pendingRequestCount + pendingCount
        }
      />
    </AwcProjectAccessSection>
  );
}
