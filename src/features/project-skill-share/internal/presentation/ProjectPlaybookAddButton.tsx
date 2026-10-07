"use client";

import { PROJECT_PLAYBOOKS_COPY as P } from "@/features/project-skill-share/internal/presentation/projectPlaybooksCopy.constant";
import { PROJECT_SKILLS_CTA } from "@/features/project-skill-share/internal/presentation/projectSkillsSection.constant";

interface Props {
  readonly canEdit: boolean;
  readonly onAdd: () => void;
}

/** "Add playbook" entry point: switches the share form to Playbook and focuses its title (no navigation). */
export default function ProjectPlaybookAddButton({ canEdit, onAdd }: Props) {
  if (!canEdit) return null;
  return (
    <button
      type="button"
      title={P.addPlaybookHint}
      className={`ml-auto ${PROJECT_SKILLS_CTA.secondary}`}
      onClick={(event) => {
        const section = event.currentTarget.closest("section");
        onAdd();
        requestAnimationFrame(() => {
          section?.querySelector<HTMLInputElement>("form input")?.focus();
        });
      }}
    >
      {P.addPlaybook}
    </button>
  );
}
