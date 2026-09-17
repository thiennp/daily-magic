"use client";

import { usePathname, useRouter } from "next/navigation";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import SendTaskComposerProjectPickerStep from "@/features/agent/SendTaskComposerProjectPickerStep";
import { useUserProjects } from "@/features/agent/hooks/useUserProjects";
import useChooseProjectFolderOnThisMac from "@/features/home/hooks/useChooseProjectFolderOnThisMac";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export default function HomeProjectsPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const { projects, isLoading, addProject, removeProject, refreshProjects } =
    useUserProjects("");

  const { chooseFolder, isChoosingFolder, folderPickerError } =
    useChooseProjectFolderOnThisMac({
      onSuccess: () => refreshProjects(),
    });

  const openProjectInComposer = (project: UserProjectRecord): void => {
    router.push(
      buildAgentComposerHref({
        pathname,
        projectId: project.id,
        customTask: true,
      }),
      { scroll: false },
    );
  };

  return (
    <AppPanel padding="compact">
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Your projects</h2>
      <p className={`mt-1 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Pick a project for New task, or choose its folder on this Mac. Finder
        opens in place and Agent Witch Bridge syncs the path to the cloud — no
        extra browser tab.
      </p>
      {folderPickerError !== null ? (
        <p className="mt-2 text-sm text-error-600 dark:text-error-400">
          {folderPickerError}
        </p>
      ) : null}
      <div className="mt-4">
        <SendTaskComposerProjectPickerStep
          projects={projects}
          isLoading={isLoading}
          deviceId=""
          showHeader={false}
          isChooseFolderBusy={isChoosingFolder}
          onSelect={openProjectInComposer}
          onProjectCreated={addProject}
          onProjectDeleted={removeProject}
          onChooseFolder={(project) => {
            void chooseFolder(project);
          }}
        />
      </div>
    </AppPanel>
  );
}
