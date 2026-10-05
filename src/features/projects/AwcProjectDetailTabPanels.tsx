"use client";

import AwcProjectDeleteControl from "@/features/projects/AwcProjectDeleteControl";
import AwcProjectNameEditor from "@/features/projects/AwcProjectNameEditor";
import { PROJECT_PAGE_SHELL_COPY } from "@/features/projects/projectPageShellCopy.constant";
import {
  PROJECT_PAGE_TAB_IDS,
  PROJECT_PAGE_TAB_LABELS,
  type ProjectPageTabId,
} from "@/features/projects/projectPageTabs.constant";
import type { ProjectPageActorRole } from "@/lib/projects/acl/humanInvites/authorizeProjectPageActor";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface AwcProjectDetailTabPanelsProps {
  readonly activeTab: ProjectPageTabId;
  readonly project: UserProjectRecord;
  readonly startRename: boolean;
  readonly pageActorRole: ProjectPageActorRole;
}

const STUB_TABS: readonly ProjectPageTabId[] = [
  "overview",
  "activity",
  "team",
  "pitfalls",
  "resources",
];

export default function AwcProjectDetailTabPanels({
  activeTab,
  project,
  startRename,
  pageActorRole,
}: AwcProjectDetailTabPanelsProps) {
  const copy = PROJECT_PAGE_SHELL_COPY;
  const isOwner = pageActorRole === "owner";

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
            {tabId === "settings" ? (
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
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      {project.name}
                    </p>
                  )}
                </section>
                {isOwner ? (
                  <AwcProjectDeleteControl project={project} variant="detail" />
                ) : null}
              </div>
            ) : STUB_TABS.includes(tabId) ? (
              <div className="rounded-xl border border-dashed border-gray-200 p-4 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                <p className="font-medium text-gray-700 dark:text-gray-200">
                  {PROJECT_PAGE_TAB_LABELS[tabId]}
                </p>
                <p className="mt-1">
                  {tabId === "overview"
                    ? copy.overviewStubHint
                    : copy.tabStubBody}
                </p>
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
}
