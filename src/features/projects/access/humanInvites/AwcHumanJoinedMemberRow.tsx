"use client";

import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/humanInviteUiCopy.constant";
import type { HumanJoinedMemberRow } from "@/features/projects/access/humanInvites/types/humanInviteUiContract.type";

export type AwcHumanJoinedMemberRowProps = {
  readonly member: HumanJoinedMemberRow;
  readonly onRemoveMember?: (membershipId: string) => void;
};

/** Joined human member row — Remove with deferred Undo upstream. */
export default function AwcHumanJoinedMemberRow({
  member,
  onRemoveMember,
}: AwcHumanJoinedMemberRowProps) {
  const copy = HUMAN_INVITE_UI_COPY;

  return (
    <li className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-awc-border/70 bg-white px-3 py-2 text-sm dark:border-gray-800 dark:bg-transparent">
      <div>
        <div className="font-medium text-awc-fg dark:text-white/90">
          {member.displayName ?? member.email ?? member.userId}
        </div>
        <div className="text-xs text-awc-fg-muted">
          {member.role}
          {member.email ? ` · ${member.email}` : ""}
          {member.joinedAt
            ? ` · joined ${new Date(member.joinedAt).toLocaleDateString()}`
            : ""}
        </div>
      </div>
      <button
        type="button"
        className={AWC_PROJECT_ACCESS_CTA.danger}
        onClick={() => onRemoveMember?.(member.membershipId)}
      >
        {copy.remove}
      </button>
    </li>
  );
}
