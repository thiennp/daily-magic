"use client";

import AwcProjectDetailSettingsPanel from "@/features/projects/AwcProjectDetailSettingsPanel";
import AwcProjectMessengerSection from "@/features/projects/messenger/AwcProjectMessengerSection";
import AwcProjectLibraryPanel from "@/features/projects/library/AwcProjectLibraryPanel";
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
  readonly activityInitialThreadKey: string | null;
  readonly activityRefreshKey: number;
  readonly onActivityUnreadMaybeChanged?: () => void;
  readonly onGotoTab: (tab: ProjectPageNavTarget) => void;
  readonly onGotoActivity: (threadKey: string | null) => void;
};

export default function AwcProjectDetailTabPanelBody(
  p: AwcProjectDetailTabPanelBodyProps,
) {
  const { tabId: t, selected: sel, project: proj } = p;
  if (t === "overview" && sel) {
    return (
      <AwcProjectOverviewPanel
        project={proj}
        editCta={p.editCta}
        pitfalls={p.pitfalls}
        computerStatus={p.computerStatus}
        onGotoTab={p.onGotoTab}
        onGotoActivity={p.onGotoActivity}
      />
    );
  }
  if (t === "pitfalls") {
    return (
      <AwcProjectPitfallsPanel
        projectId={proj.id}
        pitfalls={p.pitfalls}
        deviceDisplayName={p.deviceDisplayName}
        editCta={p.editCta}
      />
    );
  }
  if (t === "activity" && sel) {
    return (
      <AwcProjectMessengerSection
        key={p.activityRefreshKey}
        projectId={proj.id}
        initialThreadKey={p.activityInitialThreadKey}
        onUnreadMaybeChanged={p.onActivityUnreadMaybeChanged}
      />
    );
  }
  if (t === "resources") {
    return (
      <AwcProjectResourcesPanel
        project={proj}
        pageActorRole={p.pageActorRole}
        deviceDisplayName={p.deviceDisplayName}
        editCta={p.editCta}
      />
    );
  }
  if (t === "settings") {
    return (
      <AwcProjectDetailSettingsPanel
        project={proj}
        startRename={p.startRename}
        pageActorRole={p.pageActorRole}
      />
    );
  }
  if (t === "reports" && sel) {
    return <AwcProjectReportsPanel projectId={proj.id} />;
  }
  if (t === "library" && sel) {
    return (
      <AwcProjectLibraryPanel
        project={proj}
        canEdit={p.pageActorRole === "owner"}
      />
    );
  }
  return null;
}
