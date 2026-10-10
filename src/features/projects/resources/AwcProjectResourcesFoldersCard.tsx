"use client";

import { useMemo } from "react";

import { AwcProjectAccessFolderRefs } from "@/features/projects/access/public-api/presentation";
import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/public-api/types";
import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import { useAwcProjectFolderRefActions } from "@/features/projects/access/hooks/useAwcProjectFolderRefActions";
import { isComputerAccessMember } from "@/features/projects/access/utils/isComputerAccessMember";
import { PROJECT_PAGE_RESOURCES_COPY as C } from "@/features/projects/resources/projectPageResourcesCopy.constant";
import { resolveProjectAccessLoadError } from "@/lib/projects/acl/mapProjectAccessError";
import { PROJECT_PANEL_CARD_CLASS as CARD } from "@/features/projects/projectPanelCardClasses.constant";

interface AwcProjectResourcesFoldersCardProps {
  readonly projectId: string;
  readonly isOwner: boolean;
  /** Owner or member (not viewer): a member manages folders on their own computers. */
  readonly canManage: boolean;
  /** user_projects.device_id — picker fallback when no computer seat. */
  readonly projectDeviceId: string | null;
  readonly deviceDisplayName: string;
}

/** Folders on this computer — live folder-refs API (owner mutate). */
export default function AwcProjectResourcesFoldersCard({
  projectId,
  isOwner,
  canManage,
  projectDeviceId,
  deviceDisplayName,
}: AwcProjectResourcesFoldersCardProps) {
  const access = useAwcProjectAccess(projectId);
  const accessCopy = AWC_PROJECT_ACCESS_COPY;
  const { onAdd, onRemove, onToggleShared } = useAwcProjectFolderRefActions({
    projectId,
    onMessage: access.setMessage,
    onReload: access.reload,
  });
  const { devices, displayNameById } = useMyMacDevices();
  const ownerDevices = useMemo(
    () =>
      devices.map((device) => ({
        deviceId: device.id,
        deviceName: displayNameById.get(device.id) ?? device.deviceLabel ?? "",
        wakePort: device.isOnline ? device.wakePort : null,
      })),
    [devices, displayNameById],
  );
  const projectDevice = useMemo(() => {
    const id = projectDeviceId?.trim() ?? "";
    if (!id) return null;
    return { deviceId: id, deviceName: deviceDisplayName };
  }, [projectDeviceId, deviceDisplayName]);

  return (
    <section
      className={`flex min-w-0 flex-col gap-2 ${CARD}`}
      aria-labelledby="res-folders-h"
    >
      <h3
        id="res-folders-h"
        className="px-1 text-[13px] font-semibold uppercase tracking-wide text-awc-fg-muted dark:text-gray-400"
      >
        {C.foldersTitle}
      </h3>
      <div className="overflow-hidden">
        {access.isLoading ? (
          <p className="text-sm text-awc-fg-muted dark:text-gray-400">
            {C.foldersLoading}
          </p>
        ) : access.loadError ? (
          <p className="rounded-md border border-amber-200/80 bg-amber-50/80 px-3 py-2 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100">
            {resolveProjectAccessLoadError(
              access.loadError,
              accessCopy.forbidden,
            )}
          </p>
        ) : (
          <AwcProjectAccessFolderRefs
            folderRefs={access.folderRefs}
            computerMembers={
              isOwner ? access.members.filter(isComputerAccessMember) : []
            }
            projectDevice={isOwner ? projectDevice : null}
            ownerDevices={ownerDevices}
            hideChrome
            onAdd={onAdd}
            onRemove={onRemove}
            onToggleShared={canManage ? onToggleShared : undefined}
            readOnly={!canManage}
          />
        )}
        {canManage && access.message ? (
          <p
            className="mt-2 text-sm text-awc-fg-muted dark:text-gray-300"
            role="status"
          >
            {access.message}
          </p>
        ) : null}
      </div>
    </section>
  );
}
