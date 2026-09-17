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
      <h2 className={APP_SURFACE_SECTION_TITLE_CLASS}>Your projects</h2>
      <p className={`mt-1 ${APP_SURFACE_BODY_TEXT_CLASS}`}>
        Pick a project for New task. Set or change folders in Agent Witch Live
        on the Mac that stores each repo.
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
