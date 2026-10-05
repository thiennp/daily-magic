"use client";

import AwcProjectDeleteControl from "@/features/projects/AwcProjectDeleteControl";
import AwcProjectNameEditor from "@/features/projects/AwcProjectNameEditor";
import { PROJECT_PAGE_SHELL_COPY } from "@/features/projects/projectPageShellCopy.constant";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface AwcProjectDetailSettingsPanelProps {
  readonly project: UserProjectRecord;
  readonly startRename: boolean;
  readonly pageActorRole: ProjectPageActorRole;
}

export default function AwcProjectDetailSettingsPanel({
  project,
  startRename,
  pageActorRole,
}: AwcProjectDetailSettingsPanelProps) {
  const copy = PROJECT_PAGE_SHELL_COPY;
  const isOwner = pageActorRole === "owner";
  return (
    <div className="flex max-w-[760px] flex-col gap-6">
      <section className="space-y-3 rounded-xl border border-gray-200/80 bg-white p-5 dark:border-gray-800/80 dark:bg-gray-900/40">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Project name
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {copy.settingsNameHint}
        </p>
        {isOwner ? (
          <AwcProjectNameEditor
            projectId={project.id}
            initialName={project.name}
            startInEditMode={startRename}
          />
        ) : (
          <p className="text-sm text-gray-700 dark:text-gray-200">{project.name}</p>
        )}
      </section>
      {isOwner ? (
        <AwcProjectDeleteControl project={project} variant="detail" />
      ) : null}
    </div>
  );
}
