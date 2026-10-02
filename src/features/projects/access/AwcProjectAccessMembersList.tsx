"use client";

import { useState } from "react";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";

interface MemberRow {
  readonly id: string;
  readonly userId: string;
  readonly teamLabel: string | null;
  readonly projectDisplayName: string | null;
  readonly isAgent: boolean;
}

interface AwcProjectAccessMembersListProps {
  readonly members: readonly MemberRow[];
  readonly onRevoke: (membershipId: string) => void;
  readonly onRename: (
    membershipId: string,
    projectDisplayName: string,
  ) => Promise<{ readonly ok: boolean; readonly errorMessage?: string }>;
}

export const awcProjectAccessMemberAnchorId = (userId: string): string =>
  `access-member-${encodeURIComponent(userId)}`;

export default function AwcProjectAccessMembersList({
  members,
  onRevoke,
  onRename,
}: AwcProjectAccessMembersListProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <div id="project-access-members">
      <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
        {copy.membersHeading}
      </h3>
      {members.length === 0 ? (
        <p className="mt-1 text-sm text-gray-500">{copy.membersEmpty}</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {members.map((member) => (
            <li
              key={member.id}
              id={awcProjectAccessMemberAnchorId(member.userId)}
              className="flex flex-wrap items-center justify-between gap-2 scroll-mt-20 rounded-md text-sm target:ring-2 target:ring-amber-400/80"
            >
              <span className="text-gray-800 dark:text-white/90">
                {member.isAgent && member.projectDisplayName ? (
                  <>
                    <span className="font-medium">
                      {member.projectDisplayName}
                    </span>
                    <span className="ml-2 text-xs text-gray-400">
                      {copy.memberUuidMuted} {member.userId.slice(0, 8)}…
                    </span>
                  </>
                ) : (
                  member.userId
                )}
                {member.teamLabel ? ` (${member.teamLabel})` : ""}
              </span>
              <span className="flex gap-2">
                {member.isAgent ? (
                  editingId === member.id ? (
                    <>
                      <input
                        className="rounded-md border px-1 text-xs"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                      <button
                        type="button"
                        className="rounded-md bg-brand-600 px-2 py-1 text-xs text-white"
                        onClick={() => {
                          void onRename(member.id, editValue).then((result) => {
                            if (result.ok) {
                              setEditingId(null);
                              setError(null);
                            } else {
                              setError(
                                result.errorMessage === "display_name_taken"
                                  ? copy.displayNameTaken
                                  : (result.errorMessage ?? "Failed."),
                              );
                            }
                          });
                        }}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="rounded-md border px-2 py-1 text-xs"
                      onClick={() => {
                        setEditingId(member.id);
                        setEditValue(member.projectDisplayName ?? "");
                        setError(null);
                      }}
                    >
                      {copy.rename}
                    </button>
                  )
                ) : null}
                <button
                  type="button"
                  className="rounded-md border border-red-300 px-2 py-1 text-xs text-red-700"
                  onClick={() => onRevoke(member.id)}
                >
                  {copy.revoke}
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
      {error ? (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      ) : null}
    </div>
  );
}
