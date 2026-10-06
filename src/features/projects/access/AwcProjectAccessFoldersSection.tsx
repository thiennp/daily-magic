"use client";

import AwcProjectAccessFolderRefs from "@/features/projects/access/AwcProjectAccessFolderRefs";
import AwcProjectAccessSection from "@/features/projects/access/AwcProjectAccessSection";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import type { AwcProjectAccessFolderRef } from "@/features/projects/access/hooks/loadAwcProjectAccess";
import { useAwcProjectFolderRefActions } from "@/features/projects/access/hooks/useAwcProjectFolderRefActions";

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
  const { onAdd, onRemove } = useAwcProjectFolderRefActions({
    projectId,
    onMessage,
    onReload,
  });
  return (
    <AwcProjectAccessSection
      id="project-access-folders"
      title={copy.folderRefsHeading}
      hint={copy.folderRefsHint}
      count={folderRefs.length > 0 ? folderRefs.length : undefined}
    >
      <AwcProjectAccessFolderRefs
        folderRefs={folderRefs}
        hideChrome
        onAdd={onAdd}
        onRemove={onRemove}
      />
    </AwcProjectAccessSection>
  );
}
