"use client";

import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

import AwcProjectRepoUrlsDisplay from "@/features/projects/repoUrls/AwcProjectRepoUrlsDisplay";
import AwcProjectRepoUrlsEditor from "@/features/projects/repoUrls/AwcProjectRepoUrlsEditor";
import {
  canEditProjectRepoUrls,
  canViewProjectRepoUrls,
} from "@/features/projects/repoUrls/canViewProjectRepoUrls";
import {
  buildProjectRepoMetadataKey,
  readProjectRepoMetadata,
} from "@/features/projects/repoUrls/readProjectRepoMetadata";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import type { ProjectRepoMetadata } from "@/lib/projects/validateProjectRepoUrls";
import { PROJECT_PANEL_CARD_CLASS as CARD } from "@/features/projects/projectPanelCardClasses.constant";

interface AwcProjectRepoUrlsSectionProps {
  readonly project: UserProjectRecord;
  /**
   * When true, viewer is an approved active member (non-owner).
   * Matches get_project_acl relation: "member".
   */
  readonly isActiveMember?: boolean;
  /** Already inside a card (Settings): a divider instead of its own card. */
  readonly flat?: boolean;
}

/**
 * Detail-panel bind for locked repo URL contract (eng API DTOs).
 * - Hide entirely for non-members
 * - Owner: edit form (v1 write)
 * - Active member (non-owner): read-only display
 */
export default function AwcProjectRepoUrlsSection({
  project,
  isActiveMember = false,
  flat = false,
}: AwcProjectRepoUrlsSectionProps) {
  const { data: session } = useSession();
  const sessionUserId =
    session?.user && "id" in session.user && typeof session.user.id === "string"
      ? session.user.id
      : null;
  const isOwner =
    sessionUserId !== null && sessionUserId === project.ownerUserId;

  const canView = canViewProjectRepoUrls({
    isOwner,
    isActiveMember,
  });
  const canEdit = canEditProjectRepoUrls({ isOwner });

  const [metadata, setMetadata] = useState<ProjectRepoMetadata>(() =>
    readProjectRepoMetadata(project),
  );
  const serverMetadataKey = buildProjectRepoMetadataKey(project);
  const [lastServerMetadataKey, setLastServerMetadataKey] =
    useState(serverMetadataKey);
  if (lastServerMetadataKey !== serverMetadataKey) {
    setLastServerMetadataKey(serverMetadataKey);
    setMetadata(readProjectRepoMetadata(project));
  }

  const show = useMemo(() => canView, [canView]);

  if (!show) {
    return null;
  }

  return (
    <section
      className={
        flat
          ? "mt-2 space-y-3 border-t border-awc-border pt-4 dark:border-gray-800/80"
          : `mt-6 space-y-3 ${CARD}`
      }
    >
      {canEdit ? (
        <AwcProjectRepoUrlsEditor
          key={project.id}
          projectId={project.id}
          initial={metadata}
          onSaved={setMetadata}
        />
      ) : (
        <AwcProjectRepoUrlsDisplay metadata={metadata} readOnlyNote />
      )}
    </section>
  );
}
