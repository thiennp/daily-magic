"use client";

import AwcProjectAccessPanel from "@/features/projects/access/AwcProjectAccessPanel";
import ProjectsStorybookFrame from "@/features/projects/storybook/ProjectsStorybookFrame";
import type { ProjectsStorybookViewport } from "@/features/projects/storybook/ProjectsStorybookFrame";

interface ProjectsStorybookAccessStoriesProps {
  readonly viewport: ProjectsStorybookViewport;
}

const ProjectsStorybookAccessStories = ({
  viewport,
}: ProjectsStorybookAccessStoriesProps) => (
  <>
    <ProjectsStorybookFrame
      title="Access · invites + agent Approve nickname"
      description="Mocked invites, display-name presets, pending agent Approve, members with projectDisplayName primary."
      viewport={viewport}
    >
      <AwcProjectAccessPanel projectId="storybook-project-1" />
    </ProjectsStorybookFrame>
    <ProjectsStorybookFrame
      title="Access · hooks status chrome"
      description="Minimal join-hooks / dispatch chrome (API pending — no fake live webhooks)."
      viewport={viewport}
    >
      <AwcProjectAccessPanel projectId="storybook-project-hooks" />
    </ProjectsStorybookFrame>
  </>
);

export default ProjectsStorybookAccessStories;
