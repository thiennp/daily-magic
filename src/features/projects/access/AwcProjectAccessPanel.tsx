"use client";

import { useState } from "react";
import { twMerge } from "tailwind-merge";

import AwcProjectAccessFolderRefs from "@/features/projects/access/AwcProjectAccessFolderRefs";
import AwcProjectAccessMembersList from "@/features/projects/access/AwcProjectAccessMembersList";
import AwcProjectAccessPendingList from "@/features/projects/access/AwcProjectAccessPendingList";
import AwcProjectActivityFeed from "@/features/projects/access/AwcProjectActivityFeed";
import AwcProjectInvitesPanel from "@/features/projects/access/invites/AwcProjectInvitesPanel";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import {
  addProjectFolderRef,
  removeProjectFolderRef,
} from "@/features/projects/access/utils/mutateProjectFolderRefs";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface AwcProjectAccessPanelProps {
  readonly projectId: string;
  readonly className?: string;
}

export default function AwcProjectAccessPanel({
  projectId,
  className = "",
}: AwcProjectAccessPanelProps) {
  const access = useAwcProjectAccess(projectId);
  const [activityRefreshSignal, setActivityRefreshSignal] = useState(0);
  const bump = () => setActivityRefreshSignal((v) => v + 1);
  const copy = AWC_PROJECT_ACCESS_COPY;

  return (
    <section
      className={twMerge(
        "mt-8 space-y-4 rounded-xl border border-gray-200/80 p-4 dark:border-gray-800/80",
        className,
      )}
    >
      <h2 className="text-base font-semibold text-gray-900 dark:text-white">
        {copy.title}
      </h2>
      <p className={`text-sm ${APP_SURFACE_BODY_TEXT_CLASS}`}>{copy.intro}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{copy.revokeHint}</p>
      <p className="rounded-md border border-gray-200/80 bg-gray-50/80 px-3 py-2 text-xs text-gray-700 dark:border-gray-800/80 dark:bg-gray-950/40 dark:text-gray-300">
        {copy.firstConnectNote}
      </p>
      {access.loadError ? (
        <p className="text-sm text-red-600 dark:text-red-400">{access.loadError}</p>
      ) : null}
      <AwcProjectInvitesPanel
        invites={access.invites}
        createdInviteUrl={access.createdInviteUrl}
        projectId={projectId}
        projectName={access.projectName}
        onCreate={() => void access.createInvite().then(bump)}
        onRevoke={(id) => void access.revokeInvite(id).then(bump)}
        onClearCreatedUrl={() => access.setCreatedInviteUrl(null)}
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
            result.ok ? "Folder ref added." : (result.errorMessage ?? "Failed."),
          );
          if (result.ok) await access.reload();
          return result.ok;
        }}
        onRemove={(refId) => {
          void removeProjectFolderRef({ projectId, refId }).then(async (result) => {
            access.setMessage(
              result.ok
                ? "Folder ref removed."
                : (result.errorMessage ?? "Failed."),
            );
            await access.reload();
          });
        }}
      />
      {access.message ? (
        <p className="text-sm text-gray-600 dark:text-gray-300">{access.message}</p>
      ) : null}
      <AwcProjectActivityFeed
        projectId={projectId}
        refreshSignal={activityRefreshSignal}
      />
    </section>
  );
}
