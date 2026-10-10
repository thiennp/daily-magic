"use client";

import { useState } from "react";

import type { ProjectSkillKind } from "@/features/project-skill-share/internal/core/projectSkill.type";
import { useProjectSkills } from "@/features/project-skill-share/internal/presentation/hooks/useProjectSkills";
import ProjectPlaybookAddButton from "@/features/project-skill-share/internal/presentation/ProjectPlaybookAddButton";
import ProjectSkillPublishForm from "@/features/project-skill-share/internal/presentation/ProjectSkillPublishForm";
import ProjectSkillRow from "@/features/project-skill-share/internal/presentation/ProjectSkillRow";
import { PROJECT_SKILLS_COPY } from "@/features/project-skill-share/internal/presentation/projectSkillsCopy.constant";
import {
  PROJECT_SKILLS_BADGE_CLASS,
  PROJECT_SKILLS_HINT_CLASS,
  PROJECT_SKILLS_SECTION_CLASS,
  PROJECT_SKILLS_TITLE_CLASS,
} from "@/features/project-skill-share/internal/presentation/projectSkillsSection.constant";
import { PROJECT_PAGE_METADATA_TEXT_CLASS } from "@/features/projects/public-api/types";

interface ProjectSkillsSectionProps {
  readonly projectId: string;
  /** Owner-only mutate; member/viewer get disabled controls + Product EN reasons. */
  readonly canEdit: boolean;
  /** Owner or active member: Publish / Save draft + see drafts (default = canEdit). */
  readonly canDraft?: boolean;
}

/** Resources Shared skills — owner mutates; others read published with disabled CTAs. */
export default function ProjectSkillsSection({
  projectId,
  canEdit,
  canDraft = canEdit,
}: ProjectSkillsSectionProps) {
  const copy = PROJECT_SKILLS_COPY;
  const skills = useProjectSkills(projectId);
  const [kind, setKind] = useState<ProjectSkillKind>("skill");

  if (skills.forbidden) {
    return null;
  }

  return (
    <section
      id="project-access-skills"
      className={PROJECT_SKILLS_SECTION_CLASS}
    >
      <header className="space-y-0.5">
        <div className="flex items-center gap-2">
          <h3 className={PROJECT_SKILLS_TITLE_CLASS}>{copy.title}</h3>
          <span className={PROJECT_SKILLS_BADGE_CLASS}>
            {skills.skills.length}
          </span>
          <ProjectPlaybookAddButton
            canEdit={canDraft}
            onAdd={() => setKind("playbook")}
          />
        </div>
        <p className={PROJECT_SKILLS_HINT_CLASS}>{copy.hint}</p>
      </header>
      {skills.isLoading ? (
        <p className={`text-xs ${PROJECT_PAGE_METADATA_TEXT_CLASS}`}>
          {copy.loading}
        </p>
      ) : null}
      {!skills.isLoading && skills.skills.length === 0 ? (
        <p className="text-xs text-awc-fg-muted">{copy.empty}</p>
      ) : null}
      <ul className="space-y-2">
        {skills.skills.map((skill) => (
          <ProjectSkillRow
            key={skill.skillId}
            skill={skill}
            busy={skills.busy}
            onRevoke={(skillId) => void skills.revoke(skillId)}
            onPublishDraft={(skillId) => void skills.publish({ skillId })}
          />
        ))}
      </ul>
      <ProjectSkillPublishForm
        busy={skills.busy}
        canDraft={canDraft}
        kind={kind}
        onKind={setKind}
        onSubmit={skills.publish}
      />
      {skills.message ? (
        <p
          role="status"
          className="text-xs text-awc-fg-muted dark:text-gray-300"
        >
          {skills.message}
        </p>
      ) : null}
    </section>
  );
}
