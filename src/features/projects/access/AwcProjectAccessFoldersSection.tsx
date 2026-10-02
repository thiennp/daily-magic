"use client";

import AwcProjectAccessFolderRefs from "@/features/projects/access/AwcProjectAccessFolderRefs";
import AwcProjectAccessSection from "@/features/projects/access/AwcProjectAccessSection";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import type { AwcProjectAccessFolderRef } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import {
  addProjectFolderRef,
  removeProjectFolderRef,
} from "@/features/projects/access/utils/mutateProjectFolderRefs";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

interface AwcProjectAccessFoldersSectionProps {
  readonly projectId: string;
  readonly folderRefs: readonly AwcProjectAccessFolderRef[];
  readonly onMessage: (message: string) => void;
  readonly onReload: () => Promise<void>;
}

export default function AwcProjectAccessFoldersSection({
  projectId,
  folderRefs,
  onMessage,
  onReload,
}: AwcProjectAccessFoldersSectionProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  return (
    <AwcProjectAccessSection
      id="project-access-folders"
      title={copy.folderRefsHeading}
      hint={copy.folderRefsHint}
      count={folderRefs.length}
    >
      <AwcProjectAccessFolderRefs
        folderRefs={folderRefs}
        hideChrome
        onAdd={async (machineOrDeviceRef, folderPath) => {
          const result = await addProjectFolderRef({
            projectId,
            machineOrDeviceRef,
            folderPath,
          });
          onMessage(
            result.ok
              ? "Folder ref added."
              : mapProjectAccessError(result.errorMessage, "Failed."),
          );
          if (result.ok) await onReload();
          return result.ok;
        }}
        onRemove={(refId) => {
          void removeProjectFolderRef({ projectId, refId }).then(
            async (result) => {
              onMessage(
                result.ok
                  ? "Folder ref removed."
                  : mapProjectAccessError(result.errorMessage, "Failed."),
              );
              await onReload();
            },
          );
        }}
      />
    </AwcProjectAccessSection>
  );
}
