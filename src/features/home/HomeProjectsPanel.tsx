"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import AppPanel from "@/components/surfaces/AppPanel";
import {
  APP_SURFACE_BODY_TEXT_CLASS,
  APP_SURFACE_SECTION_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import HomeProjectListRow from "@/features/home/HomeProjectListRow";
import { useUserProjects } from "@/features/agent/hooks/useUserProjects";
import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";
import useLocalMacBrowserContext from "@/features/home/hooks/useLocalMacBrowserContext";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export default function HomeProjectsPanel() {
  const router = useRouter();
  const pathname = usePathname();
  const { projects, isLoading } = useUserProjects("");
  const { devices, displayNameById } = useMyMacDevices();
  const { localTokenHash } = useLocalMacBrowserContext();

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
        Pick a project for New task, or manage folders on the{" "}
        <Link
          href="/projects"
          className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          Projects
        </Link>{" "}
        page.
      </p>
      {isLoading ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Loading projects…
        </p>
      ) : projects.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          No projects yet.{" "}
          <Link
            href="/projects"
            className="font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            Create one on Projects
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {projects.map((project) => (
            <li key={project.id}>
              <HomeProjectListRow
                project={project}
                onEdit={openProjectInComposer}
                devices={devices}
                displayNameById={displayNameById}
                localTokenHash={localTokenHash}
              />
            </li>
          ))}
        </ul>
      )}
    </AppPanel>
  );
}
