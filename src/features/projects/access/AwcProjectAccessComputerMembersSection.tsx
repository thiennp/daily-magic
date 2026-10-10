"use client";

import AwcProjectAccessComputerMemberRow from "@/features/projects/access/AwcProjectAccessComputerMemberRow";
import AwcProjectAccessSection from "@/features/projects/access/AwcProjectAccessSection";
import { AWC_PROJECT_COMPUTER_MEMBER_COPY } from "@/features/projects/access/awcProjectComputerMemberCopy.constant";
import { LaneCompareHelpTrigger } from "@/features/projects/access/laneCompare/public-api/presentation";
import { LANE_COMPARE_COPY } from "@/features/projects/access/laneCompare/public-api/types";
import type { ComputerAccessMemberFields } from "@/features/projects/access/utils/describeComputerAccessMember";

interface AwcProjectAccessComputerMembersSectionProps {
  readonly computers: readonly (ComputerAccessMemberFields & {
    readonly id: string;
  })[];
  readonly viewerUserId: string | null;
}

/**
 * Team computer seats (membership id = row `id`). GATE: renders nothing until
 * the access payload carries `memberKind: "computer"` rows.
 */
export default function AwcProjectAccessComputerMembersSection({
  computers,
  viewerUserId,
}: AwcProjectAccessComputerMembersSectionProps) {
  if (computers.length === 0) {
    return null;
  }
  const copy = AWC_PROJECT_COMPUTER_MEMBER_COPY;
  return (
    <AwcProjectAccessSection
      id="project-access-computers"
      title={copy.heading}
      hint={copy.hint}
      count={computers.length}
    >
      <div className="space-y-2">
        <p className="text-sm font-medium text-awc-fg dark:text-white/90">
          Coding tools
        </p>
        <LaneCompareHelpTrigger
          hint={LANE_COMPARE_COPY.help.computers}
          testId="lane-compare-help-computers"
        />
      </div>
      <ul className="space-y-2">
        {computers.map((computer) => (
          <AwcProjectAccessComputerMemberRow
            key={computer.id}
            member={computer}
            viewerUserId={viewerUserId}
          />
        ))}
      </ul>
    </AwcProjectAccessSection>
  );
}
