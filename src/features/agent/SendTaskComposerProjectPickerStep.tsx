"use client";

import { useSession } from "next-auth/react";

import SendTaskComposerCreateProjectForm from "@/features/agent/SendTaskComposerCreateProjectForm";
import SendTaskComposerProjectRow from "@/features/agent/SendTaskComposerProjectRow";
import { buildAgentWitchProjectsHomePath } from "@/lib/projects/buildAgentWitchProjectsHomePath";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface SendTaskComposerProjectPickerStepProps {
  readonly projects: readonly UserProjectRecord[];
  readonly isLoading: boolean;
  readonly deviceId: string;
  readonly onSelect: (project: UserProjectRecord) => void;
  readonly onProjectCreated: (project: UserProjectRecord) => void;
  readonly onProjectDeleted: (projectId: string) => void;
  readonly showHeader?: boolean;
}

export default function SendTaskComposerProjectPickerStep({
  projects,
  isLoading,
  deviceId,
  onSelect,
  onProjectCreated,
  onProjectDeleted,
  showHeader = true,
}: SendTaskComposerProjectPickerStepProps) {
  const { data: session } = useSession();
  const projectsHomePath =
    session?.user?.email !== undefined
      ? buildAgentWitchProjectsHomePath(session.user.email)
      : "~/.agent-witch/profiles/<account>/projects";

  return (
    <div>
      {showHeader ? (
        <>
          <h2 className="text-sm font-medium text-gray-800 dark:text-white/90">
            Choose a project folder
          </h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Saved under {projectsHomePath} on your Mac.
          </p>
        </>
      ) : null}
      {isLoading ? (
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Loading projects…
        </p>
      ) : (
        <ul className="mt-3 space-y-2">
          {projects.map((project) => (
            <li key={project.id}>
              <SendTaskComposerProjectRow
                project={project}
                onSelect={onSelect}
                onDelete={async (projectId) => {
                  const response = await fetch(`/api/projects/${projectId}`, {
                    method: "DELETE",
                  });

                  if (response.ok) {
                    onProjectDeleted(projectId);
                  }
                }}
              />
            </li>
          ))}
        </ul>
      )}
      <SendTaskComposerCreateProjectForm
        deviceId={deviceId}
        onProjectCreated={onProjectCreated}
        onSelect={onSelect}
      />
    </div>
  );
}
