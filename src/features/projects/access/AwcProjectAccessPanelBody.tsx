"use client";

import AwcProjectAccessFolderRefs from "@/features/projects/access/AwcProjectAccessFolderRefs";
import AwcProjectAccessMembersList from "@/features/projects/access/AwcProjectAccessMembersList";
import AwcProjectAccessPendingList from "@/features/projects/access/AwcProjectAccessPendingList";
import AwcProjectInvitesPanel from "@/features/projects/access/invites/AwcProjectInvitesPanel";
import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import {
  addProjectFolderRef,
  removeProjectFolderRef,
} from "@/features/projects/access/utils/mutateProjectFolderRefs";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

type Access = ReturnType<typeof useAwcProjectAccess>;

interface AwcProjectAccessPanelBodyProps {
  readonly projectId: string;
  readonly access: Access;
  readonly bump: () => void;
  readonly clearCreatedInvite: () => void;
}

export default function AwcProjectAccessPanelBody({
  projectId,
  access,
  bump,
  clearCreatedInvite,
}: AwcProjectAccessPanelBodyProps) {
  return (
    <>
      <AwcProjectInvitesPanel
        invites={access.invites}
        createdInviteUrl={access.createdInviteUrl}
        createdInviteToken={access.createdInviteToken}
        projectId={projectId}
        projectName={access.projectName}
        onCreate={() => void access.createInvite().then(bump)}
        onRevoke={(id) => void access.revokeInvite(id).then(bump)}
        onClearCreatedUrl={clearCreatedInvite}
      />
      <AwcProjectAccessPendingList
        projectId={projectId}
        pending={access.pending}
        onApprove={async (id, name) => {
          const result = await access.approve(id, name);
          bump();
          return result;
        }}
        onDeny={(id) => void access.deny(id).then(bump)}
      />
      <AwcProjectAccessMembersList
        members={access.members}
        onRevoke={(id) => void access.revoke(id).then(bump)}
        onRename={async (membershipId, projectDisplayName) => {
          const result = await access.renameMember(
            membershipId,
            projectDisplayName,
          );
          bump();
          return result;
        }}
      />
      <AwcProjectAccessFolderRefs
        folderRefs={access.folderRefs}
        onAdd={async (machineOrDeviceRef, folderPath) => {
          const result = await addProjectFolderRef({
            projectId,
            machineOrDeviceRef,
            folderPath,
          });
          access.setMessage(
            result.ok
              ? "Folder ref added."
              : mapProjectAccessError(result.errorMessage, "Failed."),
          );
          if (result.ok) await access.reload();
          return result.ok;
        }}
        onRemove={(refId) => {
          void removeProjectFolderRef({ projectId, refId }).then(
            async (result) => {
              access.setMessage(
                result.ok
                  ? "Folder ref removed."
                  : mapProjectAccessError(result.errorMessage, "Failed."),
              );
              await access.reload();
            },
          );
        }}
      />
    </>
  );
}
