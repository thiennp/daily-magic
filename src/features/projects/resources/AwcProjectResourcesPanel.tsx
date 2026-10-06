"use client";

import { ProjectSkillsSection } from "@/features/project-skill-share/public-api/presentation";
import AwcProjectResourcesCompositionSection from "@/features/projects/resources/AwcProjectResourcesCompositionSection";
import AwcProjectResourcesFoldersCard from "@/features/projects/resources/AwcProjectResourcesFoldersCard";
import AwcProjectRepoUrlsSection from "@/features/projects/repoUrls/AwcProjectRepoUrlsSection";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface AwcProjectResourcesPanelProps {
  readonly project: UserProjectRecord;
  readonly pageActorRole: ProjectPageActorRole;
  readonly deviceDisplayName: string;
  readonly editCta: ProjectEditOnMacCta;
}

/**
 * Resources tab — single column: PWA · Folders · Git remotes · Shared skills.
 * Keeps live folder-refs / repo-urls / skills / composition APIs.
 */
export default function AwcProjectResourcesPanel({
  project,
  pageActorRole,
  deviceDisplayName,
  editCta,
}: AwcProjectResourcesPanelProps) {
  const isActiveMember = pageActorRole === "member";

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <AwcProjectResourcesCompositionSection
        projectId={project.id}
        deviceDisplayName={deviceDisplayName}
        editCta={editCta}
      />
      <AwcProjectResourcesFoldersCard
        projectId={project.id}
        isOwner={pageActorRole === "owner"}
      />
      <div className="min-w-0 [&>section]:mt-0">
        <AwcProjectRepoUrlsSection
          project={project}
          isActiveMember={isActiveMember}
        />
      </div>
      <ProjectSkillsSection projectId={project.id} />
    </div>
  );
}
