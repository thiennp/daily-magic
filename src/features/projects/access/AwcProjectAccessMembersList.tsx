"use client";

import { useState } from "react";

import AwcProjectAccessMemberRow from "@/features/projects/access/AwcProjectAccessMemberRow";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

export { awcProjectAccessMemberAnchorId } from "@/features/projects/access/awcProjectAccessMemberAnchor";

interface MemberRow {
  readonly id: string;
  readonly userId: string;
  readonly teamLabel: string | null;
  readonly projectDisplayName: string | null;
  readonly isAgent: boolean;
}

interface AwcProjectAccessMembersListProps {
  readonly members: readonly MemberRow[];
  readonly recentlyAutoApprovedIds?: readonly string[];
  readonly onRevoke: (membershipId: string) => void;
  readonly onRename: (
    membershipId: string,
    projectDisplayName: string,
  ) => Promise<{ readonly ok: boolean; readonly errorMessage?: string }>;
}

export default function AwcProjectAccessMembersList({
  members,
  recentlyAutoApprovedIds = [],
  onRevoke,
  onRename,
}: AwcProjectAccessMembersListProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState<string | null>(null);

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
            />
          ))}
        </ul>
      )}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
