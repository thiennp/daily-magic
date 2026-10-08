"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import AwcProjectPathDisplay from "@/features/projects/AwcProjectPathDisplay";
import AwcProjectMembersInfoTip from "@/features/projects/members/AwcProjectMembersInfoTip";
import AwcProjectRepoUrlsSection from "@/features/projects/repoUrls/AwcProjectRepoUrlsSection";
import AwcProjectFolderChangeDialog from "@/features/projects/settings/folder/AwcProjectFolderChangeDialog";
import AwcProjectFolderMissingWarning from "@/features/projects/settings/folder/AwcProjectFolderMissingWarning";
import AwcProjectFolderStatusChips from "@/features/projects/settings/folder/AwcProjectFolderStatusChips";
import AwcProjectOpenOnGitHub from "@/features/projects/settings/folder/AwcProjectOpenOnGitHub";
import { useProjectFolderCard } from "@/features/projects/settings/folder/useProjectFolderCard";
import { AWC_TASKS_SECONDARY_BUTTON_CLASS } from "@/features/projects/tasks/awcProjectTasksChrome.constant";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

/**
 * Folder and repository card: path, which computer holds it, a check of the
 * folder, and git remotes. Changing the folder goes through the computer's
 * bridge when this browser can reach it; otherwise AgentWitch Local does it.
 */
export default function AwcProjectSettingsFolderRow({
  project,
  isOwner,
}: {
  readonly project: UserProjectRecord;
  readonly isOwner: boolean;
}) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const card = useProjectFolderCard(project, isOwner);
  const { canChange, computerName, status } = card;
  const open = () => setDialogOpen(true);

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
          label="About the project folder"
        >
          The folder lives on the project&apos;s computer. Assistants run tasks
          inside it.
        </AwcProjectMembersInfoTip>
      </h3>
      {card.missing ? (
        <AwcProjectFolderMissingWarning
          hasFolder={card.hasFolder}
          computerName={computerName}
          onChange={canChange ? open : null}
        />
      ) : null}
      {card.hasFolder ? (
        <div className="min-w-0 max-w-full overflow-hidden px-1">
          <AwcProjectPathDisplay folderPath={project.folderPath} />
        </div>
      ) : null}
      <div className="flex flex-wrap items-center gap-2 text-[13px] text-awc-fg-muted">
        <span>
          on {computerName} · {card.computerState}
        </span>
        <AwcProjectFolderStatusChips result={status} />
        {canChange && !card.missing ? (
          <button
            type="button"
            className={AWC_TASKS_SECONDARY_BUTTON_CLASS}
            onClick={open}
          >
            Change folder
          </button>
        ) : null}
        {isOwner && !canChange && status !== "loading" ? (
          <span>Open AgentWitch Local on {computerName} to change it.</span>
        ) : null}
      </div>
      <AwcProjectOpenOnGitHub repoUrls={project.repoUrls} />
      <AwcProjectRepoUrlsSection project={project} />
      {dialogOpen && card.wakePort !== null ? (
        <AwcProjectFolderChangeDialog
          projectId={project.id}
          wakePort={card.wakePort}
          computerName={computerName}
          initialPath={project.folderPath}
          onClose={() => setDialogOpen(false)}
          onLinked={() => {
            setDialogOpen(false);
            router.refresh();
          }}
        />
      ) : null}
    </section>
  );
}
