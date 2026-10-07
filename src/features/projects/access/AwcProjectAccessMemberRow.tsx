"use client";

import type { ReactNode } from "react";

import {
  AWC_GROK_WAKE_AWAITING_COPY,
  formatAwcGrokWakeCopy,
} from "@/features/projects/access/awcGrokWakeAwaitingCopy.constant";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { awcProjectAccessMemberAnchorId } from "@/features/projects/access/awcProjectAccessMemberAnchor";
import AwcProjectAccessMemberRenameControls from "@/features/projects/access/AwcProjectAccessMemberRenameControls";
import AwcProjectAccessMemberWakeLinkPill from "@/features/projects/access/AwcProjectAccessMemberWakeLinkPill";
import type { AwcMemberWakeLinkState } from "@/features/projects/access/utils/resolveMemberWakeLinkState";
import { PROJECT_PAGE_METADATA_TEXT_CLASS } from "@/features/projects/projectPageMetadataText.constant";

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
  /** Owner only: null = no wake-link pill (non-bots, unknown, non-owner). */
  readonly wakeLinkState?: AwcMemberWakeLinkState;
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
  wakeLinkState = null,
}: AwcProjectAccessMemberRowProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const mutedId = `${copy.memberUuidMuted} ${member.userId.slice(0, 8)}…`;
  return (
    <li
      id={awcProjectAccessMemberAnchorId(member.userId)}
      className="flex flex-wrap items-center justify-between gap-2 scroll-mt-20 rounded-md text-sm target:ring-2 target:ring-amber-400/80"
    >
      <span className="text-awc-fg dark:text-white/90">
        {member.isAgent ? (
          <>
            <span className="font-medium">
              {member.projectDisplayName?.trim()
                ? member.projectDisplayName
                : copy.memberNoNickname}
            </span>
            <span className={`ml-2 text-xs ${PROJECT_PAGE_METADATA_TEXT_CLASS}`}>
              {mutedId}
            </span>
          </>
        ) : (
          <span className="text-xs text-awc-fg-muted">{member.userId}</span>
        )}
        {member.teamLabel ? (
          <span className="ml-1 text-xs text-awc-fg-muted">({member.teamLabel})</span>
        ) : null}
        {autoApproved ? (
          <span className="ml-2 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200">
            {copy.autoApprovedBadge}
          </span>
        ) : null}
        <AwcProjectAccessMemberWakeLinkPill state={wakeLinkState} />
      </span>
      <span className="flex flex-wrap gap-2">
        {member.isAgent ? (
          <AwcProjectAccessMemberRenameControls
            editing={editing}
            editValue={editValue}
            onEditValue={onEditValue}
            onStartEdit={onStartEdit}
            onSaveRename={onSaveRename}
            onCancelEdit={onCancelEdit}
          />
        ) : null}
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.danger}
          onClick={onRevoke}
        >
          {copy.revoke}
        </button>
      </span>
      {wakeLinkState === "awaiting" ? (
        <p className="basis-full text-xs text-awc-fg-muted dark:text-gray-300">
          {formatAwcGrokWakeCopy(
            AWC_GROK_WAKE_AWAITING_COPY.helper,
            member.projectDisplayName,
          )}
        </p>
      ) : null}
      {grokWebhook}
    </li>
  );
}
