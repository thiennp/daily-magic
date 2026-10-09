"use client";

import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import AwcProjectMembersHelpersSection from "@/features/projects/members/AwcProjectMembersHelpersSection";
import AwcProjectMembersInviteBotsSection from "@/features/projects/members/AwcProjectMembersInviteBotsSection";
import AwcProjectMembersJoinRequestsSection from "@/features/projects/members/AwcProjectMembersJoinRequestsSection";
import AwcProjectMembersPeopleSection from "@/features/projects/members/AwcProjectMembersPeopleSection";
import AwcProjectMembersRailHeading from "@/features/projects/members/AwcProjectMembersRailHeading";
import AwcProjectMembersRailSkeleton from "@/features/projects/members/AwcProjectMembersRailSkeleton";
import { countRailMembers } from "@/features/projects/members/utils/countRailMembers";
import { resolveProjectAccessLoadError } from "@/lib/projects/acl/mapProjectAccessError";
import type { ReactNode } from "react";

/**
 * Members rail for a (non-owner) member: sees the people and can invite
 * people and assistants, and approves the assistants they invited. Other
 * join requests and removing people stay with the owner.
 */
export default function AwcProjectMembersMemberContent({
  projectId,
  ownerEmail,
  ownerDisplayName,
  menu,
  onMessageHelper,
}: {
  readonly projectId: string;
  readonly ownerEmail: string | null;
  readonly ownerDisplayName: string | null;
  readonly menu: ReactNode;
  readonly onMessageHelper?: (membershipId: string) => void;
}) {
  const access = useAwcProjectAccess(projectId);
  const ready = !access.isLoading && !access.loadError;
  return (
    <>
      <AwcProjectMembersRailHeading
        count={ready ? countRailMembers(access.members) : null}
        menu={menu}
      />
      <div className="flex flex-col gap-5">
        {access.isLoading ? <AwcProjectMembersRailSkeleton /> : null}
        {access.loadError ? (
          <p className="mx-3.5 rounded-md border border-awc-line bg-awc-surface-2 px-3 py-2 text-sm text-awc-bad">
            {resolveProjectAccessLoadError(access.loadError, "Could not load.")}
          </p>
        ) : null}
        {ready ? (
          <>
            <AwcProjectMembersHelpersSection
              projectId={projectId}
              members={access.members}
              onMessage={onMessageHelper}
              onRename={access.renameMember}
              onRemove={(id) => {
                void access.revoke(id);
              }}
              onWakeSaved={() => void access.reload()}
              onChanged={() => void access.reload()}
            />
            <AwcProjectMembersJoinRequestsSection
              projectId={projectId}
              pending={access.pending}
              expired={access.expired}
              onApprove={access.approve}
              onDeny={access.deny}
            />
            <AwcProjectMembersPeopleSection
              projectId={projectId}
              projectName={access.projectName}
              ownerEmail={ownerEmail}
              ownerDisplayName={ownerDisplayName}
              viewerIsOwner={false}
              accessMembers={access.members}
              pendingRequestCount={0}
              assistantInviteCount={0}
              onWaitingCountChange={() => undefined}
            />
            <AwcProjectMembersInviteBotsSection
              projectId={projectId}
              access={access}
            />
          </>
        ) : null}
        {access.message ? (
          <p className="px-3.5 text-sm text-awc-fg-muted dark:text-gray-300">
            {access.message}
          </p>
        ) : null}
      </div>
    </>
  );
}
