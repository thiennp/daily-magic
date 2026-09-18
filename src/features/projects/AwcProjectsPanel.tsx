"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import SendTaskComposerCreateProjectForm from "@/features/agent/SendTaskComposerCreateProjectForm";
import { useUserProjects } from "@/features/agent/hooks/useUserProjects";
import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import { pickDefaultMacDeviceId } from "@/features/agent-witch/online-wake";
import AwcProjectListRow from "@/features/projects/AwcProjectListRow";
import AwcProjectsSearchBar from "@/features/projects/AwcProjectsSearchBar";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import AppPanel from "@/components/surfaces/AppPanel";
import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

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

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const visibleProjects = useMemo(() => {
    if (trimmedQuery === "") {
      return projects;
    }
    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(trimmedQuery) ||
        project.folderPath.toLowerCase().includes(trimmedQuery),
    );
  }, [projects, trimmedQuery]);

  return (
    <AppPanel padding="compact">
      {!isLoading && projects.length > 0 ? (
        <AwcProjectsSearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          totalCount={projects.length}
          visibleCount={visibleProjects.length}
        />
      ) : null}
      {isLoading ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Loading projects…
        </p>
      ) : projects.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 py-6 text-center">
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            No projects yet.
          </p>
          <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
            Connect a Mac, then add the first repo it should work on.
          </p>
          <Link href="/" className={APP_SURFACE_TEXT_LINK_CLASS}>
            Go to home to connect a Mac
          </Link>
        </div>
      ) : visibleProjects.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          No projects match &ldquo;{searchQuery.trim()}&rdquo;.
        </p>
      ) : (
        <ul className="mt-2 divide-y divide-gray-200/80 dark:divide-gray-800/80">
          {visibleProjects.map((project) => (
            <li key={project.id}>
              <AwcProjectListRow
                project={project}
                compositionCounts={
                  compositionCountsByProjectId[project.id] ?? {
                    harness: 0,
                    workflow: 0,
                    agent: 0,
                  }
                }
                devices={devices}
                displayNameById={displayNameById}
                localTokenHash={localTokenHash}
              />
            </li>
          ))}
        </ul>
      )}
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
