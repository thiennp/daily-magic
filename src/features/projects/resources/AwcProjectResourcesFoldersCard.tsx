"use client";

import AwcProjectAccessFolderRefs from "@/features/projects/access/AwcProjectAccessFolderRefs";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import { useAwcProjectFolderRefActions } from "@/features/projects/access/hooks/useAwcProjectFolderRefActions";
import { isComputerAccessMember } from "@/features/projects/access/utils/isComputerAccessMember";
import { PROJECT_PAGE_RESOURCES_COPY as C } from "@/features/projects/resources/projectPageResourcesCopy.constant";
import { resolveProjectAccessLoadError } from "@/lib/projects/acl/mapProjectAccessError";

interface AwcProjectResourcesFoldersCardProps {
  readonly projectId: string;
  readonly isOwner: boolean;
}

/** Folders on this computer — live folder-refs API (owner mutate). */
export default function AwcProjectResourcesFoldersCard({
  projectId,
  isOwner,
}: AwcProjectResourcesFoldersCardProps) {
  const access = useAwcProjectAccess(projectId);
  const accessCopy = AWC_PROJECT_ACCESS_COPY;
  const { onAdd, onRemove } = useAwcProjectFolderRefActions({
    projectId,
    onMessage: access.setMessage,
    onReload: access.reload,
  });

  return (
    <section className="flex min-w-0 flex-col gap-2" aria-labelledby="res-folders-h">
      <h3
        id="res-folders-h"
        className="px-1 text-[13px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
      >
        {C.foldersTitle}
      </h3>
      <div className="overflow-hidden rounded-2xl bg-gray-50/80 p-3 dark:bg-white/[0.03]">
        {!isOwner ? (
          <p className="px-1 py-2 text-[13px] text-gray-500 dark:text-gray-400">
            {C.foldersOwnerOnly}
          </p>
        ) : access.isLoading ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
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
            computerMembers={access.members.filter(isComputerAccessMember)}
            hideChrome
            onAdd={onAdd}
            onRemove={onRemove}
          />
        )}
        {isOwner && access.message ? (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300" role="status">
            {access.message}
          </p>
        ) : null}
      </div>
    </section>
  );
}
