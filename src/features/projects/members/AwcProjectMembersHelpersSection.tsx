"use client";

import { useMemo } from "react";

import type { AwcProjectAccessMember } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import { useAwcProjectAccessWakeLinks } from "@/features/projects/access/hooks/useAwcProjectAccessWakeLinks";
import AwcProjectMembersHelperRow from "@/features/projects/members/AwcProjectMembersHelperRow";
import { isRailAssistantMember } from "@/features/projects/members/utils/countRailMembers";
import SectionIcon, {
  SECTION_CARD,
} from "@/features/projects/members/AwcProjectMembersSectionCard";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";

interface AwcProjectMembersHelpersSectionProps {
  readonly projectId: string;
  readonly members: readonly AwcProjectAccessMember[];
  readonly onMessage: (membershipId: string) => void;
  readonly onRename: (
    membershipId: string,
    name: string,
  ) => Promise<{ readonly ok: boolean }>;
  readonly onRemove: (membershipId: string) => void;
  /** After a wake-link save: reload Access so the row confirms Ready. */
  readonly onWakeSaved?: () => void;
}

/** Assistants in the project — flat expandable rows with real wake status. */
export default function AwcProjectMembersHelpersSection({
  projectId,
  members,
  onMessage,
  onRename,
  onRemove,
  onWakeSaved,
}: AwcProjectMembersHelpersSectionProps) {
  const helpers = useMemo(
    () => members.filter(isRailAssistantMember),
    [members],
  );
  const { list: wake } = useAwcProjectAccessWakeLinks(helpers);
  const onSaved = (membershipId: string): void => {
    wake.onSaved(membershipId);
    onWakeSaved?.();
  };

  return (
    <section className={SECTION_CARD} aria-labelledby="members-helpers-h">
      <div className="flex items-center gap-2">
        <SectionIcon tone="pine" />
        <h3
          id="members-helpers-h"
          className="text-sm font-semibold text-awc-fg"
        >
          {C.helpersHeading}
        </h3>
        <span className="rounded-full bg-awc-fill px-2 text-[12px] tabular-nums text-awc-fg-muted">
          {helpers.length}
        </span>
      </div>
      {helpers.length === 0 ? (
        <p className="px-3.5 py-2 text-[13px] text-awc-fg-subtle">
          {C.helpersEmpty}
        </p>
      ) : (
        <ul className="flex flex-col">
          {helpers.map((member) => (
            <AwcProjectMembersHelperRow
              key={member.id}
              projectId={projectId}
              member={member}
              savedIds={wake.savedIds}
              wakeOpenRequest={
                wake.request?.membershipId === member.id
                  ? wake.request.nonce
                  : 0
              }
              onWakeSaved={onSaved}
              onMessage={onMessage}
              onRename={async (id, name) => (await onRename(id, name)).ok}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
