"use client";

import { usePathname, useRouter } from "next/navigation";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import SendTaskComposerProjectPickerStep from "@/features/agent/SendTaskComposerProjectPickerStep";
import { useUserProjects } from "@/features/agent/hooks/useUserProjects";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import { AGENT_WITCH_PROJECTS_HOME_PATH } from "@/lib/projects/constants";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export default function HomeProjectsPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const { projects, isLoading, addProject, removeProject } =
    useUserProjects("");

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
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Projects</h2>
      <p className={`mt-1 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Saved folders on your Mac under {AGENT_WITCH_PROJECTS_HOME_PATH}. Pick
        one to send a task, or save a new project below.
      </p>
      <div className="mt-4">
        <SendTaskComposerProjectPickerStep
          projects={projects}
          isLoading={isLoading}
          deviceId=""
          showHeader={false}
          onSelect={openProjectInComposer}
          onProjectCreated={addProject}
          onProjectDeleted={removeProject}
        />
      </div>
    </AppPanel>
  );
}
