"use client";

import { useState } from "react";

import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import AwcProjectMembersHelpersSection from "@/features/projects/members/AwcProjectMembersHelpersSection";
import AwcAccessLogRailFooter from "@/features/projects/accessLog/AwcAccessLogRailFooter";
import AwcProjectMembersJoinRequestsSection from "@/features/projects/members/AwcProjectMembersJoinRequestsSection";
import AwcProjectMembersInviteBotsSection from "@/features/projects/members/AwcProjectMembersInviteBotsSection";
import AwcProjectMembersPeopleSection from "@/features/projects/members/AwcProjectMembersPeopleSection";
import AwcProjectMembersRailHeading from "@/features/projects/members/AwcProjectMembersRailHeading";
import AwcProjectMembersRailSkeleton from "@/features/projects/members/AwcProjectMembersRailSkeleton";
import { countRailMembers, countRailWaiting } from "@/features/projects/members/utils/countRailMembers";
import { resolveProjectAccessLoadError } from "@/lib/projects/acl/mapProjectAccessError";

interface AwcProjectMembersOwnerContentProps {
  readonly projectId: string;
  readonly ownerEmail: string | null;
  readonly ownerDisplayName: string | null;
  readonly onMessageHelper: (membershipId: string) => void;
}

/** Owner Members rail body — people · assistants · invite bots (live APIs). */
export default function AwcProjectMembersOwnerContent({
  projectId,
  ownerEmail,
  ownerDisplayName,
  onMessageHelper,
}: AwcProjectMembersOwnerContentProps) {
  const access = useAwcProjectAccess(projectId);
  const ready = !access.isLoading && !access.loadError;
  // DF-036 F5: the People section owns the person-invite list; it reports its waiting count.
  const [peopleWaiting, setPeopleWaiting] = useState(0);
  const waiting = countRailWaiting({
    peopleInvites: peopleWaiting,
    joinRequests: access.pending.length,
    assistantInvites: access.invites.length,
  });

  return (
    <>
      <AwcProjectMembersRailHeading
        count={ready ? countRailMembers(access.members) : null}
        waiting={ready ? waiting : 0}
      />
      <div className="flex flex-col gap-5" data-layout-v2="l5-members">
        {access.isLoading ? <AwcProjectMembersRailSkeleton /> : null}
        {access.loadError ? (
          <p className="mx-3.5 rounded-md border border-awc-line bg-awc-surface-2 px-3 py-2 text-sm text-awc-bad">
            {resolveProjectAccessLoadError(access.loadError, "Could not load.")}
          </p>
        ) : null}
        {ready ? (
          <>
            {/* P1-S4b: design panel order — Pending, Assistants, People, Invite. */}
            <AwcProjectMembersJoinRequestsSection
              projectId={projectId}
              pending={access.pending}
              expired={access.expired}
              onApprove={access.approve}
              onDeny={access.deny}
            />
            <AwcProjectMembersHelpersSection
              projectId={projectId}
              members={access.members}
              onWakeSaved={() => void access.reload()}
              onMessage={onMessageHelper}
              onRename={access.renameMember}
              onRemove={(id) => {
                void access.revoke(id);
              }}
            />
            <AwcProjectMembersPeopleSection
              projectId={projectId}
              projectName={access.projectName}
              ownerEmail={ownerEmail}
              ownerDisplayName={ownerDisplayName}
              accessMembers={access.members}
              pendingRequestCount={access.pending.length}
              assistantInviteCount={access.invites.length}
              onWaitingCountChange={setPeopleWaiting}
            />
            <AwcProjectMembersInviteBotsSection projectId={projectId} access={access} />
            <AwcAccessLogRailFooter projectId={projectId} />
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
