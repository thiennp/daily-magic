"use client";

import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import AwcProjectSettingsDangerZone from "@/features/projects/settings/AwcProjectSettingsDangerZone";
import AwcProjectSettingsFolderRow from "@/features/projects/settings/AwcProjectSettingsFolderRow";
import AwcProjectSettingsMemberFolderRow from "@/features/projects/settings/AwcProjectSettingsMemberFolderRow";
import AwcProjectSettingsHistoryRow from "@/features/projects/settings/AwcProjectSettingsHistoryRow";
import AwcProjectSettingsTasksChatRow from "@/features/projects/settings/AwcProjectSettingsTasksChatRow";
import AwcProjectSettingsLeaveZone from "@/features/projects/settings/AwcProjectSettingsLeaveZone";
import AwcProjectSettingsNameSection from "@/features/projects/settings/AwcProjectSettingsNameSection";
import AwcProjectConnectionsSection from "@/features/projects/settings/connections/AwcProjectConnectionsSection";
import AwcProjectSettingsPendingRunApprovalsSection from "@/features/projects/settings/runApprovals/AwcProjectSettingsPendingRunApprovalsSection";
import AwcProjectSettingsRunsWithoutApprovalRow from "@/features/projects/settings/runsWithoutApproval/AwcProjectSettingsRunsWithoutApprovalRow";

interface AwcProjectDetailSettingsPanelProps {
  readonly project: UserProjectRecord;
  readonly startRename: boolean;
  readonly pageActorRole: ProjectPageActorRole;
}

/** Layout v2 L5 Settings — name · path · connections · history · danger. */
export default function AwcProjectDetailSettingsPanel({
  project,
  startRename,
  pageActorRole,
}: AwcProjectDetailSettingsPanelProps) {
  const isOwner = pageActorRole === "owner";
  const canDelete = isOwner;
  const canLeave = !isOwner;

  return (
    <div
      id="p-set"
      className="flex min-w-0 flex-col gap-4"
      data-layout-v2="l5-settings"
    >
      <AwcProjectSettingsNameSection
        projectId={project.id}
        initialName={project.name}
        startInEditMode={startRename}
        canEdit={isOwner}
      />
      {isOwner ? (
        <AwcProjectSettingsFolderRow project={project} isOwner />
      ) : (
        <AwcProjectSettingsMemberFolderRow
          project={project}
          isActiveMember={pageActorRole === "member"}
        />
      )}
      <AwcProjectConnectionsSection
        projectId={project.id}
        projectName={project.name}
        isOwner={isOwner}
      />
      {isOwner ? <AwcProjectSettingsHistoryRow projectId={project.id} /> : null}
      <AwcProjectSettingsTasksChatRow projectId={project.id} />
      <AwcProjectSettingsRunsWithoutApprovalRow
        projectId={project.id}
        canEdit={isOwner}
      />
      {isOwner ? (
        <AwcProjectSettingsPendingRunApprovalsSection projectId={project.id} />
      ) : null}
      {canDelete ? (
        <AwcProjectSettingsDangerZone
          projectId={project.id}
          projectName={project.name}
        />
      ) : null}
      {canLeave ? <AwcProjectSettingsLeaveZone projectId={project.id} /> : null}
    </div>
  );
}
