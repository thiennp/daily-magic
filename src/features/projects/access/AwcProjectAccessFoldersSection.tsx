"use client";

import AwcProjectAccessFolderRefs from "@/features/projects/access/AwcProjectAccessFolderRefs";
import AwcProjectAccessSection from "@/features/projects/access/AwcProjectAccessSection";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import type {
  AwcProjectAccessFolderRef,
  AwcProjectAccessMember,
} from "@/features/projects/access/hooks/loadAwcProjectAccess";
import { useAwcProjectFolderRefActions } from "@/features/projects/access/hooks/useAwcProjectFolderRefActions";

interface AwcProjectAccessFoldersSectionProps {
  readonly projectId: string;
  readonly folderRefs: readonly AwcProjectAccessFolderRef[];
  readonly computerMembers: readonly AwcProjectAccessMember[];
  readonly onMessage: (message: string) => void;
  readonly onReload: () => Promise<void>;
}

export default function AwcProjectAccessFoldersSection({
  projectId,
  folderRefs,
  computerMembers,
  onMessage,
  onReload,
}: AwcProjectAccessFoldersSectionProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const { onAdd, onRemove, onToggleShared } = useAwcProjectFolderRefActions({
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
        computerMembers={computerMembers}
        hideChrome
        onAdd={onAdd}
        onRemove={onRemove}
        onToggleShared={onToggleShared}
      />
    </AwcProjectAccessSection>
  );
}
