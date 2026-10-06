"use client";

import isDefaultUserProject from "@/lib/projects/isDefaultUserProject";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import AwcProjectSettingsDangerZone from "@/features/projects/settings/AwcProjectSettingsDangerZone";
import AwcProjectSettingsHistoryRow from "@/features/projects/settings/AwcProjectSettingsHistoryRow";
import AwcProjectSettingsNameSection from "@/features/projects/settings/AwcProjectSettingsNameSection";

interface AwcProjectDetailSettingsPanelProps {
  readonly project: UserProjectRecord;
  readonly startRename: boolean;
  readonly pageActorRole: ProjectPageActorRole;
}

/** Layout v2 L5 Settings (p-set): name · message history · danger zone. */
export default function AwcProjectDetailSettingsPanel({
  project,
  startRename,
  pageActorRole,
}: AwcProjectDetailSettingsPanelProps) {
  const isOwner = pageActorRole === "owner";
  const canDelete = isOwner && !isDefaultUserProject(project);

  return (
    <div
      id="p-set"
      className="flex max-w-[760px] flex-col gap-6"
      data-layout-v2="l5-settings"
    >
      <AwcProjectSettingsNameSection
        projectId={project.id}
        initialName={project.name}
        startInEditMode={startRename}
        canEdit={isOwner}
      />
      {isOwner ? (
        <AwcProjectSettingsHistoryRow projectId={project.id} />
      ) : null}
      {canDelete ? (
        <AwcProjectSettingsDangerZone
          projectId={project.id}
          projectName={project.name}
        />
      ) : null}
    </div>
  );
}
