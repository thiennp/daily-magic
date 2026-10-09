"use client";

import type { AwcProjectAccessMember } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import type { useAwcProjectAccessWakeLinks } from "@/features/projects/access/hooks/useAwcProjectAccessWakeLinks";
import AwcProjectMembersHelperBotLine from "@/features/projects/members/AwcProjectMembersHelperBotLine";
import AwcProjectMembersHelperRow from "@/features/projects/members/AwcProjectMembersHelperRow";
import AwcProjectMembersReadOnlyHelperLabel from "@/features/projects/members/AwcProjectMembersReadOnlyHelperLabel";
import { BOT_MANAGEMENT_COPY as C } from "@/features/projects/members/botManagementCopy.constant";

type Wake = ReturnType<typeof useAwcProjectAccessWakeLinks>["list"];

/**
 * One assistant. Whoever invited it edits it (rename, wake link, message,
 * remove); everyone else, owner included, sees its name and logo, and the
 * owner can still remove it.
 */
export default function AwcProjectMembersHelperListItem({
  projectId,
  member,
  isOwner,
  wake,
  onWakeSaved,
  onMessage,
  onRename,
  onRemove,
  onChanged,
}: {
  readonly projectId: string;
  readonly member: AwcProjectAccessMember;
  readonly isOwner: boolean;
  readonly wake: Wake;
  readonly onWakeSaved: (membershipId: string) => void;
  readonly onMessage?: (membershipId: string) => void;
  readonly onRename?: (
    membershipId: string,
    name: string,
  ) => Promise<{ readonly ok: boolean }>;
  readonly onRemove?: (membershipId: string) => void;
  readonly onChanged?: () => void;
}) {
  const changed = onChanged ?? (() => undefined);
  if (member.canManageBot === true) {
    return (
      <AwcProjectMembersHelperRow
        projectId={projectId}
        member={member}
        savedIds={wake.savedIds}
        wakeOpenRequest={
          wake.request?.membershipId === member.id ? wake.request.nonce : 0
        }
        onWakeSaved={onWakeSaved}
        onMessage={onMessage ?? (() => undefined)}
        onRename={async (id, name) => (await onRename?.(id, name))?.ok ?? false}
        onRemove={onRemove ?? (() => undefined)}
        onChanged={changed}
      />
    );
  }
  return (
    <li className="flex flex-col">
      <span className="flex items-center justify-between gap-2">
        <AwcProjectMembersReadOnlyHelperLabel member={member} />
        {isOwner && onRemove ? (
          <button
            type="button"
            className="awc-focus-ring mr-3.5 text-[12.5px] font-semibold text-awc-bad hover:underline"
            onClick={() => onRemove(member.id)}
          >
            {C.remove}
          </button>
        ) : null}
      </span>
      <AwcProjectMembersHelperBotLine
        projectId={projectId}
        member={member}
        onChanged={changed}
      />
    </li>
  );
}
