"use client";

import AwcProjectAccessFolderRefs from "@/features/projects/access/AwcProjectAccessFolderRefs";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { useAwcProjectAccess } from "@/features/projects/access/hooks/useAwcProjectAccess";
import {
  addProjectFolderRef,
  removeProjectFolderRef,
} from "@/features/projects/access/utils/mutateProjectFolderRefs";
import {
  OVERVIEW_CARD_CLASS,
  OVERVIEW_GRID2_CLASS,
} from "@/features/projects/overview/overviewChrome.constant";
import { PROJECT_PAGE_RESOURCES_COPY as C } from "@/features/projects/resources/projectPageResourcesCopy.constant";
import AwcProjectRepoUrlsSection from "@/features/projects/repoUrls/AwcProjectRepoUrlsSection";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface AwcProjectResourcesPanelProps {
  readonly project: UserProjectRecord;
  readonly pageActorRole: ProjectPageActorRole;
}

/**
 * Resources tab: Folders on computers + Git remotes only.
 * Shared skills live under Library — do not mount them here.
 */
export default function AwcProjectResourcesPanel({
  project,
  pageActorRole,
}: AwcProjectResourcesPanelProps) {
  const isOwner = pageActorRole === "owner";
  const isActiveMember = pageActorRole === "member";
  const access = useAwcProjectAccess(project.id);
  const accessCopy = AWC_PROJECT_ACCESS_COPY;

  return (
    <div className={OVERVIEW_GRID2_CLASS}>
      <div className="flex min-w-0 flex-col gap-4">
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
              {/owner|forbidden/i.test(access.loadError)
                ? accessCopy.forbidden
                : access.loadError}
            </p>
          ) : (
            <AwcProjectAccessFolderRefs
              folderRefs={access.folderRefs}
              hideChrome
              onAdd={async (machineOrDeviceRef, folderPath) => {
                const result = await addProjectFolderRef({
                  projectId: project.id,
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
                void removeProjectFolderRef({
                  projectId: project.id,
                  refId,
                }).then(async (result) => {
                  access.setMessage(
                    result.ok
                      ? "Folder ref removed."
                      : mapProjectAccessError(result.errorMessage, "Failed."),
                  );
                  await access.reload();
                });
              }}
            />
          )}
          {isOwner && access.message ? (
            <p
              className="text-sm text-gray-600 dark:text-gray-300"
              role="status"
            >
              {access.message}
            </p>
          ) : null}
        </section>
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        {/* Reuse existing repo URLs section chrome (heading + editor/display). */}
        <div className="min-w-0 [&>section]:mt-0">
          <AwcProjectRepoUrlsSection
            project={project}
            isActiveMember={isActiveMember}
          />
        </div>
      </div>
    </div>
  );
}
