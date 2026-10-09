"use client";

import AwcProjectMembersInfoTip from "@/features/projects/members/AwcProjectMembersInfoTip";
import AwcProjectRepoUrlsSection from "@/features/projects/repoUrls/AwcProjectRepoUrlsSection";
import AwcProjectOpenOnGitHub from "@/features/projects/settings/folder/AwcProjectOpenOnGitHub";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

/**
 * Folder and repository for a non-owner: the owner's path and computer are not
 * theirs, so they are not shown. Each person keeps their own folder on their
 * own computer (Resources); the shared repositories stay visible here.
 */
export default function AwcProjectSettingsMemberFolderRow({
  project,
  isActiveMember,
}: {
  readonly project: UserProjectRecord;
  readonly isActiveMember: boolean;
}) {
  return (
    <section
      className="flex min-w-0 flex-col gap-3"
      aria-labelledby="p-set-folder-h"
    >
      <h3
        id="p-set-folder-h"
        className="flex items-center gap-2 text-[13px] font-semibold text-awc-fg-muted"
      >
        Folder and repository
        <AwcProjectMembersInfoTip
          id="p-set-folder-tip"
          label="About your project folder"
        >
          Each person keeps their own folder on their own computer. Assistants
          on your computer run tasks inside it.
        </AwcProjectMembersInfoTip>
      </h3>
      <p className="px-1 text-[13px] text-awc-fg-muted">
        Your folder lives on your own computer.{" "}
        <a
          href="#resources"
          className="awc-focus-ring font-semibold text-awc-primary hover:underline"
        >
          Set it in Resources
        </a>
      </p>
      <AwcProjectOpenOnGitHub repoUrls={project.repoUrls} />
      <AwcProjectRepoUrlsSection
        project={project}
        isActiveMember={isActiveMember}
      />
    </section>
  );
}
