"use client";

import AwcHumanPeopleSection from "@/features/projects/access/humanInvites/AwcHumanPeopleSection";
import type { AccessMemberForHumanFilter } from "@/features/projects/access/humanInvites/utils/filterJoinedHumanMembers";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

interface AwcProjectMembersPeopleSectionProps {
  readonly projectId: string;
  readonly projectName: string | null;
  readonly ownerEmail: string | null;
  readonly ownerDisplayName: string | null;
  readonly accessMembers: readonly AccessMemberForHumanFilter[];
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
  accessMembers,
}: AwcProjectMembersPeopleSectionProps) {
  return (
    <section
      className="flex flex-col gap-1 [&_section]:rounded-none [&_section]:border-0 [&_section]:bg-transparent [&_section]:p-0 [&_section]:shadow-none [&_header]:px-3.5 [&_h3]:text-[13px] [&_h3]:font-semibold [&_h3]:text-gray-500 dark:[&_h3]:text-gray-400"
      aria-label={C.peopleHeading}
      data-members-people
    >
      <AwcHumanPeopleSection
        projectId={projectId}
        projectName={projectName}
        ownerEmail={ownerEmail}
        ownerDisplayName={ownerDisplayName}
        accessMembers={accessMembers}
        enabled
      />
    </section>
  );
}
