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
  readonly onMutate: () => void;
}

export default function AwcProjectAccessPanelBody({
  projectId,
  access,
  onMutate,
}: AwcProjectAccessPanelBodyProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;

  return (
    <div className="space-y-3">
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
          onApprove={async (id, name) => {
            const result = await access.approve(id, name);
            onMutate();
            return result;
          }}
          onDeny={(id) => void access.deny(id).then(onMutate)}
        />
        <div className="border-t border-gray-200/70 pt-3 dark:border-gray-800/70">
          <AwcProjectAccessMembersList
            members={access.members}
            onRevoke={(id) => void access.revoke(id).then(onMutate)}
            onRename={async (membershipId, projectDisplayName) => {
              const result = await access.renameMember(
                membershipId,
                projectDisplayName,
              );
              onMutate();
              return result;
            }}
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
          projectId={projectId}
          projectName={access.projectName}
          hideChrome
          onCreate={() => void access.createInvite().then(onMutate)}
          onRevoke={(id) => void access.revokeInvite(id).then(onMutate)}
          onClearCreatedUrl={() => {
            access.setCreatedInviteUrl(null);
            access.setCreatedInviteToken(null);
          }}
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
