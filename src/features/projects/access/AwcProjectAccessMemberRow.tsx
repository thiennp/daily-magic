"use client";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { awcProjectAccessMemberAnchorId } from "@/features/projects/access/awcProjectAccessMemberAnchor";

interface MemberRow {
  readonly id: string;
  readonly userId: string;
  readonly teamLabel: string | null;
  readonly projectDisplayName: string | null;
  readonly isAgent: boolean;
}

interface AwcProjectAccessMemberRowProps {
  readonly member: MemberRow;
  readonly editing: boolean;
  readonly editValue: string;
  readonly onEditValue: (value: string) => void;
  readonly onStartEdit: () => void;
  readonly onSaveRename: () => void;
  readonly onRevoke: () => void;
}

export default function AwcProjectAccessMemberRow({
  member,
  editing,
  editValue,
  onEditValue,
  onStartEdit,
  onSaveRename,
  onRevoke,
}: AwcProjectAccessMemberRowProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  return (
    <li
      id={awcProjectAccessMemberAnchorId(member.userId)}
      className="flex flex-wrap items-center justify-between gap-2 scroll-mt-20 rounded-md text-sm target:ring-2 target:ring-amber-400/80"
    >
      <span className="text-gray-800 dark:text-white/90">
        {member.isAgent && member.projectDisplayName ? (
          <>
            <span className="font-medium">{member.projectDisplayName}</span>
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
          editing ? (
            <>
              <input
                className="rounded-md border px-1 text-xs"
                value={editValue}
                onChange={(e) => onEditValue(e.target.value)}
              />
              <button
                type="button"
                className="rounded-md bg-brand-600 px-2 py-1 text-xs text-white"
                onClick={onSaveRename}
              >
                Save
              </button>
            </>
          ) : (
            <button
              type="button"
              className="rounded-md border px-2 py-1 text-xs"
              onClick={onStartEdit}
            >
              {copy.rename}
            </button>
          )
        ) : null}
        <button
          type="button"
          className="rounded-md border border-red-300 px-2 py-1 text-xs text-red-700"
          onClick={onRevoke}
        >
          {copy.revoke}
        </button>
      </span>
    </li>
  );
}
