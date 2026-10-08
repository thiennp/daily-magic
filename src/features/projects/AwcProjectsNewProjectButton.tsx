"use client";

import { APP_SURFACE_CTA_PRIMARY_SM_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";
import { AWC_PROJECTS_PAGE_COPY } from "@/features/projects/awcProjectsPageCopy.constant";

interface AwcProjectsNewProjectButtonProps {
  readonly expanded: boolean;
  readonly onClick: () => void;
}

/** Primary "New project" action; toggles the create card (design head action). */
export default function AwcProjectsNewProjectButton({
  expanded,
  onClick,
}: AwcProjectsNewProjectButtonProps) {
  return (
    <button
      type="button"
      aria-expanded={expanded}
      aria-controls="projects-new-project"
      className={`shrink-0 ${APP_SURFACE_CTA_PRIMARY_SM_CLASS}`}
      onClick={onClick}
    >
      {AWC_PROJECTS_PAGE_COPY.newProject}
    </button>
  );
}
