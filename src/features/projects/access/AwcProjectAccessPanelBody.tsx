"use client";

import { useMemo } from "react";

import useAwcMemberTaskPulses from "@/features/projects/access/hooks/useAwcMemberTaskPulses";
import AwcProjectAccessAutoApprovedBanner from "@/features/projects/access/AwcProjectAccessAutoApprovedBanner";
import AwcProjectAccessComputerMembersSection from "@/features/projects/access/AwcProjectAccessComputerMembersSection";
import AwcProjectAccessFoldersSection from "@/features/projects/access/AwcProjectAccessFoldersSection";
import AwcProjectAccessMembersList from "@/features/projects/access/AwcProjectAccessMembersList";
import AwcProjectAccessPendingList from "@/features/projects/access/AwcProjectAccessPendingList";
import AwcProjectAccessSection from "@/features/projects/access/AwcProjectAccessSection";
import AwcProjectAccessWakeLinkAwaitingBanner from "@/features/projects/access/AwcProjectAccessWakeLinkAwaitingBanner";
import AwcProjectAccessInvitesSection from "@/features/projects/access/AwcProjectAccessInvitesSection";
import AwcProjectInboxSection from "@/features/projects/access/inbox/AwcProjectInboxSection";
import AwcHumanPeopleSection from "@/features/projects/access/humanInvites/AwcHumanPeopleSection";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { isComputerAccessMember } from "@/features/projects/access/utils/isComputerAccessMember";
import type { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import { useAwcProjectAccessWakeLinks } from "@/features/projects/access/hooks/useAwcProjectAccessWakeLinks";

type AccessApi = ReturnType<typeof useAwcProjectAccess>;

interface AwcProjectAccessPanelBodyProps {
  readonly projectId: string;
  readonly access: AccessApi;
  readonly ownerEmail?: string | null;
  readonly ownerDisplayName?: string | null;
  /** Signed-in owner's user id — "Your computer" sub-line on computer rows. */
  readonly viewerUserId?: string | null;
}

export default function AwcProjectAccessPanelBody({
  projectId,
  access,
  ownerEmail = null,
  ownerDisplayName = null,
  viewerUserId = null,
}: AwcProjectAccessPanelBodyProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const botMembers = useMemo(
    () => access.members.filter((member) => member.isAgent),
    [access.members],
  );
  const computerMembers = useMemo(
    () => access.members.filter(isComputerAccessMember),
    [access.members],
  );
  const wakeLinks = useAwcProjectAccessWakeLinks(botMembers);
  const taskPulses = useAwcMemberTaskPulses(projectId);

  return (
    <div className="space-y-3">
      <AwcProjectAccessAutoApprovedBanner message={access.autoApprovedBanner} />
      <AwcProjectAccessWakeLinkAwaitingBanner wakeLinks={wakeLinks} />

      <AwcHumanPeopleSection
        projectId={projectId}
        projectName={access.projectName}
        ownerEmail={ownerEmail}
        ownerDisplayName={ownerDisplayName}
        accessMembers={access.members}
        pendingRequestCount={access.pending.length}
        enabled
      />

      <AwcProjectAccessSection
        id="project-access-people"
        title={copy.peopleHeading}
        hint={copy.peopleHint}
        count={botMembers.length + access.pending.length}
        alertCount={access.pending.length > 0}
      >
        <AwcProjectAccessPendingList
          projectId={projectId}
          pending={access.pending}
          onApprove={async (id, name) => access.approve(id, name)}
          onDeny={(id) => access.deny(id)}
        />
        <div className="border-t border-awc-border/70 pt-3 dark:border-gray-800/70">
          <AwcProjectAccessMembersList
            projectId={projectId}
            members={botMembers}
            recentlyAutoApprovedIds={access.recentlyAutoApprovedIds}
            onRevoke={(id) => void access.revoke(id)}
            onRename={async (membershipId, projectDisplayName) =>
              access.renameMember(membershipId, projectDisplayName)
            }
            wakeLinks={wakeLinks.list}
            taskPulses={taskPulses}
          />
        </div>
      </AwcProjectAccessSection>

      <AwcProjectAccessComputerMembersSection
        computers={computerMembers}
        viewerUserId={viewerUserId}
      />

      <AwcProjectAccessInvitesSection projectId={projectId} access={access} />

      <AwcProjectInboxSection projectId={projectId} enabled canCompose />

      <AwcProjectAccessFoldersSection
        projectId={projectId}
        folderRefs={access.folderRefs}
        computerMembers={computerMembers}
        onMessage={access.setMessage}
        onReload={access.reload}
      />
    </div>
  );
}
