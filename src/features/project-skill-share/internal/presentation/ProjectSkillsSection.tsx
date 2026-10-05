"use client";

import { useProjectSkills } from "@/features/project-skill-share/internal/presentation/hooks/useProjectSkills";
import ProjectSkillPublishForm from "@/features/project-skill-share/internal/presentation/ProjectSkillPublishForm";
import ProjectSkillRow from "@/features/project-skill-share/internal/presentation/ProjectSkillRow";
import { PROJECT_SKILLS_COPY } from "@/features/project-skill-share/internal/presentation/projectSkillsCopy.constant";
import {
  PROJECT_SKILLS_BADGE_CLASS,
  PROJECT_SKILLS_HINT_CLASS,
  PROJECT_SKILLS_SECTION_CLASS,
  PROJECT_SKILLS_TITLE_CLASS,
} from "@/features/project-skill-share/internal/presentation/projectSkillsSection.constant";

interface ProjectSkillsSectionProps {
  readonly projectId: string;
}

/** Project Access → Skills (owner + active members). Hidden when the API says forbidden. */
export default function ProjectSkillsSection({
  projectId,
}: ProjectSkillsSectionProps) {
  const copy = PROJECT_SKILLS_COPY;
  const skills = useProjectSkills(projectId);

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
        </div>
        <p className={PROJECT_SKILLS_HINT_CLASS}>{copy.hint}</p>
      </header>
      {skills.isLoading ? (
        <p className="text-xs text-gray-400">{copy.loading}</p>
      ) : null}
      {!skills.isLoading && skills.skills.length === 0 ? (
        <p className="text-xs text-gray-500">{copy.empty}</p>
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
      <ProjectSkillPublishForm busy={skills.busy} onSubmit={skills.publish} />
      {skills.message ? (
        <p role="status" className="text-xs text-gray-600 dark:text-gray-300">
          {skills.message}
        </p>
      ) : null}
    </section>
  );
}
