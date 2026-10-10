"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import AppPageHeader from "@/components/surfaces/AppPageHeader";
import AppPanel from "@/components/surfaces/AppPanel";
import { APP_SURFACE_TEXT_LINK_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import AwcProjectDetailPanel from "@/features/projects/AwcProjectDetailPanel";
import { ProjectsStorybookMockFetchProvider } from "@/features/projects/storybook/public-api/presentation";
import { APP_PAGE_STACK_CLASS } from "@/features/shell/appPageLayout.constant";
import { AWC_STORYBOOK_SAMPLE_PROJECT } from "@/utils/storybook/awcStorybookFixtures";
import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";

const ProjectDetailStoryStack = ({
  children,
}: {
  readonly children: ReactNode;
}) => (
  <div className={APP_PAGE_STACK_CLASS}>
    <AppPageHeader title="Project details" />
    {children}
  </div>
);

export default function AwcProjectDetailStoryView({
  status,
}: {
  readonly status: StorybookPageStatus;
}) {
  if (status === "loading") {
    return (
      <ProjectDetailStoryStack>
        <AppPanel padding="compact">
          <p className="text-sm text-awc-fg-muted dark:text-gray-400">
            Loading project…
          </p>
        </AppPanel>
      </ProjectDetailStoryStack>
    );
  }

  if (status === "empty") {
    return (
      <ProjectDetailStoryStack>
        <AppPanel padding="compact">
          <p className="text-sm font-medium text-awc-fg dark:text-white/90">
            Project not found
          </p>
          <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-400">
            This project was removed or you do not have access.
          </p>
          <p className="mt-4">
            <Link href="/projects" className={APP_SURFACE_TEXT_LINK_CLASS}>
              ← All projects
            </Link>
          </p>
        </AppPanel>
      </ProjectDetailStoryStack>
    );
  }

  if (status === "error") {
    return (
      <ProjectDetailStoryStack>
        <AppPanel padding="compact">
          <p className="text-sm font-medium text-error-600 dark:text-error-500">
            Could not load project
          </p>
          <p className="mt-2 text-sm text-awc-fg-muted dark:text-gray-400">
            The project API returned an error. Open Projects and try again.
          </p>
          <p className="mt-4">
            <Link href="/projects" className={APP_SURFACE_TEXT_LINK_CLASS}>
              ← All projects
            </Link>
          </p>
        </AppPanel>
      </ProjectDetailStoryStack>
    );
  }

  return (
    <ProjectsStorybookMockFetchProvider>
      <ProjectDetailStoryStack>
        <AwcProjectDetailPanel project={AWC_STORYBOOK_SAMPLE_PROJECT} />
      </ProjectDetailStoryStack>
    </ProjectsStorybookMockFetchProvider>
  );
}
