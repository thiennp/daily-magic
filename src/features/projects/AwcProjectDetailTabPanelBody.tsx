"use client";

import AwcProjectDetailSettingsPanel from "@/features/projects/AwcProjectDetailSettingsPanel";
import AwcProjectMessengerSection from "@/features/projects/messenger/AwcProjectMessengerSection";
import AwcProjectTabStub from "@/features/projects/AwcProjectTabStub";
import AwcProjectPitfallsPanel from "@/features/projects/pitfalls/AwcProjectPitfallsPanel";
import type { AwcProjectPitfallsState } from "@/features/projects/pitfalls/useAwcProjectPitfalls";
import AwcProjectResourcesPanel from "@/features/projects/resources/AwcProjectResourcesPanel";
import {
  PROJECT_PAGE_TAB_LABELS,
  type ProjectPageTabId,
} from "@/features/projects/projectPageTabs.constant";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

/** Not landed yet: dashed placeholder (Team moved to the Members rail). */
const STUB_TABS: readonly ProjectPageTabId[] = ["reports", "library"];

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

/** One tab's panel contents (L4 Safety rules + Resources live; Reports/Library stubs). */
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
  if (STUB_TABS.includes(tabId)) {
    return <AwcProjectTabStub label={PROJECT_PAGE_TAB_LABELS[tabId]} />;
  }
  return null;
}
