"use client";

import { useMemo } from "react";

import type { AwcProjectAccessMember } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import { useAwcProjectAccessWakeLinks } from "@/features/projects/access/hooks/useAwcProjectAccessWakeLinks";
import AwcProjectMembersHelpersUpdateAll from "@/features/projects/members/AwcProjectMembersHelpersUpdateAll";
import AwcProjectMembersHelperListItem from "@/features/projects/members/AwcProjectMembersHelperListItem";
import { isRailAssistantMember } from "@/features/projects/members/utils/countRailMembers";
import SectionIcon, {
  SECTION_CARD,
} from "@/features/projects/members/AwcProjectMembersSectionCard";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/public-api/types";

interface AwcProjectMembersHelpersSectionProps {
  readonly projectId: string;
  readonly members: readonly AwcProjectAccessMember[];
  /** The viewer is the project owner (may still remove others' assistants). */
  readonly isOwner?: boolean;
  readonly onMessage?: (membershipId: string) => void;
  readonly onRename?: (
    membershipId: string,
    name: string,
  ) => Promise<{ readonly ok: boolean }>;
  readonly onRemove?: (membershipId: string) => void;
  /** After a wake-link save: reload Access so the row confirms Ready. */
  readonly onWakeSaved?: () => void;
  /** After block/unblock: reload Access. */
  readonly onChanged?: () => void;
}

/** Assistants in the project — flat expandable rows with real wake status. */
export default function AwcProjectMembersHelpersSection({
  projectId,
  members,
  isOwner = false,
  onMessage,
  onRename,
  onRemove,
  onWakeSaved,
  onChanged,
}: AwcProjectMembersHelpersSectionProps) {
  const helpers = useMemo(
    () => members.filter(isRailAssistantMember),
    [members],
  );
  const { list: wake } = useAwcProjectAccessWakeLinks(
    helpers.filter((member) => member.canManageBot === true),
  );
  const onSaved = (membershipId: string): void => {
    wake.onSaved(membershipId);
    onWakeSaved?.();
  };

  return (
    <section className={SECTION_CARD} aria-labelledby="members-helpers-h">
      <div className="flex items-center gap-2">
        <SectionIcon tone="pine" icon="assistants" />
        <h3
          id="members-helpers-h"
          className="text-sm font-semibold text-awc-fg"
        >
          {C.helpersHeading}
        </h3>
        <span className="rounded-full bg-awc-fill px-2 text-[12px] tabular-nums text-awc-fg-muted">
          {helpers.length}
        </span>
        <AwcProjectMembersHelpersUpdateAll
          projectId={projectId}
          outdatedIds={helpers
            .filter((m) => m.canManageBot && m.guidanceOutdated)
            .map((m) => m.id)}
        />
      </div>
      {helpers.length === 0 ? (
        <p className="px-3.5 py-2 text-[13px] text-awc-fg-subtle">
          {C.helpersEmpty}
        </p>
      ) : (
        <ul className="flex flex-col">
          {helpers.map((member) => (
            <AwcProjectMembersHelperListItem
              key={member.id}
              projectId={projectId}
              member={member}
              isOwner={isOwner}
              wake={wake}
              onWakeSaved={onSaved}
              onMessage={onMessage}
              onRename={onRename}
              onRemove={onRemove}
              onChanged={onChanged}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
