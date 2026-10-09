"use client";

import AwcProjectAccessMemberTaskPulse from "@/features/projects/access/AwcProjectAccessMemberTaskPulse";
import useAwcMemberTaskPulses from "@/features/projects/access/hooks/useAwcMemberTaskPulses";
import { PROJECT_PAGE_METADATA_TEXT_CLASS } from "@/features/projects/projectPageMetadataText.constant";

/** Member/viewer Bots & people: who is working, who went quiet (read only). */
export default function AwcProjectAccessMemberTeamPulse({
  projectId,
}: {
  readonly projectId: string;
}) {
  const pulses = useAwcMemberTaskPulses(projectId);
  if (pulses === undefined || pulses.owners.length === 0) return null;
  return (
    <section className="space-y-2" aria-labelledby="member-team-pulse-h">
      <h3
        id="member-team-pulse-h"
        className={`text-xs font-semibold uppercase tracking-wide ${PROJECT_PAGE_METADATA_TEXT_CLASS}`}
      >
        Team activity
      </h3>
      <ul className="space-y-2">
        {pulses.owners.map((owner) => (
          <li
            key={owner.membershipId}
            className="flex flex-wrap items-center gap-2 text-sm"
          >
            <span className="font-medium text-awc-fg dark:text-white/90">
              {owner.name}
            </span>
            <AwcProjectAccessMemberTaskPulse
              projectId={projectId}
              membershipId={owner.membershipId}
              pulse={owner.pulse}
              nowMs={pulses.nowMs}
              canAskStatus={false}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
