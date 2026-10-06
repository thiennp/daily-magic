"use client";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";

interface MemberRow {
  readonly id: string;
  readonly userId: string;
  readonly teamLabel: string | null;
}

interface AwcProjectAccessMembersListProps {
  readonly members: readonly MemberRow[];
  readonly onRevoke: (membershipId: string) => void;
}

export const awcProjectAccessMemberAnchorId = (userId: string): string =>
  `access-member-${encodeURIComponent(userId)}`;

export default function AwcProjectAccessMembersList({
  members,
  onRevoke,
}: AwcProjectAccessMembersListProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
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
                {member.userId}
                {member.teamLabel ? ` (${member.teamLabel})` : ""}
              </span>
              <button
                type="button"
                className="rounded-md border border-red-300 px-2 py-1 text-xs text-red-700"
                onClick={() => onRevoke(member.id)}
              >
                {copy.revoke}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
