"use client";

import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface MarketplaceInstallProjectPickerProps {
  readonly projects: readonly UserProjectRecord[];
  readonly isProjectsLoading: boolean;
  readonly selectedProjectId: string;
  readonly onSelectProjectId: (projectId: string) => void;
  readonly selectedDeviceId: string;
}

export default function MarketplaceInstallProjectPicker({
  projects,
  isProjectsLoading,
  selectedProjectId,
  onSelectProjectId,
  selectedDeviceId,
}: MarketplaceInstallProjectPickerProps) {
  const deviceProjects =
    selectedDeviceId.length > 0
      ? projects.filter(
          (project) =>
            project.deviceId === null ||
            project.deviceId.length === 0 ||
            project.deviceId === selectedDeviceId,
        )
      : projects;

  return (
    <div className="mt-4">
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
        Project
      </p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Workflow and agent installs link to this project. Pull playbook files
        into the repo from Agent Witch on your Mac.
      </p>
      {isProjectsLoading ? (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Loading projects…
        </p>
      ) : deviceProjects.length === 0 ? (
        <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
          No projects for this Mac yet. Create a project under Home → Projects,
          then try again.
        </p>
      ) : (
        <ul className="mt-2 space-y-2">
          {deviceProjects.map((project) => {
            const isSelected = selectedProjectId === project.id;

            return (
              <li key={project.id}>
                <button
                  type="button"
                  className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                    isSelected
                      ? "border-brand-500 bg-brand-50/60 dark:border-brand-400 dark:bg-brand-950/30"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  onClick={() => {
                    onSelectProjectId(project.id);
                  }}
                >
                  <span className="font-medium text-gray-900 dark:text-white/90">
                    {project.name}
                  </span>
                  {project.folderPath.trim().length > 0 ? (
                    <span className="mt-0.5 block truncate text-xs text-gray-500 dark:text-gray-400">
                      {project.folderPath}
                    </span>
                  ) : (
                    <span className="mt-0.5 block text-xs text-amber-700 dark:text-amber-300">
                      No folder set — set folder on Mac before pull into repo.
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
