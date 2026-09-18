"use client";

import { useMemo, useState } from "react";

import SendTaskComposerCreateProjectForm from "@/features/agent/SendTaskComposerCreateProjectForm";
import { useUserProjects } from "@/features/agent/hooks/useUserProjects";
import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import { pickDefaultMacDeviceId } from "@/features/agent-witch/online-wake";
import AwcProjectsListBody from "@/features/projects/AwcProjectsListBody";
import AwcProjectsToolbar from "@/features/projects/AwcProjectsToolbar";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import { filterAwcProjectsByQuery } from "@/features/projects/utils/filterAwcProjectsByQuery";
import AppPanel from "@/components/surfaces/AppPanel";

export default function AwcProjectsPanel() {
  const { localTokenHash } = useLocalMacBrowserContext();
  const { devices, displayNameById } = useMyMacDevices();
  const defaultDeviceId = pickDefaultMacDeviceId(devices) ?? "";
  const {
    projects,
    compositionCountsByProjectId,
    isLoading,
    addProject,
    refreshProjects,
  } = useUserProjects("");
  const [searchQuery, setSearchQuery] = useState("");
  const visibleProjects = useMemo(
    () => filterAwcProjectsByQuery(projects, searchQuery),
    [projects, searchQuery],
  );

  return (
    <AppPanel padding="compact">
      {!isLoading && projects.length > 0 ? (
        <AwcProjectsToolbar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          projectCount={projects.length}
          visibleCount={visibleProjects.length}
        />
      ) : null}
      <AwcProjectsListBody
        isLoading={isLoading}
        searchQuery={searchQuery}
        projects={projects}
        visibleProjects={visibleProjects}
        compositionCountsByProjectId={compositionCountsByProjectId}
        devices={devices}
        displayNameById={displayNameById}
        localTokenHash={localTokenHash}
      />
      <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-800">
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
    </AppPanel>
  );
}
