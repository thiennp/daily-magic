"use client";

import AwcProjectDetailSettingsPanel from "@/features/projects/AwcProjectDetailSettingsPanel";
import AwcProjectMessengerSection from "@/features/projects/messenger/AwcProjectMessengerSection";
import AwcProjectTabStub from "@/features/projects/AwcProjectTabStub";
import AwcProjectPitfallsPanel from "@/features/projects/pitfalls/AwcProjectPitfallsPanel";
import type { AwcProjectPitfallsState } from "@/features/projects/pitfalls/useAwcProjectPitfalls";
import AwcProjectResourcesPanel from "@/features/projects/resources/AwcProjectResourcesPanel";
import {
  PROJECT_PAGE_TAB_IDS,
  PROJECT_PAGE_TAB_LABELS,
  type ProjectPageNavTarget,
  type ProjectPageTabId,
} from "@/features/projects/projectPageTabs.constant";
import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface AwcProjectDetailTabPanelsProps {
  readonly activeTab: ProjectPageTabId;
  readonly project: UserProjectRecord;
  readonly startRename: boolean;
  readonly pageActorRole: ProjectPageActorRole;
  readonly deviceDisplayName: string;
  readonly editCta: ProjectEditOnMacCta;
  readonly pitfalls: AwcProjectPitfallsState;
  readonly onGotoTab: (tab: ProjectPageNavTarget) => void;
  readonly onGotoActivity: (threadKey: string | null) => void;
  readonly activityInitialThreadKey?: string | null;
  /** Bumped by the ask box after a send: remount Activity on the sent thread. */
  readonly activityRefreshKey?: number;
  readonly onActivityUnreadMaybeChanged?: () => void;
}

/** Not landed yet: dashed placeholder (Team moved to the Members rail). */
const STUB_TABS: readonly ProjectPageTabId[] = ["reports", "library"];

export default function AwcProjectDetailTabPanels({
  activeTab,
  project,
  startRename,
  pageActorRole,
  deviceDisplayName,
  editCta,
  pitfalls,
  activityInitialThreadKey = null,
  activityRefreshKey = 0,
  onActivityUnreadMaybeChanged,
}: AwcProjectDetailTabPanelsProps) {
  return (
    <>
      {PROJECT_PAGE_TAB_IDS.map((tabId) => {
        const selected = tabId === activeTab;
        return (
          <div
            key={tabId}
            role="tabpanel"
            id={`project-tabpanel-${tabId}`}
            aria-labelledby={`project-tab-${tabId}`}
            hidden={!selected}
            className={selected ? "min-w-0 pt-5" : undefined}
          >
            {tabId === "pitfalls" ? (
              <AwcProjectPitfallsPanel
                projectId={project.id}
                pitfalls={pitfalls}
                deviceDisplayName={deviceDisplayName}
                editCta={editCta}
              />
            ) : null}
            {tabId === "activity" && selected ? (
              <AwcProjectMessengerSection
                key={activityRefreshKey}
                projectId={project.id}
                initialThreadKey={activityInitialThreadKey}
                onUnreadMaybeChanged={onActivityUnreadMaybeChanged}
              />
            ) : null}
            {tabId === "resources" ? (
              <AwcProjectResourcesPanel
                project={project}
                pageActorRole={pageActorRole}
              />
            ) : null}
            {tabId === "settings" ? (
              <AwcProjectDetailSettingsPanel
                project={project}
                startRename={startRename}
                pageActorRole={pageActorRole}
              />
            ) : null}
            {STUB_TABS.includes(tabId) ? (
              <AwcProjectTabStub label={PROJECT_PAGE_TAB_LABELS[tabId]} />
            ) : null}
          </div>
        );
      })}
    </>
  );
}
