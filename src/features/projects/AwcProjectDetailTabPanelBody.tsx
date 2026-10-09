"use client";

import AwcProjectDetailSettingsPanel from "@/features/projects/AwcProjectDetailSettingsPanel";
import AwcProjectKnowledgeImpactPanel from "@/features/projects/knowledge-impact/AwcProjectKnowledgeImpactPanel";
import AwcProjectLibraryPanel from "@/features/projects/library/AwcProjectLibraryPanel";
import AwcProjectTasksPanelWithRecords from "@/features/projects/tasks/AwcProjectTasksPanelWithRecords";
import AwcProjectOverviewPanel from "@/features/projects/overview/AwcProjectOverviewPanel";
import AwcProjectPitfallsPanel from "@/features/projects/pitfalls/AwcProjectPitfallsPanel";
import type { AwcProjectPitfallsState } from "@/features/projects/pitfalls/useAwcProjectPitfalls";
import AwcProjectReportsPanel from "@/features/projects/reports/AwcProjectReportsPanel";
import AwcProjectResourcesPanel from "@/features/projects/resources/AwcProjectResourcesPanel";
import type {
  ProjectPageNavTarget,
  ProjectPageTabId,
} from "@/features/projects/projectPageTabs.constant";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export type AwcProjectDetailTabPanelBodyProps = {
  readonly tabId: ProjectPageTabId;
  readonly selected: boolean;
  readonly project: UserProjectRecord;
  readonly startRename: boolean;
  readonly pageActorRole: ProjectPageActorRole;
  readonly deviceDisplayName: string;
  readonly editCta: ProjectEditOnMacCta;
  readonly pitfalls: AwcProjectPitfallsState;
  readonly computerStatus: string | null;
  readonly onGotoTab: (tab: ProjectPageNavTarget) => void;
  /** Opens the Chat dock full view (P1-S1: replaces the Activity tab). */
  readonly onGotoChat: (threadKey: string | null) => void;
};

export default function AwcProjectDetailTabPanelBody(
  p: AwcProjectDetailTabPanelBodyProps,
) {
  const { tabId: t, selected: sel, project } = p;
  if (t === "overview" && sel) {
    return (
      <AwcProjectOverviewPanel
        project={project}
        editCta={p.editCta}
        pitfalls={p.pitfalls}
        computerStatus={p.computerStatus}
        isOwner={p.pageActorRole === "owner"}
        canCreateTask={p.pageActorRole !== "viewer"}
        onGotoTab={p.onGotoTab}
        onGotoChat={p.onGotoChat}
      />
    );
  }
  if (t === "pitfalls") {
    return (
      <AwcProjectPitfallsPanel
        projectId={project.id}
        pitfalls={p.pitfalls}
        deviceDisplayName={p.deviceDisplayName}
        editCta={p.editCta}
      />
    );
  }
  if (t === "resources") {
    return (
      <AwcProjectResourcesPanel
        project={project}
        pageActorRole={p.pageActorRole}
        deviceDisplayName={p.deviceDisplayName}
        editCta={p.editCta}
      />
    );
  }
  if (t === "settings") {
    return (
      <AwcProjectDetailSettingsPanel
        project={project}
        startRename={p.startRename}
        pageActorRole={p.pageActorRole}
      />
    );
  }
  if (t === "reports" && sel) {
    return (
      <>
        <AwcProjectKnowledgeImpactPanel projectId={project.id} />
        <AwcProjectReportsPanel projectId={project.id} />
      </>
    );
  }
  if (t === "library" && sel) {
    return (
      <AwcProjectLibraryPanel
        project={project}
        canEdit={p.pageActorRole === "owner"}
      />
    );
  }
  if (t === "tasks" && sel) {
    return <AwcProjectTasksPanelWithRecords project={project} />;
  }
  return null;
}
