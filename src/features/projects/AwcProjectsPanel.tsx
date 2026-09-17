"use client";

import SendTaskComposerCreateProjectForm from "@/features/agent/SendTaskComposerCreateProjectForm";
import { useUserProjects } from "@/features/agent/hooks/useUserProjects";
import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import { pickDefaultMacDeviceId } from "@/features/agent-witch/online-wake";
import AwcProjectListRow from "@/features/projects/AwcProjectListRow";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import AppPanel from "@/components/surfaces/AppPanel";
import { APP_SURFACE_BODY_TEXT_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

export default function AwcProjectsPanel() {
  const { localTokenHash } = useLocalMacBrowserContext();
  const { devices, displayNameById } = useMyMacDevices();
  const defaultDeviceId = pickDefaultMacDeviceId(devices) ?? "";
  const { projects, isLoading, addProject, refreshProjects } =
    useUserProjects("");

  return (
    <AppPanel padding="compact">
      <p className={APP_SURFACE_BODY_TEXT_CLASS}>
        Repos your Macs can run agents against. Rename, folder, and composition
        editing happen in Agent Witch Live on the Mac that stores each repo.
      </p>
      {isLoading ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Loading projects…
        </p>
      ) : projects.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          No projects yet. Connect a Mac from home, then create a project below.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {projects.map((project) => (
            <li key={project.id}>
              <AwcProjectListRow
                project={project}
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
