"use client";

import AwcProjectDetailSettingsPanel from "@/features/projects/AwcProjectDetailSettingsPanel";
import AwcProjectMessengerSection from "@/features/projects/messenger/AwcProjectMessengerSection";
import AwcProjectOverviewPanel from "@/features/projects/overview/AwcProjectOverviewPanel";
import { PROJECT_PAGE_SHELL_COPY } from "@/features/projects/projectPageShellCopy.constant";
import {
  PROJECT_PAGE_TAB_IDS,
  PROJECT_PAGE_TAB_LABELS,
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
  readonly onGotoTab: (tab: ProjectPageTabId) => void;
  readonly onGotoActivity: (threadKey: string | null) => void;
  readonly activityInitialThreadKey?: string | null;
  readonly onActivityUnreadMaybeChanged?: () => void;
}

const STUB_TABS: readonly ProjectPageTabId[] = [
  "team",
  "pitfalls",
  "resources",
];

export default function AwcProjectDetailTabPanels({
  activeTab,
  project,
  startRename,
  pageActorRole,
  deviceDisplayName,
  editCta,
  onGotoTab,
  onGotoActivity,
  activityInitialThreadKey = null,
  onActivityUnreadMaybeChanged,
}: AwcProjectDetailTabPanelsProps) {
  const copy = PROJECT_PAGE_SHELL_COPY;

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
            {tabId === "overview" ? (
              <AwcProjectOverviewPanel
                project={project}
                deviceDisplayName={deviceDisplayName}
                editCta={editCta}
                onGotoTab={onGotoTab}
                onGotoActivity={onGotoActivity}
              />
            ) : null}
            {tabId === "activity" && selected ? (
              <AwcProjectMessengerSection
                projectId={project.id}
                initialThreadKey={activityInitialThreadKey}
                onUnreadMaybeChanged={onActivityUnreadMaybeChanged}
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
              <div className="rounded-xl border border-dashed border-gray-200 p-4 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                <p className="font-medium text-gray-700 dark:text-gray-200">
                  {PROJECT_PAGE_TAB_LABELS[tabId]}
                </p>
                <p className="mt-1">{copy.tabStubBody}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
}
