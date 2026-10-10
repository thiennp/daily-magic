"use client";

import { buildMacDeviceDisplayNameById } from "@/features/agent-witch/utils/public-api/presentation";
import AppPanel from "@/components/surfaces/AppPanel";
import AwcProjectNameEditor from "@/features/projects/AwcProjectNameEditor";
import AwcProjectsListBody from "@/features/projects/AwcProjectsListBody";
import AwcProjectsToolbar from "@/features/projects/AwcProjectsToolbar";
import ProjectsStorybookFrame from "@/features/projects/storybook/ProjectsStorybookFrame";
import type { ProjectsStorybookViewport } from "@/features/projects/storybook/ProjectsStorybookFrame";
import {
  PROJECTS_STORYBOOK_COMPOSITION_COUNTS,
  PROJECTS_STORYBOOK_DEFAULT_PROJECT,
  PROJECTS_STORYBOOK_LONG_NAME_PROJECT,
  PROJECTS_STORYBOOK_ONLINE_MAC,
  PROJECTS_STORYBOOK_SAMPLE_PROJECT,
} from "@/features/projects/storybook/projectsStorybookFixtures";

const STORYBOOK_COMPOSITION_BY_ID = {
  [PROJECTS_STORYBOOK_SAMPLE_PROJECT.id]: PROJECTS_STORYBOOK_COMPOSITION_COUNTS,
  [PROJECTS_STORYBOOK_DEFAULT_PROJECT.id]: {
    harness: 1,
    workflow: 0,
    agent: 0,
  },
  [PROJECTS_STORYBOOK_LONG_NAME_PROJECT.id]:
    PROJECTS_STORYBOOK_COMPOSITION_COUNTS,
} as const;

const displayNameById = buildMacDeviceDisplayNameById([
  PROJECTS_STORYBOOK_ONLINE_MAC,
]);

interface ProjectsStorybookListRenameStoriesProps {
  readonly viewport: ProjectsStorybookViewport;
}

const ProjectsStorybookListRenameStories = ({
  viewport,
}: ProjectsStorybookListRenameStoriesProps) => (
  <>
    <ProjectsStorybookFrame
      title="Rename · read vs edit (?rename=1)"
      description="Save/Cancel uses mocked PATCH on this page."
      viewport={viewport}
    >
      <AppPanel padding="compact" className="space-y-6">
        <AwcProjectNameEditor
          projectId={PROJECTS_STORYBOOK_SAMPLE_PROJECT.id}
          initialName={PROJECTS_STORYBOOK_SAMPLE_PROJECT.name}
          startInEditMode={false}
        />
        <AwcProjectNameEditor
          projectId={PROJECTS_STORYBOOK_SAMPLE_PROJECT.id}
          initialName={PROJECTS_STORYBOOK_SAMPLE_PROJECT.name}
          startInEditMode
        />
      </AppPanel>
    </ProjectsStorybookFrame>

    <ProjectsStorybookFrame
      title="Project list grid"
      description="Toolbar + responsive cards with long-name truncation."
      viewport={viewport}
    >
      <AppPanel padding="compact">
        <AwcProjectsToolbar
          searchQuery=""
          onSearchQueryChange={() => {}}
          projectCount={3}
          visibleCount={3}
        />
        <AwcProjectsListBody
          isLoading={false}
          loadFailed={false}
          onRetryLoad={() => {}}
          onClearSearch={() => {}}
          searchQuery=""
          projects={[
            PROJECTS_STORYBOOK_SAMPLE_PROJECT,
            PROJECTS_STORYBOOK_LONG_NAME_PROJECT,
            PROJECTS_STORYBOOK_DEFAULT_PROJECT,
          ]}
          visibleProjects={[
            PROJECTS_STORYBOOK_SAMPLE_PROJECT,
            PROJECTS_STORYBOOK_LONG_NAME_PROJECT,
            PROJECTS_STORYBOOK_DEFAULT_PROJECT,
          ]}
          compositionCountsByProjectId={STORYBOOK_COMPOSITION_BY_ID}
          devices={[PROJECTS_STORYBOOK_ONLINE_MAC]}
          displayNameById={displayNameById}
          localTokenHash={PROJECTS_STORYBOOK_ONLINE_MAC.tokenHash}
        />
      </AppPanel>
    </ProjectsStorybookFrame>
  </>
);

export default ProjectsStorybookListRenameStories;
