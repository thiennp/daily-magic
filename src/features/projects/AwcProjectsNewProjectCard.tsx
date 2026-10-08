"use client";

import SendTaskComposerCreateProjectForm from "@/features/agent/SendTaskComposerCreateProjectForm";
import { AWC_PROJECTS_PAGE_COPY as COPY } from "@/features/projects/awcProjectsPageCopy.constant";
import {
  PROJECTS_V5_HEADING_CLASS,
  PROJECTS_V5_ICON_BUTTON_CLASS,
  PROJECTS_V5_INSET_CLASS,
} from "@/features/projects/projectsPageV5Classes.constant";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface AwcProjectsNewProjectCardProps {
  readonly deviceId: string;
  readonly onCreated: (project: UserProjectRecord) => void;
  readonly onClose: () => void;
}

/** "New project" card above the list (design: header button toggles it). */
export default function AwcProjectsNewProjectCard({
  deviceId,
  onCreated,
  onClose,
}: AwcProjectsNewProjectCardProps) {
  return (
    <section
      id="projects-new-project"
      aria-labelledby="projects-new-project-h"
      className={`mb-5 ${PROJECTS_V5_INSET_CLASS}`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 id="projects-new-project-h" className={PROJECTS_V5_HEADING_CLASS}>
          {COPY.newProject}
        </h3>
        <button
          type="button"
          aria-label={COPY.newProjectClose}
          className={`size-9 ${PROJECTS_V5_ICON_BUTTON_CLASS}`}
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <SendTaskComposerCreateProjectForm
        deviceId={deviceId}
        onProjectCreated={onCreated}
        onSelect={onClose}
        onCancel={onClose}
      />
    </section>
  );
}
