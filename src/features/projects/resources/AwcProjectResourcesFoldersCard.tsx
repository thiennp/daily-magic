"use client";

import AwcProjectAccessFolderRefs from "@/features/projects/access/AwcProjectAccessFolderRefs";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import { useAwcProjectFolderRefActions } from "@/features/projects/access/hooks/useAwcProjectFolderRefActions";
import { OVERVIEW_CARD_CLASS } from "@/features/projects/overview/overviewChrome.constant";
import { PROJECT_PAGE_RESOURCES_COPY as C } from "@/features/projects/resources/projectPageResourcesCopy.constant";
import { resolveProjectAccessLoadError } from "@/lib/projects/acl/mapProjectAccessError";

interface AwcProjectResourcesFoldersCardProps {
  readonly projectId: string;
  readonly isOwner: boolean;
}

/** Folders-on-computers card for the Resources tab (owner-only mutate). */
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
    <section
      className={OVERVIEW_CARD_CLASS}
      aria-labelledby="project-resources-folders-title"
    >
      <div className="min-w-0">
        <h2
          id="project-resources-folders-title"
          className="text-[17px] font-semibold tracking-tight text-gray-900 dark:text-white"
        >
          {C.foldersTitle}
        </h2>
        <p className="mt-1 text-[13px] text-gray-500 dark:text-gray-400">
          {C.foldersHint}
        </p>
      </div>
      {!isOwner ? (
        <p className="rounded-xl border border-dashed border-gray-200 p-4 text-[13px] text-gray-500 dark:border-gray-700 dark:text-gray-400">
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
          hideChrome
          onAdd={onAdd}
          onRemove={onRemove}
        />
      )}
      {isOwner && access.message ? (
        <p className="text-sm text-gray-600 dark:text-gray-300" role="status">
          {access.message}
        </p>
      ) : null}
    </section>
  );
}
