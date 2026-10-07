"use client";

import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import AwcProjectMembersHelpersSection from "@/features/projects/members/AwcProjectMembersHelpersSection";
import AwcAccessLogRailFooter from "@/features/projects/accessLog/AwcAccessLogRailFooter";
import AwcProjectMembersJoinRequestsSection from "@/features/projects/members/AwcProjectMembersJoinRequestsSection";
import AwcProjectMembersInviteBotsSection from "@/features/projects/members/AwcProjectMembersInviteBotsSection";
import AwcProjectMembersPeopleSection from "@/features/projects/members/AwcProjectMembersPeopleSection";
import AwcProjectMembersRailHeading from "@/features/projects/members/AwcProjectMembersRailHeading";
import { countRailMembers } from "@/features/projects/members/utils/countRailMembers";
import { PROJECT_PAGE_MEMBERS_COPY as C } from "@/features/projects/projectPageMembersCopy.constant";
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

  return (
    <>
      <AwcProjectMembersRailHeading
        count={ready ? countRailMembers(access.members) : null}
      />
      <div className="flex flex-col gap-5" data-layout-v2="l5-members">
        {access.isLoading ? (
          <p className="px-3.5 text-sm text-awc-fg-muted">{C.loading}</p>
        ) : null}
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
            />
            <AwcProjectMembersInviteBotsSection
              projectId={projectId}
              projectName={access.projectName}
              invites={access.invites}
              createdInviteUrl={access.createdInviteUrl}
              createdInviteToken={access.createdInviteToken}
              createdInvitePlatform={access.createdInvitePlatform}
              createdInviteJoinTypeId={access.createdInviteJoinTypeId}
              createdInvitePrompts={access.createdInvitePrompts}
              onCreate={(selection) => {
                void access.createInvite(
                  selection.platform,
                  false,
                  selection.joinTypeId,
                );
              }}
              onRevoke={(id) => {
                void access.revokeInvite(id);
              }}
              onTurnOffAutoApprove={(id) => {
                void access.turnOffAutoApprove(id);
              }}
              onClearCreated={access.clearCreatedInviteBanner}
            />
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
