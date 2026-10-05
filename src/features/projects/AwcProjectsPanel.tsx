"use client";

import { useMemo, useState, type ReactNode } from "react";

import SendTaskComposerCreateProjectForm from "@/features/agent/SendTaskComposerCreateProjectForm";
import { useUserProjects } from "@/features/agent/hooks/useUserProjects";
import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import { pickDefaultMacDeviceId } from "@/features/agent-witch/online-wake";
import AwcProjectsListBody from "@/features/projects/AwcProjectsListBody";
import AwcProjectsToolbar from "@/features/projects/AwcProjectsToolbar";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import { filterAwcProjectsByQuery } from "@/features/projects/utils/filterAwcProjectsByQuery";
import AppPanel from "@/components/surfaces/AppPanel";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface AwcProjectsPanelProps {
  /** Optional content rendered at the top of the panel (e.g. a section title). */
  readonly header?: ReactNode;
  /** Optional pure selector applied to the (search-filtered) list, e.g. top N. */
  readonly selectProjects?: (
    projects: readonly UserProjectRecord[],
  ) => readonly UserProjectRecord[];
  /** When false, hide the search toolbar and the New project form. Default true. */
  readonly showManageControls?: boolean;
}

export default function AwcProjectsPanel({
  header,
  selectProjects,
  showManageControls = true,
}: AwcProjectsPanelProps = {}) {
  const { localTokenHash } = useLocalMacBrowserContext();
  const { devices, displayNameById } = useMyMacDevices();
  const defaultDeviceId = pickDefaultMacDeviceId(devices) ?? "";
  const {
    projects,
    compositionCountsByProjectId,
    isLoading,
    loadFailed,
    addProject,
    refreshProjects,
    removeProject,
  } = useUserProjects("");
  const [searchQuery, setSearchQuery] = useState("");
  const visibleProjects = useMemo(() => {
    const filtered = filterAwcProjectsByQuery(projects, searchQuery);

    return selectProjects ? selectProjects(filtered) : filtered;
  }, [projects, searchQuery, selectProjects]);

  return (
    <AppPanel padding="compact">
      {header}
      {showManageControls && !isLoading && projects.length > 0 ? (
        <AwcProjectsToolbar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          projectCount={projects.length}
          visibleCount={visibleProjects.length}
        />
      ) : null}
      <AwcProjectsListBody
        isLoading={isLoading}
        loadFailed={loadFailed}
        onRetryLoad={() => {
          void refreshProjects({ showLoading: true });
        }}
        searchQuery={searchQuery}
        projects={projects}
        visibleProjects={visibleProjects}
        compositionCountsByProjectId={compositionCountsByProjectId}
        devices={devices}
        displayNameById={displayNameById}
        localTokenHash={localTokenHash}
        onProjectDeleted={(projectId) => {
          removeProject(projectId);
          void refreshProjects();
        }}
      />
      {showManageControls && !isLoading ? (
        <div className="mt-6 border-t border-gray-200 pt-4 pb-2 max-md:mb-4 dark:border-gray-800">
          <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
            New project
          </h3>
          <SendTaskComposerCreateProjectForm
            deviceId={defaultDeviceId}
            onProjectCreated={(project) => {
              addProject(project);
              void refreshProjects();
            }}
            onSelect={() => {
              void refreshProjects();
            }}
          />
        </div>
      ) : null}
    </AppPanel>
  );
}
