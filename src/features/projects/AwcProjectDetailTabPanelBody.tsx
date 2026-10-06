"use client";

import AwcProjectDetailSettingsPanel from "@/features/projects/AwcProjectDetailSettingsPanel";
import AwcProjectMessengerSection from "@/features/projects/messenger/AwcProjectMessengerSection";
import AwcProjectLibraryPanel from "@/features/projects/library/AwcProjectLibraryPanel";
import AwcProjectPitfallsPanel from "@/features/projects/pitfalls/AwcProjectPitfallsPanel";
import type { AwcProjectPitfallsState } from "@/features/projects/pitfalls/useAwcProjectPitfalls";
import AwcProjectReportsPanel from "@/features/projects/reports/AwcProjectReportsPanel";
import AwcProjectResourcesPanel from "@/features/projects/resources/AwcProjectResourcesPanel";
import type { ProjectPageTabId } from "@/features/projects/projectPageTabs.constant";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface AwcProjectDetailTabPanelBodyProps {
  readonly tabId: ProjectPageTabId;
  readonly selected: boolean;
  readonly project: UserProjectRecord;
  readonly startRename: boolean;
  readonly pageActorRole: ProjectPageActorRole;
  readonly deviceDisplayName: string;
  readonly editCta: ProjectEditOnMacCta;
  readonly pitfalls: AwcProjectPitfallsState;
  readonly activityInitialThreadKey: string | null;
  readonly activityRefreshKey: number;
  readonly onActivityUnreadMaybeChanged?: () => void;
}

/**
 * One tab's panel contents. L6: Reports + Library are full panels (stubs
 * gone); they mount only while selected, like Activity.
 */
export default function AwcProjectDetailTabPanelBody({
  tabId,
  selected,
  project,
  startRename,
  pageActorRole,
  deviceDisplayName,
  editCta,
  pitfalls,
  activityInitialThreadKey,
  activityRefreshKey,
  onActivityUnreadMaybeChanged,
}: AwcProjectDetailTabPanelBodyProps) {
  if (tabId === "pitfalls") {
    return (
      <AwcProjectPitfallsPanel
        projectId={project.id}
        pitfalls={pitfalls}
        deviceDisplayName={deviceDisplayName}
        editCta={editCta}
      />
    );
  }
  if (tabId === "activity" && selected) {
    return (
      <AwcProjectMessengerSection
        key={activityRefreshKey}
        projectId={project.id}
        initialThreadKey={activityInitialThreadKey}
        onUnreadMaybeChanged={onActivityUnreadMaybeChanged}
      />
    );
  }
  if (tabId === "resources") {
    return (
      <AwcProjectResourcesPanel
        project={project}
        pageActorRole={pageActorRole}
        deviceDisplayName={deviceDisplayName}
        editCta={editCta}
      />
    );
  }
  if (tabId === "settings") {
    return (
      <AwcProjectDetailSettingsPanel
        project={project}
        startRename={startRename}
        pageActorRole={pageActorRole}
      />
    );
  }
  if (tabId === "reports" && selected) {
    return <AwcProjectReportsPanel projectId={project.id} />;
  }
  if (tabId === "library" && selected) {
    return (
      <AwcProjectLibraryPanel
        project={project}
        canEdit={pageActorRole === "owner"}
      />
    );
  }
  return null;
}
