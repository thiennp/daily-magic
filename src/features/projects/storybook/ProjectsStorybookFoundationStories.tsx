"use client";

import { AwcProjectsMenuDisabledItem } from "@/features/projects/public-api/presentation";
import ProjectsStorybookFrame from "@/features/projects/storybook/ProjectsStorybookFrame";
import type { ProjectsStorybookViewport } from "@/features/projects/storybook/ProjectsStorybookFrame";
import {
  PROJECTS_V5_DEFAULT_CHIP_CLASS,
  PROJECTS_V5_MENU_ITEM_CLASS,
  PROJECTS_V5_MENU_PANEL_CLASS,
  PROJECTS_V5_PAGE_CLASS,
} from "@/features/projects/public-api/types";

interface ProjectsStorybookFoundationStoriesProps {
  readonly viewport: ProjectsStorybookViewport;
}

/** PP-1 foundation previews: neutral Default chip + disabled menu row with (i) reason. */
const ProjectsStorybookFoundationStories = ({
  viewport,
}: ProjectsStorybookFoundationStoriesProps) => (
  <>
    <ProjectsStorybookFrame
      title="Projects foundation · Default chip"
      description="Neutral tonal chip (tile-2 + muted ink). Never solid blue."
      viewport={viewport}
    >
      <div className={PROJECTS_V5_PAGE_CLASS}>
        <span className={PROJECTS_V5_DEFAULT_CHIP_CLASS}>Default</span>
      </div>
    </ProjectsStorybookFrame>

    <ProjectsStorybookFrame
      title="Projects foundation · Disabled menu row"
      description="Muted V5 disabled tokens. Reason on (i) hover / focus, read by screen readers."
      viewport={viewport}
    >
      <div className={`${PROJECTS_V5_PAGE_CLASS} pb-16`}>
        <ul
          role="menu"
          aria-label="Project actions"
          className={`flex flex-col gap-0.5 ${PROJECTS_V5_MENU_PANEL_CLASS}`}
        >
          <li role="none">
            <a
              role="menuitem"
              href="#view"
              className={PROJECTS_V5_MENU_ITEM_CLASS}
            >
              View details
            </a>
          </li>
          <AwcProjectsMenuDisabledItem
            label="Edit on Mac"
            reason="Connect a computer to edit this project."
          />
        </ul>
      </div>
    </ProjectsStorybookFrame>
  </>
);

export default ProjectsStorybookFoundationStories;
