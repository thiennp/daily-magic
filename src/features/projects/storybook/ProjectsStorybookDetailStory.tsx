"use client";

import { ConnectionLabProvider } from "@/features/agent-witch/connection-lab/public-api/presentation";
import AwcProjectDetailPanel from "@/features/projects/AwcProjectDetailPanel";
import ProjectsStorybookFrame from "@/features/projects/storybook/ProjectsStorybookFrame";
import type { ProjectsStorybookViewport } from "@/features/projects/storybook/ProjectsStorybookFrame";
import { PROJECTS_STORYBOOK_SAMPLE_PROJECT } from "@/features/projects/storybook/projectsStorybookFixtures";

const PROJECTS_STORYBOOK_DETAIL_PANEL_PROJECT = {
  ...PROJECTS_STORYBOOK_SAMPLE_PROJECT,
  deviceId: "mock-device-online",
};

interface ProjectsStorybookDetailStoryProps {
  readonly viewport: ProjectsStorybookViewport;
}

const ProjectsStorybookDetailStory = ({
  viewport,
}: ProjectsStorybookDetailStoryProps) => (
  <ProjectsStorybookFrame
    title="Detail panel · rename + danger zone"
    description="Mocked composition GET and DELETE."
    viewport={viewport}
  >
    <ConnectionLabProvider>
      <AwcProjectDetailPanel
        project={PROJECTS_STORYBOOK_DETAIL_PANEL_PROJECT}
        startRename
      />
    </ConnectionLabProvider>
  </ProjectsStorybookFrame>
);

export default ProjectsStorybookDetailStory;
