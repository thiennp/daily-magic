"use client";

import { buildMacDeviceDisplayNameById } from "@/features/agent-witch/utils/resolveMacDeviceDisplayName";
import AwcProjectCard from "@/features/projects/AwcProjectCard";
import ProjectsStorybookFrame from "@/features/projects/storybook/ProjectsStorybookFrame";
import type { ProjectsStorybookViewport } from "@/features/projects/storybook/ProjectsStorybookFrame";
import {
  PROJECTS_STORYBOOK_COMPOSITION_COUNTS,
  PROJECTS_STORYBOOK_DEFAULT_PROJECT,
  PROJECTS_STORYBOOK_OFFLINE_MAC,
  PROJECTS_STORYBOOK_ONLINE_MAC,
  PROJECTS_STORYBOOK_SAMPLE_PROJECT,
} from "@/features/projects/storybook/projectsStorybookFixtures";

const displayNameById = buildMacDeviceDisplayNameById([
  PROJECTS_STORYBOOK_ONLINE_MAC,
  PROJECTS_STORYBOOK_OFFLINE_MAC,
]);

interface ProjectsStorybookCardStateStoriesProps {
  readonly viewport: ProjectsStorybookViewport;
}

const ProjectsStorybookCardStateStories = ({
  viewport,
}: ProjectsStorybookCardStateStoriesProps) => (
  <>
    <ProjectsStorybookFrame
      title="Project card · Mac online (this Mac)"
      description="Actions menu: view, assign tasks, rename, edit on Mac, delete."
      viewport={viewport}
    >
      <AwcProjectCard
        project={PROJECTS_STORYBOOK_SAMPLE_PROJECT}
        compositionCounts={PROJECTS_STORYBOOK_COMPOSITION_COUNTS}
        devices={[PROJECTS_STORYBOOK_ONLINE_MAC]}
        displayNameById={displayNameById}
        localTokenHash={PROJECTS_STORYBOOK_ONLINE_MAC.tokenHash}
      />
    </ProjectsStorybookFrame>

    <ProjectsStorybookFrame
      title="Project card · Mac offline"
      description="Edit on Mac disabled with last-seen helper text. Delete project stays available (cloud record only)."
      viewport={viewport}
    >
      <AwcProjectCard
        project={{
          ...PROJECTS_STORYBOOK_SAMPLE_PROJECT,
          deviceId: PROJECTS_STORYBOOK_OFFLINE_MAC.id,
        }}
        compositionCounts={PROJECTS_STORYBOOK_COMPOSITION_COUNTS}
        devices={[PROJECTS_STORYBOOK_OFFLINE_MAC]}
        displayNameById={displayNameById}
        localTokenHash={null}
      />
    </ProjectsStorybookFrame>

    <ProjectsStorybookFrame
      title="Project card · Default (no delete)"
      description="Default catalog row hides delete everywhere."
      viewport={viewport}
    >
      <AwcProjectCard
        project={PROJECTS_STORYBOOK_DEFAULT_PROJECT}
        compositionCounts={{ harness: 1, workflow: 0, agent: 0 }}
        devices={[PROJECTS_STORYBOOK_ONLINE_MAC]}
        displayNameById={displayNameById}
        localTokenHash={PROJECTS_STORYBOOK_ONLINE_MAC.tokenHash}
      />
    </ProjectsStorybookFrame>
  </>
);

export default ProjectsStorybookCardStateStories;
