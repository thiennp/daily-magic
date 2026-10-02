"use client";

import ProjectsStorybookAccessStories from "@/features/projects/storybook/ProjectsStorybookAccessStories";
import ProjectsStorybookCardStateStories from "@/features/projects/storybook/ProjectsStorybookCardStateStories";
import ProjectsStorybookDetailStory from "@/features/projects/storybook/ProjectsStorybookDetailStory";
import ProjectsStorybookListRenameStories from "@/features/projects/storybook/ProjectsStorybookListRenameStories";
import type { ProjectsStorybookViewport } from "@/features/projects/storybook/ProjectsStorybookFrame";

interface ProjectsStorybookStoriesProps {
  readonly viewport: ProjectsStorybookViewport;
}

const ProjectsStorybookStories = ({
  viewport,
}: ProjectsStorybookStoriesProps) => (
  <>
    <ProjectsStorybookCardStateStories viewport={viewport} />
    <ProjectsStorybookListRenameStories viewport={viewport} />
    <ProjectsStorybookDetailStory viewport={viewport} />
    <ProjectsStorybookAccessStories viewport={viewport} />
  </>
);

export default ProjectsStorybookStories;
