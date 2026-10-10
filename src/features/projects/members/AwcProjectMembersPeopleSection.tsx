"use client";

import AwcHumanPeopleSection from "@/features/projects/access/humanInvites/AwcHumanPeopleSection";
import type { AccessMemberForHumanFilter } from "@/features/projects/access/humanInvites/utils/public-api/types";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

interface AwcProjectMembersPeopleSectionProps {
  readonly projectId: string;
  readonly projectName: string | null;
  readonly ownerEmail: string | null;
  readonly ownerDisplayName: string | null;
  readonly viewerIsOwner?: boolean;
  readonly accessMembers: readonly AccessMemberForHumanFilter[];
  readonly pendingRequestCount: number;
  readonly assistantInviteCount: number;
  readonly onWaitingCountChange: (count: number) => void;
}

/**
 * People + Invite person — reuses human-invite APIs; flat chrome via utility
 * overrides (no Access section cards).
 */
export default function AwcProjectMembersPeopleSection({
  projectId,
  projectName,
  ownerEmail,
  ownerDisplayName,
  viewerIsOwner = true,
  accessMembers,
  pendingRequestCount,
  assistantInviteCount,
  onWaitingCountChange,
}: AwcProjectMembersPeopleSectionProps) {
  return (
    <section
      className="flex flex-col gap-1 rounded-awc-card border border-awc-line bg-awc-surface p-3.5 shadow-awc-lift [&_section]:rounded-none [&_section]:border-0 [&_section]:bg-transparent [&_section]:p-0 [&_section]:shadow-none [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-awc-fg dark:[&_h3]:text-awc-fg"
      aria-label={C.peopleHeading}
      data-members-people
    >
      <AwcHumanPeopleSection
        projectId={projectId}
        projectName={projectName}
        ownerEmail={ownerEmail}
        ownerDisplayName={ownerDisplayName}
        viewerIsOwner={viewerIsOwner}
        accessMembers={accessMembers}
        pendingRequestCount={pendingRequestCount}
        assistantInviteCount={assistantInviteCount}
        onWaitingCountChange={onWaitingCountChange}
        enabled
        hintAsTip
      />
    </section>
  );
}
