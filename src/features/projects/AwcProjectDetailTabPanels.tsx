"use client";

import AwcProjectDetailTabPanelBody from "@/features/projects/AwcProjectDetailTabPanelBody";
import type { AwcProjectPitfallsState } from "@/features/projects/pitfalls/useAwcProjectPitfalls";
import {
  PROJECT_PAGE_TAB_IDS,
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
            <AwcProjectDetailTabPanelBody
              tabId={tabId}
              selected={selected}
              project={project}
              startRename={startRename}
              pageActorRole={pageActorRole}
              deviceDisplayName={deviceDisplayName}
              editCta={editCta}
              pitfalls={pitfalls}
              activityInitialThreadKey={activityInitialThreadKey}
              activityRefreshKey={activityRefreshKey}
              onActivityUnreadMaybeChanged={onActivityUnreadMaybeChanged}
            />
          </div>
        );
      })}
    </>
  );
}
