"use client";

import { OVERVIEW_GRID2_CLASS } from "@/features/projects/overview/overviewChrome.constant";
import AwcProjectResourcesFoldersCard from "@/features/projects/resources/AwcProjectResourcesFoldersCard";
import AwcProjectRepoUrlsSection from "@/features/projects/repoUrls/AwcProjectRepoUrlsSection";
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
  const isActiveMember = pageActorRole === "member";

  return (
    <div className={OVERVIEW_GRID2_CLASS}>
      <div className="flex min-w-0 flex-col gap-4">
        <AwcProjectResourcesFoldersCard
          projectId={project.id}
          isOwner={pageActorRole === "owner"}
        />
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
