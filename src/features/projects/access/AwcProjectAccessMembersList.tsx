"use client";

import { useState } from "react";

import AwcProjectAccessMemberRow from "@/features/projects/access/AwcProjectAccessMemberRow";
import AwcProjectAccessMemberWakeLinkSlot from "@/features/projects/access/AwcProjectAccessMemberWakeLinkSlot";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import type { AwcMemberWakeLinksListProps } from "@/features/projects/access/hooks/useAwcProjectAccessWakeLinks";
import { resolveMemberWakeLinkState } from "@/features/projects/access/utils/resolveMemberWakeLinkState";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

export { awcProjectAccessMemberAnchorId } from "@/features/projects/access/awcProjectAccessMemberAnchor";

interface MemberRow {
  readonly id: string;
  readonly userId: string;
  readonly teamLabel: string | null;
  readonly projectDisplayName: string | null;
  readonly isAgent: boolean;
  /** Owner snapshot only (active member bots). */
  readonly wakeLinkSet?: boolean;
}

interface AwcProjectAccessMembersListProps {
  readonly projectId?: string;
  readonly members: readonly MemberRow[];
  readonly recentlyAutoApprovedIds?: readonly string[];
  readonly onRevoke: (membershipId: string) => void;
  readonly onRename: (
    membershipId: string,
    projectDisplayName: string,
  ) => Promise<{ readonly ok: boolean; readonly errorMessage?: string }>;
  /** Owner: wake-link pills, deep-link focus, session saves. */
  readonly wakeLinks?: AwcMemberWakeLinksListProps;
}

export default function AwcProjectAccessMembersList({
  projectId,
  members,
  recentlyAutoApprovedIds = [],
  onRevoke,
  onRename,
  wakeLinks,
}: AwcProjectAccessMembersListProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const savedIds = wakeLinks?.savedIds;

  return (
    <div id="project-access-members">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
        {copy.membersHeading}
      </h4>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {copy.membersLeaveHint}
      </p>
      {members.length === 0 ? (
        <p className="mt-1 text-sm text-gray-500">{copy.membersEmpty}</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {members.map((member) => (
            <AwcProjectAccessMemberRow
              key={member.id}
              member={member}
              autoApproved={recentlyAutoApprovedIds.includes(member.id)}
              editing={editingId === member.id}
              editValue={editValue}
              onEditValue={setEditValue}
              onStartEdit={() => {
                setEditingId(member.id);
                setEditValue(member.projectDisplayName ?? "");
                setError(null);
              }}
              onCancelEdit={() => {
                setEditingId(null);
                setError(null);
              }}
              onSaveRename={() => {
                void onRename(member.id, editValue).then((result) => {
                  if (result.ok) {
                    setEditingId(null);
                    setError(null);
                  } else {
                    setError(
                      mapProjectAccessError(
                        result.errorMessage,
                        "Failed to rename.",
                      ),
                    );
                  }
                });
              }}
              onRevoke={() => onRevoke(member.id)}
              wakeLinkState={resolveMemberWakeLinkState(member, savedIds)}
              grokWebhook={
                <AwcProjectAccessMemberWakeLinkSlot
                  projectId={projectId}
                  member={member}
                  wakeLinks={wakeLinks}
                />
              }
            />
          ))}
        </ul>
      )}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
