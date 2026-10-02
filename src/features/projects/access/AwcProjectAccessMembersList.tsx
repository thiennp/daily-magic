"use client";

import { useState } from "react";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import type { AwcMembershipView } from "@/features/projects/access/types/awcProjectAccessContract.type";

interface AwcProjectAccessMembersListProps {
  readonly members: readonly AwcMembershipView[];
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
  const [draft, setDraft] = useState("");
  const [renameError, setRenameError] = useState<string | null>(null);

  const primaryLabel = (member: AwcMembershipView): string => {
    if (member.isAgent) {
      return member.projectDisplayName ?? copy.unnamedAgent;
    }
    return member.displayName || member.projectDisplayName || member.userId;
  };

  const startRename = (member: AwcMembershipView) => {
    setEditingId(member.id);
    setDraft(member.projectDisplayName ?? "");
    setRenameError(null);
  };

  const saveRename = async (membershipId: string) => {
    const result = await onRename(membershipId, draft);
    if (!result.ok) {
      setRenameError(result.errorMessage ?? "Rename failed.");
      return;
    }
    setEditingId(null);
    setRenameError(null);
  };

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
              <div className="min-w-0">
                <p className="font-medium text-gray-900 dark:text-white/90">
                  {primaryLabel(member)}
                  {member.teamLabel ? (
                    <span className="font-normal text-gray-500">
                      {" "}
                      ({member.teamLabel})
                    </span>
                  ) : null}
                  {member.isAgent ? (
                    <span className="ml-1 text-xs font-normal text-gray-500">
                      · agent
                    </span>
                  ) : null}
                </p>
                <p className="truncate font-mono text-[0.6875rem] text-gray-400">
                  {copy.memberUuidMuted}: {member.userId}
                </p>
                {editingId === member.id ? (
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <input
                      className="rounded-md border border-gray-300 bg-white px-2 py-1 text-xs dark:border-gray-700 dark:bg-gray-950"
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                    />
                    <button
                      type="button"
                      className="rounded-md bg-brand-600 px-2 py-1 text-xs text-white"
                      onClick={() => void saveRename(member.id)}
                    >
                      {copy.renameSave}
                    </button>
                    <button
                      type="button"
                      className="rounded-md border px-2 py-1 text-xs"
                      onClick={() => setEditingId(null)}
                    >
                      {copy.renameCancel}
                    </button>
                    {renameError ? (
                      <span className="text-xs text-red-600">{renameError}</span>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <span className="flex gap-2">
                {member.isAgent && member.role !== "owner" ? (
                  <button
                    type="button"
                    className="rounded-md border px-2 py-1 text-xs"
                    onClick={() => startRename(member)}
                  >
                    {copy.rename}
                  </button>
                ) : null}
                {member.role !== "owner" ? (
                  <button
                    type="button"
                    className="rounded-md border border-red-300 px-2 py-1 text-xs text-red-700"
                    onClick={() => onRevoke(member.id)}
                  >
                    {copy.revoke}
                  </button>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
