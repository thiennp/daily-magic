"use client";

import type { ReactNode } from "react";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
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
  readonly autoApproved?: boolean;
  readonly editing: boolean;
  readonly editValue: string;
  readonly onEditValue: (value: string) => void;
  readonly onStartEdit: () => void;
  readonly onSaveRename: () => void;
  readonly onCancelEdit: () => void;
  readonly onRevoke: () => void;
  readonly grokWebhook?: ReactNode;
}

export default function AwcProjectAccessMemberRow({
  member,
  autoApproved = false,
  editing,
  editValue,
  onEditValue,
  onStartEdit,
  onSaveRename,
  onCancelEdit,
  onRevoke,
  grokWebhook = null,
}: AwcProjectAccessMemberRowProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const mutedId = `${copy.memberUuidMuted} ${member.userId.slice(0, 8)}…`;
  return (
    <li
      id={awcProjectAccessMemberAnchorId(member.userId)}
      className="flex flex-wrap items-center justify-between gap-2 scroll-mt-20 rounded-md text-sm target:ring-2 target:ring-amber-400/80"
    >
      <span className="text-gray-800 dark:text-white/90">
        {member.isAgent ? (
          <>
            <span className="font-medium">
              {member.projectDisplayName?.trim()
                ? member.projectDisplayName
                : copy.memberNoNickname}
            </span>
            <span className="ml-2 text-xs text-gray-400">{mutedId}</span>
          </>
        ) : (
          <span className="text-xs text-gray-500">{member.userId}</span>
        )}
        {member.teamLabel ? (
          <span className="ml-1 text-xs text-gray-500">
            ({member.teamLabel})
          </span>
        ) : null}
        {autoApproved ? (
          <span className="ml-2 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200">
            {copy.autoApprovedBadge}
          </span>
        ) : null}
      </span>
      <span className="flex flex-wrap gap-2">
        {member.isAgent ? (
          editing ? (
            <span className="flex flex-col gap-1">
              <span className="flex flex-wrap items-center gap-2">
                <input
                  className="rounded-md border px-1 text-xs"
                  value={editValue}
                  aria-label={copy.displayNameLabel}
                  onChange={(e) => onEditValue(e.target.value)}
                />
                <button
                  type="button"
                  className={AWC_PROJECT_ACCESS_CTA.primary}
                  onClick={onSaveRename}
                >
                  {copy.renameSave}
                </button>
                <button
                  type="button"
                  className={AWC_PROJECT_ACCESS_CTA.secondary}
                  onClick={onCancelEdit}
                >
                  {copy.renameCancel}
                </button>
              </span>
              <span className="text-[11px] text-gray-500">{copy.renameHint}</span>
            </span>
          ) : (
            <button
              type="button"
              className={AWC_PROJECT_ACCESS_CTA.secondary}
              onClick={onStartEdit}
            >
              {copy.rename}
            </button>
          )
        ) : null}
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.danger}
          onClick={onRevoke}
        >
          {copy.revoke}
        </button>
      </span>
      {grokWebhook}
    </li>
  );
}
