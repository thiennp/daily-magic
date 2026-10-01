"use client";

import { useState } from "react";

import AwcProjectAccessFolderRefs from "@/features/projects/access/AwcProjectAccessFolderRefs";
import AwcProjectAccessMembersList from "@/features/projects/access/AwcProjectAccessMembersList";
import AwcProjectAccessPendingList from "@/features/projects/access/AwcProjectAccessPendingList";
import AwcProjectActivityFeed from "@/features/projects/access/AwcProjectActivityFeed";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import {
  addProjectFolderRef,
  removeProjectFolderRef,
} from "@/features/projects/access/utils/mutateProjectFolderRefs";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface AwcProjectAccessPanelProps {
  readonly projectId: string;
}

export default function AwcProjectAccessPanel({
  projectId,
}: AwcProjectAccessPanelProps) {
  const access = useAwcProjectAccess(projectId);
  const [activityRefreshSignal, setActivityRefreshSignal] = useState(0);
  const bumpActivityFeed = () => {
    setActivityRefreshSignal((value) => value + 1);
  };
  const copy = AWC_PROJECT_ACCESS_COPY;

  const onAddFolder = async (
    machineOrDeviceRef: string,
    folderPath: string,
  ): Promise<boolean> => {
    const result = await addProjectFolderRef({
      projectId,
      machineOrDeviceRef,
      folderPath,
    });
    access.setMessage(
      result.ok ? "Folder ref added." : (result.errorMessage ?? "Failed."),
    );
    if (result.ok) {
      await access.reload();
    }
    return result.ok;
  };

  const onRemoveFolder = async (refId: string) => {
    const result = await removeProjectFolderRef({ projectId, refId });
    access.setMessage(
      result.ok ? "Folder ref removed." : (result.errorMessage ?? "Failed."),
    );
    await access.reload();
  };

  return (
    <section className="mt-8 space-y-4 rounded-xl border border-gray-200/80 p-4 dark:border-gray-800/80">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white">
        {copy.title}
      </h2>
      <p className={`text-sm ${APP_SURFACE_BODY_TEXT_CLASS}`}>{copy.intro}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {copy.revokeHint}
      </p>
      <p className="rounded-md border border-gray-200/80 bg-gray-50/80 px-3 py-2 text-xs text-gray-700 dark:border-gray-800/80 dark:bg-gray-950/40 dark:text-gray-300">
        {copy.firstConnectNote}
      </p>
      <AwcProjectAccessPendingList
        pending={access.pending}
        onApprove={(id) => {
          void access.approve(id).then(bumpActivityFeed);
        }}
        onDeny={(id) => {
          void access.deny(id).then(bumpActivityFeed);
        }}
      />
      <AwcProjectAccessMembersList
        members={access.members}
        onRevoke={(id) => {
          void access.revoke(id).then(bumpActivityFeed);
        }}
      />
      <AwcProjectAccessFolderRefs
        folderRefs={access.folderRefs}
        onAdd={(machine, folder) => onAddFolder(machine, folder)}
        onRemove={(id) => void onRemoveFolder(id)}
      />
      <AwcProjectActivityFeed
        projectId={projectId}
        refreshSignal={activityRefreshSignal}
      />
      {access.message ? (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {access.message}
        </p>
      ) : null}
      {access.isLoading ? (
        <p className="text-xs text-gray-400">Loading access…</p>
      ) : null}
    </section>
  );
}
