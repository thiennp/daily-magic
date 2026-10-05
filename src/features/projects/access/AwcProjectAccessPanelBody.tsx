"use client";

import AwcProjectAccessFoldersSection from "@/features/projects/access/AwcProjectAccessFoldersSection";
import AwcProjectAccessMembersList from "@/features/projects/access/AwcProjectAccessMembersList";
import AwcProjectAccessPendingList from "@/features/projects/access/AwcProjectAccessPendingList";
import AwcProjectAccessSection from "@/features/projects/access/AwcProjectAccessSection";
import AwcProjectInvitesPanel from "@/features/projects/access/invites/AwcProjectInvitesPanel";
import AwcProjectInboxSection from "@/features/projects/access/inbox/AwcProjectInboxSection";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import type { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";

type AccessApi = ReturnType<typeof useAwcProjectAccess>;

interface AwcProjectAccessPanelBodyProps {
  readonly projectId: string;
  readonly access: AccessApi;
}

export default function AwcProjectAccessPanelBody({
  projectId,
  access,
}: AwcProjectAccessPanelBodyProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;

  return (
    <div className="space-y-3">
      {access.autoApprovedBanner ? (
        <p
          role="status"
          className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1.5 text-xs font-medium text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200"
        >
          {access.autoApprovedBanner}
        </p>
      ) : null}
      <AwcProjectAccessSection
        id="project-access-people"
        title={copy.peopleHeading}
        hint={copy.peopleHint}
        count={access.members.length + access.pending.length}
        alertCount={access.pending.length > 0}
      >
        <AwcProjectAccessPendingList
          projectId={projectId}
          pending={access.pending}
          onApprove={async (id, name) => access.approve(id, name)}
          onDeny={(id) => void access.deny(id)}
        />
        <div className="border-t border-gray-200/70 pt-3 dark:border-gray-800/70">
          <AwcProjectAccessMembersList
            projectId={projectId}
            members={access.members}
            recentlyAutoApprovedIds={access.recentlyAutoApprovedIds}
            onRevoke={(id) => void access.revoke(id)}
            onRename={async (membershipId, projectDisplayName) =>
              access.renameMember(membershipId, projectDisplayName)
            }
          />
        </div>
      </AwcProjectAccessSection>

      <AwcProjectAccessSection
        id="project-access-invites"
        title={copy.invitesHeading}
        hint={copy.invitesIntro}
        count={access.invites.length}
      >
        <AwcProjectInvitesPanel
          invites={access.invites}
          createdInviteUrl={access.createdInviteUrl}
          createdInviteToken={access.createdInviteToken}
          createdInvitePlatform={access.createdInvitePlatform}
          projectId={projectId}
          projectName={access.projectName}
          hideChrome
          onCreate={(platform) => void access.createInvite(platform)}
          onRevoke={(id) => void access.revokeInvite(id)}
          onClearCreatedUrl={access.clearCreatedInviteBanner}
        />
      </AwcProjectAccessSection>

      <AwcProjectInboxSection projectId={projectId} enabled />

      <AwcProjectAccessFoldersSection
        projectId={projectId}
        folderRefs={access.folderRefs}
        onMessage={access.setMessage}
        onReload={access.reload}
      />
    </div>
  );
}
